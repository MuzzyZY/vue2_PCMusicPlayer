<template>
  <div class="detail">
    <header>
      <h2>搜索：{{searchKey}}</h2>
    </header>
    <div class="content artist" v-if="searchType==100">
      <ul>
        <li v-for="artist in detail" :key="artist.id" @dblclick="toDetail(artist.id)">
          <div class="img"><img :src="artist.picUrl" alt=""></div>
          <div class="name">
            {{artist.name}}
            <span>{{artist.trans?'- ' +artist.trans:''}}</span>
          </div>
        </li>
      </ul>
    </div>

    <div class="bottom">
      <el-pagination background layout="prev, pager, next" :total="Math.ceil(detail.length/30)">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { search } from '@/request/request'
export default {
  data() {
    return {
      searchKey: '',
      searchType: 1,
      detail: []
    }
  },
  created() {
    this.searchKey = this.$router.currentRoute.query.keyword
    this.searchType = this.$router.currentRoute.query.type
    search(this.searchKey, 30, 0, this.searchType).then(res => {
      if (res.code === 200) {
        this.detail = res.result.artists
      } else {
        this.$message({
          message: '请求失败',
          type: 'warning'
        })
      }
    })
  },
  methods: {
    toDetail(id) {
      this.$router.push({
        path: '/artistdetail',
        query: {
          id
        }
      })
    }
  }
}
</script>

<style lang='less'>
header {
  h2 {
    text-align: left;
  }
}
.content {
  margin-top: 40px;
}
.artist {
  width: 100%;
  height: auto;
  ul {
    width: 100%;
    height: auto;
    li {
      user-select: none;
      cursor: pointer;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      height: 60px;
      margin-top: 10px;
      .img {
        margin-right: 10px;
        width: 60px;
        height: 60px;
        border-radius: 4px;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
.bottom {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
