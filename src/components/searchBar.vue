<template>
  <div class="searchBar">
    <div class="icon"></div>
    <div class="search">
      <div class="move">
        <div class="el-icon-arrow-left arrow" @click="historyGo(-1)"></div>
        <div class="el-icon-arrow-right arrow" @click="historyGo(1)"></div>
      </div>
      <el-autocomplete popper-class="my-autocomplete" v-model="searchValue" :fetch-suggestions="querySearch" placeholder="请输入内容" @select="handleSelect" @input="inputChange" :popper-append-to-body='false'>
        <!-- 输入建议模板 -->
        <template slot-scope="{ item }">
          <div class="name">{{ item.value }}</div>
        </template>
      </el-autocomplete>
    </div>

  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { getSeachKeyword, search, suggestSearch } from '../request/request'
export default {
  data() {
    return {
      searchList: [],
      searchValue: ''
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
    ...mapMutations(['updateSeachList']),
    // 获取热搜列表
    getPopSeach() {
      getSeachKeyword().then(res => {
        if (res.data.code === 200) {
          let data = res.data.result.hots
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
      this.searchValue = ''
      search(item.value).then(res => {
        // 把搜索列表和搜索关键词传输到vuex中 供searchList页面使用
        this.updateSeachList({
          searchKey: item.value,
          data: res.data.result.songs
        })
        // 跳转到searchList
        this.$router.push({ path: '/searchlist' })
        // 重新调一次获取热搜列表
        this.getPopSeach()
      })
    },
    // 处理前进后退按钮的方法
    historyGo(num) {
      this.$router.go(num)
    },
    // 处理input事件的方法
    inputChange() {
      suggestSearch(this.searchValue).then(res => {
        if (res.data.code === 200) {
          let data = res.data.result.songs
          data = data.map(item => {
            let name = item.name.toLowerCase().includes(this.searchValue.toLowerCase()) ? item.name + '-' + item.artists[0].name : item.album.name.toLowerCase().includes(this.searchValue.toLowerCase()) ? item.album.name + '-' + item.artists[0].name : item.name + '-' + item.artists[0].name
            return {
              value: name
            }
          })
          // this.searchList.title = 'title'
          this.searchList = data
        }
      })
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
}
.search {
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
</style>
