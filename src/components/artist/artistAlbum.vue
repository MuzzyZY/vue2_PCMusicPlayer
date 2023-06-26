<template>
  <div>
    <div class="list" v-for="(item,bIndex) in albumList" :key="item.id">
      <div class="left">
        <div class="img">
          <img :src="item.picUrl" alt="">
        </div>
        <span>{{timestampToMonthDate(item.publishTime)}}</span>
      </div>
      <div class="right">
        <h3>{{item.name}}</h3>
        <ul>
          <li v-for="(song,index) in item.songs" :key="song.id" @dblclick="play(song.id,item,index)">
            <div class="box">
              <span>{{index<9?'0'+(index+1):(index+1)}}</span>
              <div class="name">{{song.name}}</div>
              <span class="vip" v-if="song?(song.fee!=0?song.fee!=8:false):false">vip</span>
            </div>
            <div class="mv">
              <span class="el-icon-video-camera" v-if="(song.mv!==0)" @click="seeMv(song.mv,bIndex,index)"></span>
            </div>
            <div class="duration">
              {{(song.dt/1000/60).toFixed(2)}}
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="seeMore" @click='seeMore'>查看更多</div>
  </div>
</template>

<script>
import { getAlbumInfo, getArtistAlbum } from '@/request/request'
import { mapMutations } from 'vuex'
import { Loading } from 'element-ui'
export default {
  props: ['artistId'],
  data() {
    return {
      albumList: null,
      count: 1
    }
  },
  created() {
    getArtistAlbum(this.artistId).then(res => {
      let loadingInstance = Loading.service({ lock: true, fullscreen: true })
      let list = res.hotAlbums
      list.forEach(item => {
        getAlbumInfo(item.id).then(res1 => {
          item.songs = res1.songs
        })
      })
      this.albumList = list
      loadingInstance.close()
    })
  },
  methods: {
    ...mapMutations(['setMusicId', 'updatePlayList', 'updateHistoryList']),
    timestampToMonthDate(timestamp) {
      const date = new Date(timestamp)
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      return `${year}年${month}月${day}日`
    },
    play(id, album, index) {
      let temp = album.songs.slice(index)
      this.updatePlayList(temp)
      this.updateHistoryList(id)
      this.setMusicId(id)
    },
    seeMore() {
      let scrollTop = document.querySelector('section').scrollTop
      this.count++
      getArtistAlbum(this.artistId, 30, (this.count - 1) * 30).then(res => {
        let list = res.hotAlbums
        list.forEach(item => {
          getAlbumInfo(item.id).then(res1 => {
            item.songs = res1.songs
          })
        })
        this.albumList = list
      })
      document.querySelector('section').scrollTop = Math.floor(scrollTop / 2) - 300
    },
    seeMv(id, bIndex, index) {
      let info = {
        name: this.albumList[bIndex].songs[index].name,
        artist: this.albumList[bIndex].songs[index].ar
      }
      this.$router.push({
        path: '/play',
        query: {
          id,
          info
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
.list {
  margin-top: 20px;
  display: flex;
  width: 100%;
  height: 220px;
}
.left {
  width: 200px;
  height: 220px;
  text-align: center;
  .img {
    width: 200px;
    height: 200px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.right {
  flex: 1;
  margin-left: 40px;
  width: 70%;
  height: 95%;
  overflow: auto;
  h2 {
    height: 30px;
  }
  ul {
    li {
      user-select: none;
      cursor: pointer;
      display: flex;
      width: 80%;
      height: 30px;
      line-height: 30px;
      align-items: center;
      justify-content: space-between;
      position: relative;
      .mv {
        position: absolute;
        left: 80%;
        top: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        line-height: 30px;
        width: 30px;
        height: 30px;
        span {
          cursor: pointer;
          font-size: 26px;
        }
      }
      .box {
        display: flex;
        align-items: center;
        span {
          line-height: 30px;
        }
        .name {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 70%;
          margin: 0 20px;
        }
        .vip {
          width: auto;
          height: 15px;
          padding: 0 2px;
          font-size: 13px;
          line-height: 10px;
          color: rgb(254, 145, 103);
          border: 1px solid rgb(254, 145, 103);
        }
      }
      .duration {
        float: right;
      }
    }
  }
}
.seeMore {
  width: 100%;
  height: 60px;
  line-height: 60px;
  text-align: center;
}
</style>
