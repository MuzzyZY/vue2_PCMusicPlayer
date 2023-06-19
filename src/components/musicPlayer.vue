<template>
  <div class="player">
    <div class="left">
      <div class="songPic" @mouseenter="changePicCover(true)" @mouseleave="changePicCover(false)" @click="toLyric">
        <img :src="(info?info.al.picUrl:'https://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg')" alt="">
        <div class="cover" v-show="picCover">
          <div class="el-icon-arrow-up" style="font-size:30px; color:#fff;"></div>
        </div>
      </div>
      <div class="songInfo">
        <div class="name">
          {{info?info.name:'未播放'}}
          <span v-if="info?(info.fee!=0?info.fee!=8:false):false">vip</span>
        </div>
        <div class="artist" v-if="info">
          <span v-for="artist in info.ar" :key="artist.index">
            {{artist.name}}
          </span>
        </div>
      </div>
    </div>
    <div class="middle">
      <div class="controller">
        <div class="el-icon-caret-left"></div>
        <div class="el-icon-video-pause" v-if="isPlay" @click="play"></div>
        <div class="el-icon-video-play" v-else @click="pause"></div>
        <div class="el-icon-caret-right"></div>
      </div>
      <div class="slideBox">
        <el-slider v-model="slideValue" :step='1' :min="0" :max="(info?Number((info.dt/1000).toFixed(2)):2)" :format-tooltip="formatTooltip" @change="changeSlide"></el-slider>
      </div>
    </div>
    <div class="right">
      <div class="choseQuality">
        <el-dropdown trigger="click" @command="commandHandler">
          <span class="el-dropdown-link" style='color:rgb(236, 65, 65);'>
            {{quality=='standard'?'标准':(quality=='higher'?'较高':'极高')}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command='standard'>标准(默认)</el-dropdown-item>
            <el-dropdown-item command='higher'>较高音质</el-dropdown-item>
            <el-dropdown-item command='exhigh'>极高音质</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { playSong, songsInfo } from '@/request/request'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      music: null,
      info: null,
      picCover: false,
      isPlay: false,
      slideValue: 0,
      quality: 'standard',
      musicUrl: null,
      audio: null,
      timer: null
    }
  },
  computed: {
    ...mapState(['musicId']),
    songsDuration() {
      return this.info ? Number((this.info.dt / 1000).toFixed(2)) : ''
    }
  },
  methods: {
    changePicCover(boolean) {
      this.picCover = boolean
    },
    commandHandler(key) {
      this.quality = key
    },
    toLyric() {
      if (this.music) {
        this.$router.push({
          path: '/seelyric',
          query: {
            id: this.music
          }
        })
      }
    },
    formatTooltip(val) {
      let m = parseInt(val / 60)
      m = m < 10 ? '0' + m : m
      let s = val % 60
      s = s < 10 ? '0' + s : s
      return m + ':' + s
    },
    play() {
      if (!this.audio) return false
      this.isPlay = false
      this.audio.pause()
      clearInterval(this.timer)
    },
    pause() {
      if (!this.audio) return false
      this.isPlay = true
      let playPromise = this.audio.play()
      if (playPromise) {
        playPromise
          .then(() => {
            let second
            // 音频加载成功
            // 音频的播放需要耗时
            this.timer = setInterval(() => {
              second = this.songsDuration - this.slideValue
              second--
              this.slideValue = this.songsDuration - second
              this.slideValue = Number(this.slideValue.toFixed(2))
              if (second <= 0) {
                this.audio.pause()
                clearInterval(this.timer)
              }
            }, 1000)
          })
          .catch(e => {
            // 音频加载失败
            console.error(e)
          })
      }
    },
    playAudio() {
      let that = this
      let playPromise = null
      playPromise = this.audio.play()
      if (playPromise) {
        playPromise
          .then(() => {
            let second
            // 音频加载成功
            // 音频的播放需要耗时
            that.timer = setInterval(() => {
              second = this.songsDuration - this.slideValue
              second--
              this.slideValue = this.songsDuration - second
              this.slideValue = Number(this.slideValue.toFixed(2))
              if (second <= 0) {
                that.audio.pause()
                clearInterval(that.timer)
              }
            }, 1000)
          })
          .catch(e => {
            // 音频加载失败
            console.error(e)
          })
      }
    },
    changeSlide(newVal) {
      this.slideValue = newVal
      this.audio.currentTime = newVal
    }
  },
  watch: {
    musicId(value) {
      this.music = value
      songsInfo(this.music).then(res => {
        this.info = res.songs[0]
      })
      playSong(this.music, this.quality).then(res => {
        if (this.audio) {
          this.audio.pause()
          this.audio = null
          this.slideValue = 0
        }
        if (this.timer) {
          clearInterval(this.timer)
        }
        this.musicUrl = res.data[0].url || `https://music.163.com/song/media/outer/url?id=${this.music}.mp3`
        this.isPlay = true

        this.audio = new Audio()
        this.audio.src = this.musicUrl
        this.playAudio()
      })
    }
  }
}
</script>

<style lang='less' scoped>
.player {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
}
.left {
  display: flex;
  align-items: center;
  width: 20%;
  height: 100%;
  margin-left: 20px;
  .songPic {
    position: relative;
    width: 30%;
    height: 90%;
    border-radius: 4px;
    overflow: hidden;
    cursor: pointer;
    .cover {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.6);
      display: flex;
      justify-content: center;
      align-items: center;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
  .songInfo {
    flex: 1;
    .name {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 20px;
      cursor: pointer;
      span {
        padding: 0 2px;
        font-size: 12px;
        color: rgb(254, 145, 103);
        border: 1px solid rgb(254, 145, 103);
      }
    }
    .artist {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      cursor: pointer;
    }
  }
}
.middle {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  .controller {
    /deep/div {
      cursor: pointer;
      font-size: 48px;
      color: rgb(49, 49, 49);
    }
    /deep/ .el-icon-video-play,
    .el-icon-video-pause {
      margin: 0 10px;
    }
  }
  .slideBox {
    width: 60%;
    /deep/ .el-slider__button-wrapper {
      top: -17px;
    }
    /deep/ .el-slider__button {
      width: 10px;
      height: 10px;
      border: 1px solid #ccc;
    }
    /deep/ .el-slider__runway {
      height: 3px;
    }
  }
}
.right {
  display: flex;
  align-items: center;
  margin-right: 20px;
  width: 20%;
  height: 100%;
  .choseQuality {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 30px;
    color: rgb(236, 65, 65);
    border: 1px solid rgb(236, 65, 65);
  }
}
</style>
