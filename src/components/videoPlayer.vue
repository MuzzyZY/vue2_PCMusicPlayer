<template>
  <div class="videoPlayer">
    <div class="info">
      <h2>{{info?info.name:''}}</h2>
      <div class="box" v-if="hasAr">
        <span v-for="(ar,index) in info.artist" :key="ar.id">
          {{index===info.artist.length-1?ar.name:ar.name+'/'}}
        </span>
      </div>
    </div>
    <div class="video">
      <video :src="videoSrc" autoplay controls></video>
    </div>
  </div>
</template>

<script>
import { mvPlayer } from '@/request/request'
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      id: null,
      videoSrc: null,
      info: null,
      hasAr: false
    }
  },
  watch: {
    $route(to, from) {
      this.set()
    }
  },
  created() {
    this.set()
  },

  methods: {
    ...mapActions(['closeAduio']),
    set() {
      this.id = this.$route.query.id
      this.info = this.$route.query.info
      if (this.info ? this.info.artist : false) this.hasAr = true
      if (!this.id) return
      mvPlayer(this.id).then(res => {
        if (res.data.code === 200) {
          this.videoSrc = res.data.url
        }
      })
      this.closeAduio()
    }
  }
}
</script>

<style lang="less" scoped>
.info {
  margin-bottom: 20px;
  .box {
    padding-left: 10px;
  }
}
.video {
  width: 935px;
  height: 500px;
  video {
    width: 100%;
    height: 100%;
  }
}
</style>
