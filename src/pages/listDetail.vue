<template>
  <div class="listDetail">
    <div class="info">
      <div class="top">
        <div class="detail">
          <h2 class="name">{{listInfo.name}}</h2>
          <div class="desc">
            {{listInfo.description}}
          </div>
        </div>
        <div class="moreInfo">
          <div class="pic">
            <a :href="listInfo.coverImgUrl" target="_blank">
              <img :src="listInfo.coverImgUrl" alt="">
              <span class="el-icon-caret-right">
                {{listInfo.playCount>10000?(listInfo.playCount>100000000?(Number((listInfo.playCount/100000000).toFixed(1))+'亿'):(parseInt(listInfo.playCount/10000)+'万')):listInfo.playCount}}
              </span>
            </a>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="tag">
          <ul>
            <div>标签：</div>
            <li v-for="tag in listInfo.tags" :key="tag.index">
              <span>{{tag}}</span>
            </li>
          </ul>
        </div>
        <div class="creatorInfo">
          <span>制作者：<br> {{listInfo.creator.nickname}}</span>
        </div>
      </div>
    </div>
    <div class="songsList">
      <div class="songsCount">
        <h3><span class="el-icon-video-play"></span>播放全部 共{{listInfo.trackCount}}首</h3>
      </div>
      <div class="list">
        <ul>
          <li v-for="(song,index) in listData" :key="song.index">
            <div class="info" @click="playMusic(song.id)">
              <div class="name">
                {{((index+1<10)?(currentPage===1)?'0':'':'') + ((index+1)+(currentPage-1)*30)}} - {{song.name}}
                <span v-if="song.fee!=0?song.fee!=8:false">vip</span>
              </div>
              <div class="artists">
                <span class="artist" v-for="(artist,index1) in song.ar" :key="artist.index">
                  {{index1===song.ar.length-1?artist.name:artist.name+'/'}}
                </span>
              </div>
            </div>
            <div class="mv">
              <span class="el-icon-video-camera" v-if="(song.mv!==0)" @click="seeMv(song.mv)"></span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="page">
      <el-pagination background layout="prev, pager, next" :page-size="30" :total="listInfo.trackCount" ref="page" :current-page="currentPage" @current-change='pageChange'>
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getListDetail, getListSongs } from '@/request/request'
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      listInfo: null,
      listData: null,
      currentPage: 1
    }
  },
  methods: {
    ...mapMutations(['setMusicId', 'updateHistoryList']),
    seeMv(id) {
      console.log(id)
    },
    pageChange(page) {
      this.currentPage = page
      if (page === this.$refs.page.internalPageCount) {
        getListSongs(this.$router.currentRoute.query.id, this.$refs.page.total - (page - 1) * 30, page).then(res => {
          if (res.code === 200) {
            console.log(res)
            return (this.listData = res.songs)
          } else {
            return this.$message({
              type: 'warning',
              message: '获取歌单内歌曲失败'
            })
          }
        })
      }
      getListSongs(this.$router.currentRoute.query.id, 30, page).then(res => {
        if (res.code === 200) {
          this.listData = res.songs
        } else {
          this.$message({
            type: 'warning',
            message: '获取歌单内歌曲失败'
          })
        }
      })
    },
    playMusic(id) {
      this.updateHistoryList(id)
      this.setMusicId(id)
    }
  },
  mounted() {
    let { id } = this.$router.currentRoute.query
    getListDetail(id).then(res => {
      if (res.code === 200) {
        this.listInfo = res.playlist
        console.log(this.listInfo.tags.length)
        getListSongs(id, 30, 0).then(res => {
          if (res.code === 200) {
            this.listData = res.songs
          } else {
            this.$message({
              type: 'warning',
              message: '获取歌单内歌曲失败'
            })
          }
        })
      } else {
        this.$message({
          type: 'warning',
          message: '获取歌单信息失败'
        })
      }
    })
  }
}
</script>

<style lang='less' scoped>
.listDetail {
  width: 100%;
  height: 100%;
  > .info {
    height: 180px;
    border-bottom: 1px solid #ccc;
    .top {
      width: 100%;
      height: 65%;
      display: flex;
      .detail {
        width: 80%;
        .name {
          width: 100%;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .desc {
          margin-top: 10px;
          width: 100%;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      .moreInfo {
        width: 20%;
        height: 100%;
        .pic {
          position: relative;
          width: 70%;
          height: 100%;
          a {
            display: inline-block;
            width: 100%;
            height: 100%;
          }
          img {
            width: 100%;
            height: 100%;
          }
          span {
            position: absolute;
            right: 10%;
            top: 10px;
            font-size: 12px;
            color: #fff;
          }
        }
      }
    }
    .bottom {
      display: flex;
      width: 100%;
      height: 25%;
      .tag {
        width: 80%;
        height: 100%;
        ul {
          display: flex;
          width: 100%;
          height: 100%;
          div {
            display: flex;
            justify-content: center;
            align-items: center;
          }
          li {
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            span {
              margin-right: 10px;
              padding: 6px 10px;
              font-size: 13px;
              color: rgb(254, 145, 103);
              border: 1px solid rgb(254, 145, 103);
            }
          }
        }
      }
      .creatorInfo {
        width: 20%;
        height: 100%;
        span {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 70%;
          height: 100%;
          cursor: pointer;
        }
      }
    }
  }
  .songsList {
    margin-top: 20px;
    .songsCount {
      cursor: pointer;
      width: 100%;
      font-size: 18px;
      color: #000;
    }
    .list {
      width: 100%;
      height: auto;
      ul {
        margin-top: 10px;
        width: 100%;
        height: auto;
        li {
          user-select: none;
          display: flex;
          width: 100%;
          height: 50px;
          border-bottom: 1px solid #ccc;
          .info {
            display: flex;
            flex-direction: column;
            justify-content: center;
            width: 80%;
            height: 100%;
            .name {
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1;
              overflow: hidden;
              text-overflow: ellipsis;
              font-size: 18px;
              span {
                padding: 0 2px;
                font-size: 12px;
                color: rgb(254, 145, 103);
                border: 1px solid rgb(254, 145, 103);
              }
            }
            .artists {
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1;
              overflow: hidden;
              text-overflow: ellipsis;
              font-size: 14px;
            }
          }
          .mv {
            width: 20%;
            height: 100%;
            text-align: center;
            line-height: 50px;
            span {
              cursor: pointer;
              font-size: 26px;
            }
          }
        }
      }
    }
  }
  .page {
    margin-top: 20px;
    text-align: center;
  }
}
</style>
