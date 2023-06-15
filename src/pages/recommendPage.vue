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
  </div>
</template>

<script>
import { getBanner } from '@/request/request'
export default {
  data() {
    return {
      bannerList: [],
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
    }
  },
  mounted() {
    getBanner().then(res => {
      this.bannerList = res.banners
    })
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
</style>
