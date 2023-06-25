<template>
  <div class="totalList">
    <div class="official">
      <h2>官方榜</h2>
      <div class="rankList" v-for="item in detailList" :key="item.id">
        <div class="left" @click="seeDetail(item.id)">
          <img :src="item.coverImgUrl" alt="">
          <span>{{timestampToMonthDate(item.updateTime)}}更新</span>
        </div>
        <div class="right">
          <ul>
            <li v-for="(song,index) in item.tracks" :key="song.id" @click='searchSongs(song.first)'>
              <div class="index">{{index}}</div>
              <div class="name">
                <span>{{song.first}}</span>
                <span>{{song.second}}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="global">
      <h2>全球榜</h2>
      <ul class="rankList">
        <li v-for="item in globalList" :key="item.id" @click="seeDetail(item.id)">
          <img :src="item.coverImgUrl" alt="">
          <div class="name">
            {{item.name}}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getRankList } from '@/request/request'
import { Loading } from 'element-ui'
export default {
  data() {
    return {
      detailList: [],
      globalList: []
    }
  },
  created() {
    getRankList().then(res => {
      if (res.code === 200) {
        let loadingInstance = Loading.service({ lock: true, fullscreen: true })
        this.detailList = res.list.splice(0, 4)
        this.globalList = res.list
        loadingInstance.close()
      }
    })
  },
  methods: {
    timestampToMonthDate(timestamp) {
      const date = new Date(timestamp)
      const month = date.getMonth() + 1
      const day = date.getDate()
      return `${month}月${day}日`
    },
    seeDetail(id) {
      this.$router.push({
        path: '/listdetail',
        query: {
          id
        }
      })
    },
    searchSongs(name) {
      this.$router.push({
        path: '/searchlist',
        query: {
          keyword: name
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
.rankList {
  display: flex;
  width: 100%;
  height: auto;
  margin-top: 20px;
  .left {
    position: relative;
    width: 150px;
    height: 150px;
    border: 1px solid #ccc;
    cursor: pointer;
    span {
      position: absolute;
      left: 50%;
      top: 74%;
      transform: translate(-50%, -50%);
      font-size: 12px;
      color: #fff;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
  .right {
    margin-left: 50px;
    width: 70%;
    ul {
      li {
        display: flex;
        align-items: center;
        cursor: pointer;
        font-size: 18px;
        height: 50px;
        .index {
          width: 10%;
        }
        .name {
          flex: 1;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }
    }
  }
}
.global {
  margin-top: 30px;
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      width: 150px;
      height: 200px;
      margin-right: 20px;
      cursor: pointer;
      img {
        width: 150px;
        height: 150px;
      }
      .name {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 14px;
        text-align: center;
      }
    }
  }
}
</style>
