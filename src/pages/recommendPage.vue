<template>
  <div class="recommend">
    <div class="banner">
      <swiper ref="mySwiper" class="swiper" :options="options">
        <swiper-slide v-for="pic in bannerList" :key="pic.index">
          <img :src="pic.imageUrl" alt="" @click="go163Music(pic)">
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <div class="songsList">
      <h2>推荐歌单</h2>
      <ul>
        <li @click="getDayly">
          <div class="playIcon">
            <div class="el-icon-video-play"></div>
          </div>
          <div class="top">
            <div class="el-icon-date"></div>
            <span>{{todayDate}}</span>
          </div>
          <div class="desc">每日歌曲推荐(需登录)</div>
        </li>
        <li v-for="list in recommandList" :key="list.index" @click="toListDetail(list.id)">
          <div class="playIcon">
            <div class="el-icon-video-play"></div>
          </div>
          <div class="img">
            <img :src="list.picUrl" alt="">
            <span class="el-icon-caret-right">
              {{list.playCount>10000?(list.playCount>100000000?(Number((list.playCount/100000000).toFixed(1))+'亿'):(parseInt(list.playCount/10000)+'万')):list.playCount}}
            </span>
          </div>
          <div class="desc">{{list.name}}</div>
        </li>
      </ul>
    </div>
    <div class="recommandProgram">
      <h2>推荐节目</h2>
      <ul>
        <li v-for="program in recommandProgram" :key="program.index" @click="toProgramDetail(program.id)">
          <div class="playIcon">
            <div class="el-icon-video-play"></div>
          </div>
          <div class="img">
            <img :src="program.coverUrl" alt="">
          </div>
          <div class="desc">{{program.name}}</div>
        </li>
      </ul>
    </div>
    <div class="personalize">
      <h2>独家推送</h2>
      <ul>
        <li v-for="program in personalizedList" :key="program.index" @click="toPersonalize(program.id)">
          <div class="img"><img :src="program.picUrl" alt=""></div>
          <div class="desc">
            {{program.name}}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getBanner, getRecommandList, getDaylyRecommand, getRecommandProgram, personalizedProgram } from '@/request/request'
import { Loading } from 'element-ui'
export default {
  data() {
    return {
      bannerList: [],
      recommandList: [],
      recommandProgram: [],
      personalizedList: [],
      options: {
        slidesPerView: 2,
        spaceBetween: 30,
        slidesPerGroup: 2,
        loop: true,
        loopFillGroupWithBlank: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      }
    }
  },
  computed: {
    todayDate() {
      return new Date().getDate()
    }
  },
  methods: {
    go163Music(pic) {
      console.log(pic)
      if (pic.targetType === 1) {
        location.href = `https://music.163.com/#/song?id=${pic.targetId}`
      } else if (pic.targetType === 10) {
        location.href = `https://music.163.com/#/album?id=${pic.targetId}`
      } else if (pic.targetType === 1000) {
        location.href = `https://music.163.com/#/playlist?id=${pic.targetId}`
      } else {
        location.href = 'https://music.163.com/'
      }
    },
    toListDetail(id) {
      this.$router.push({
        path: '/listdetail',
        query: { id }
      })
    },
    toProgramDetail(id) {
      console.log(id)
    },
    toPersonalize(id) {
      console.log(id)
    },
    getDayly() {
      getDaylyRecommand().then(res => {
        if (res.code !== 200) {
          this.$message({
            message: '请登录后重试',
            type: 'warning'
          })
        }
      })
    }
  },
  mounted() {
    getBanner().then(res => {
      this.bannerList = res.banners
    })
  },
  created() {
    let loadingInstance = Loading.service({ lock: true, fullscreen: true })
    getRecommandList(9).then(res => {
      if (res.code === 200) {
        this.recommandList = res.result
      } else {
        this.$message({
          message: '请求错误',
          type: 'warning'
        })
      }
    })
    getRecommandProgram().then(res => {
      if (res.code === 200) {
        let data = res.programs
        data = data.splice(0, 5)
        this.recommandProgram = data
      } else {
        this.$message({
          message: '请求错误',
          type: 'warning'
        })
      }
    })
    personalizedProgram().then(res => {
      if (res.code === 200) {
        let data = res.result
        this.personalizedList = data
      } else {
        this.$message({
          message: '请求错误',
          type: 'warning'
        })
      }
    })
    loadingInstance.close()
  }
}
</script>

<style lang='less' scoped>
.banner {
  position: relative;
  width: 80%;
  height: 220px;
  margin: 0 auto;
  img {
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
  /deep/ .swiper-container-horizontal > .swiper-pagination-bullets {
    bottom: -2px;
  }
  /deep/ .swiper-pagination-bullet-active {
    background: rgb(221, 0, 27);
  }
  /deep/ .swiper-container {
    width: 100%;
    height: 100%;
  }
  /deep/ .swiper-wrapper {
    height: 90%;
  }
}
.songsList {
  width: 100%;
  height: auto;
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    height: auto;
    li {
      position: relative;
      width: 18%;
      height: 230px;
      max-height: 230px;
      min-height: 160px;
      border: 1px solid #ccc;
      margin-top: 20px;
      cursor: pointer;
      overflow: hidden;
      &:hover {
        .playIcon div {
          z-index: 1;
          opacity: 1;
        }
      }
      .playIcon {
        div {
          transition: all 0.3s;
          position: absolute;
          opacity: 0;
          z-index: -1;
          right: 8px;
          bottom: 50px;
          font-size: 34px;
          color: #fff;
        }
      }
      .top {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 80%;
        font-size: 28px;
        div {
          font-size: 50px;
        }
      }
      .img {
        position: relative;
        width: 100%;
        height: 80%;
        span {
          position: absolute;
          right: 10px;
          top: 10px;
          font-size: 16px !important;
          color: #fff;
        }
        img {
          width: 100%;
          height: 100%;
        }
      }
      .desc {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: 4px 10px;
        width: 100%;
        height: 25%;
        font-size: 14px;
        text-align: center;
      }
    }
  }
}
.recommandProgram {
  margin-top: 30px;
  width: 100%;
  height: auto;
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    height: auto;
    li {
      position: relative;
      width: 18%;
      height: 230px;
      max-height: 230px;
      min-height: 160px;
      border: 1px solid #ccc;
      margin-top: 20px;
      cursor: pointer;
      overflow: hidden;
      &:hover {
        .playIcon div {
          z-index: 1;
          opacity: 1;
        }
      }
      .playIcon {
        div {
          opacity: 0;
          z-index: -1;
          right: 8px;
          bottom: 50px;
          transition: all 0.3s;
          position: absolute;
          font-size: 34px;
          color: #fff;
        }
      }
      .img {
        position: relative;
        width: 100%;
        height: 80%;
        span {
          position: absolute;
          right: 10px;
          top: 10px;
          font-size: 16px !important;
          color: #fff;
        }
        img {
          width: 100%;
          height: 100%;
        }
      }
      .desc {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: 4px 10px;
        width: 100%;
        height: 25%;
        font-size: 14px;
        text-align: center;
      }
    }
  }
}
.personalize {
  margin-top: 30px;
  width: 100%;
  height: auto;
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    height: auto;
    margin-top: 20px;
    li {
      width: 30%;
      height: 150px;
      cursor: pointer;
      .img {
        width: 100%;
        height: 70%;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .desc {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: 4px 10px;
        width: 100%;
        height: 30%;
        font-size: 14px;
        text-align: center;
      }
    }
  }
}
</style>
