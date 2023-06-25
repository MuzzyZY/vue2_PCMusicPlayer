<template>
  <div class="songList">
    <div class="popList">
      <div class="top">
        <h2>精品歌单推荐</h2>
        <el-tabs v-model="activeName" @tab-click="handleTableClick">
          <el-tab-pane label="最热" name="hot">最热</el-tab-pane>
          <el-tab-pane label="最新" name="new">最新</el-tab-pane>
        </el-tabs>
      </div>
      <ul>
        <li v-for="item in songList" :key="item.id" @click="toListDetail(item.id)">
          <div class="img"><img :src="item.coverImgUrl" alt=""></div>
          <div class="desc">
            <div class="name">{{item.name}}</div>
            <div class="tags">
              <span v-for="tag in item.tags" :key="tag.id">
                {{tag}}
              </span>
            </div>
          </div>
        </li>
      </ul>
      <div class="bottom">
        <el-pagination background layout="prev, pager, next" :page-size='60' :total="totalCount" @current-change='pageChange'>
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getPopSongsList } from '@/request/request'
import { Loading } from 'element-ui'
export default {
  data() {
    return {
      songList: [],
      totalCount: 0,
      activeName: 'hot'
    }
  },
  methods: {
    toListDetail(id) {
      this.$router.push({
        path: '/listdetail',
        query: { id }
      })
    },
    pageChange(val) {
      getPopSongsList(60, (val - 1) * 10).then(res => {
        if (res.code === 200) {
          this.songList = res.playlists
        }
      })
    },
    handleTableClick(tab, event) {
      if (this.activeName === 'new') {
        this.$message({
          type: 'warning',
          message: '接口错误'
        })
        this.activeName = 'hot'
        return location.reload()
      }
      getPopSongsList(60, 0, this.activeName).then(res => {
        if (res.code === 200) {
          this.songList = res.playlists
        }
      })
    }
  },
  created() {
    getPopSongsList(60).then(res => {
      this.totalCount = res.total
      if (res.code === 200) {
        let loadingInstance = Loading.service({ lock: true, fullscreen: true })
        this.songList = res.playlists
        loadingInstance.close()
      }
    })
  }
}
</script>

<style lang='less' scoped>
.popList {
  width: 100%;
  height: auto;
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 10px;
    width: 100%;
    height: 100%;
    li {
      margin-top: 10px;
      min-width: 214px;
      width: 214px;
      height: 280px;
      border: 1px solid #ccc;
      cursor: pointer;
      .img {
        border: 1px solid #ccc;
        width: 100%;
        height: 200px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .desc {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        height: 80px;
        padding: 0 10px;
        .name {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .tags {
          span {
            padding: 2px 4px;
            font-size: 12px;
            border: 1px solid #ccc;
            margin-right: 4px;
          }
        }
      }
    }
  }
  .bottom {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
  }
}
</style>
