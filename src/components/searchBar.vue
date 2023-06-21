<template>
  <div class="searchBar">
    <div class="toHome">
      <div class="el-icon-s-home" @click="goHome"></div>
    </div>
    <div class="search">
      <div class="move">
        <div class="el-icon-arrow-left arrow" @click="historyGo(-1)"></div>
        <div class="el-icon-arrow-right arrow" @click="historyGo(1)"></div>
      </div>
      <el-autocomplete popper-class="my-autocomplete" v-model="searchValue" :fetch-suggestions="querySearch" placeholder="请输入内容" @select="handleSelect" @input="inputChange" :popper-append-to-body='false' ref="searchInput">
        <i slot="suffix" class="el-input__icon el-icon-search" @click="search"></i>
        <!-- 输入建议模板 -->
        <template slot-scope="{ item }">
          <div class="name">{{ item.value }}</div>
        </template>
      </el-autocomplete>
    </div>
    <div class="loginIn" v-if="!isLogin" @click="loginIn">
      <div class="userInfo">
        <el-avatar icon="el-icon-user-solid"></el-avatar>
      </div>
      <div class="name">
        <div>请登录</div>
      </div>
    </div>
    <div class="isLoginIn" v-else>
      <div class="userInfo">
        <el-avatar icon="el-icon-user-solid"></el-avatar>
      </div>
      <div class="name">
        <div>请登录</div>
      </div>
    </div>
    <div class="popOver">
      <el-dialog title="请扫描二维码登录" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <div class="box">
          <img :src="loginQr" alt="">
        </div>
        <span slot="footer" class="dialog-footer">
          <div class="tips">
            <span>{{tips}}</span>
          </div>
          <div class="btns">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" :disabled='!checking' @click="checkOut">{{checkingCount===0?'点击刷新状态':checkingCount+'s后刷新检查登录状态'}}</el-button>
          </div>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getSeachKeyword, suggestSearch, getQrKey, getQr, CheckQrStatus } from '../request/request'
export default {
  data() {
    return {
      searchList: [],
      searchValue: '',
      // 登录使用
      isLogin: false,
      loginQr: null,
      dialogVisible: false,
      checking: false,
      checkingCount: 30,
      qrKey: null,
      timer: null,
      tips: null
    }
  },
  watch: {
    // 监听 如果搜索的值清空回了''重新调一次获取热搜列表
    searchValue(value) {
      if (value === '') {
        this.getPopSeach()
      }
    }
  },
  methods: {
    // 获取热搜列表
    getPopSeach() {
      getSeachKeyword().then(res => {
        if (res.code === 200) {
          let data = res.result.hots
          data = data.map(item => {
            return {
              value: item.first
            }
          })
          this.searchList = data
        }
      })
    },
    // 搜索列表处理方法
    querySearch(queryString, cb) {
      const searchList = this.searchList
      const results = queryString ? searchList.filter(this.createFilter(queryString)) : searchList
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return item => {
        return item.value.toLowerCase().includes(queryString.toLowerCase())
      }
    },
    // 选中处理方法
    handleSelect(item) {
      // 跳转到searchList
      this.$router.push({ path: '/searchlist', query: { keyword: item.value } })
      this.searchValue = item.value
      // 重新调一次获取热搜列表
      this.getPopSeach()
    },
    // 处理前进后退按钮的方法
    historyGo(num) {
      this.$router.go(num)
    },
    // 处理点击主页的方法
    goHome() {
      this.$router.push('/')
    },
    // 处理input事件的方法
    inputChange() {
      suggestSearch(this.searchValue).then(res => {
        if (res.code === 200) {
          let data = res.result.songs
          data = data.map(item => {
            let showName = item.name.toLowerCase().includes(this.searchValue.toLowerCase()) ? item.name + '-' + item.artists[0].name : item.album.name.toLowerCase().includes(this.searchValue.toLowerCase()) ? item.album.name + '-' + item.artists[0].name : item.name + '-' + item.artists[0].name
            return {
              value: showName
            }
          })
          this.searchList = data
        }
      })
    },
    // 点击搜索按钮
    search() {
      if (this.searchValue === '') return

      // 跳转到searchList
      this.$router.push({ path: '/searchlist', query: { keyword: this.searchValue } })
      this.$refs.searchInput.close()
    },
    // 登入方法
    loginIn() {
      getQrKey().then(res => {
        if (res.data.code === 200) {
          let key = res.data.data.unikey
          this.qrKey = key
          getQr(key).then(res => {
            this.loginQr = res.data.qrimg
            this.dialogVisible = true
            console.log(this.qrKey === key ? this.qrKey : '')
            this.checkOut()
          })
        }
      })
    },
    // 处理点击关闭
    handleClose(done) {
      this.$confirm('确认取消登录？')
        .then(_ => {
          done()
          clearInterval(this.timer)
        })
        .catch(_ => {})
    },
    cancel() {
      this.dialogVisible = false
      clearInterval(this.timer)
    },
    // 检查状态
    checkOut() {
      this.checking = false
      this.checkingCount = 30
      this.timer = setInterval(() => {
        CheckQrStatus(this.qrKey).then(res => {
          console.log(res)
          if (res.code === 803) {
            sessionStorage.setItem('cookie', res.cookie)
            this.tips = res.message
            this.dialogVisible = false
            if (this.timer) {
              clearInterval(this.timer)
            }
            return
          }
          this.tips = res.message
          this.checkingCount--
          if (this.checkingCount === 0) {
            this.checking = true
            clearInterval(this.timer)
          }
        })
      }, 1000)
    }
  },
  mounted() {
    this.getPopSeach()
  }
}
</script>

<style lang='less' scoped>
.searchBar {
  height: 100%;
  display: flex;
}
.toHome {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20%;
  height: 100%;
  /deep/ div {
    cursor: pointer;
    font-size: 30px;
  }
}
.search {
  flex: 1;
  .move {
    display: flex;
    align-items: center;
    .arrow {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 10px;
      cursor: pointer;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: rgb(235, 235, 235);
    }
  }
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  /deep/ .el-autocomplete {
    width: 210px;
    height: 40px;
  }
  /deep/ .el-input {
    width: 210px;
    height: 40px;
    input {
      width: 100%;
      height: 100%;
      border-radius: 20px;
    }
  }
}
.loginIn {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 20%;
  height: 100%;
  cursor: pointer;
}
/deep/ .el-autocomplete-suggestion {
  width: 260px !important;
  font-size: 14px;
  li {
    .name {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}
/deep/ .el-input__icon.el-icon-search {
  cursor: pointer;
}
/deep/ .el-dialog__body {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 260px;
}
.popOver {
  .box {
    width: 200px;
    height: 200px;
  }
}
.tips {
  height: 40px;
  font-size: 18px;
  margin-bottom: 10px;
}
img {
  width: 100%;
  height: 100%;
}
.dialog-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.el-dialog__footer {
  padding: 10px 20px;
}
</style>
