<template>
  <div class="showLyric">
    <div class="songInfo">
      <div class="pic">
        <img :src="info.al.picUrl" alt="">
      </div>
      <div class="info">
        <div class="name overFlow">{{ info.name }}</div>
        <div class="artist overFlow">
          <span v-for="(artist, index) in info.ar" :key="artist.index">
            {{ index === info.ar.length - 1 ? artist.name : artist.name + '/' }}
          </span>
        </div>
        <div class="album overFlow">
          {{ info.al.name }}
        </div>
      </div>
    </div>
    <div class="noLyric" v-if="noLyric">
      <h2>节目无歌词</h2>
    </div>
    <div class="lyric" v-else>
      <ul ref='lyricList'>
        <li v-for="(item, index) in lyric" :key="index"
          :class="{ active: currentTime * 1000 > item.nowTime && currentTime * 1000 < item.nextTime }">
          <div v-for='(lyric, index) in item.lyric' :key="index">
            {{ lyric }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getLyric, songsInfo } from '@/request/request'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      musicId: null,
      info: null,
      lyricInfo: null,
      lyricTransInfo: null,
      lyric: [],
      currentTime: 0,
      noLyric: false
    }
  },
  computed: {
    ...mapState(['slideValue', 'musicId'])
  },
  watch: {
    slideValue(val) {
      this.currentTime = val
      let active = document.querySelector('.lyric .active')
      if (active) {
        if (active.offsetTop > 385) {
          this.$refs.lyricList.scrollTop = active.offsetTop - 300
        }
      }
    },
    $route(to, from) {
      this.musicId = this.$store.state.musicId || this.$route.query.id
      songsInfo(this.musicId).then(res => {
        console.log(res)
        this.info = res.songs[0]
      })
    }
  },
  methods: {
    formatToMs(timeStr) {
      let [minutes, timeString] = timeStr.split(':').map(str => str)
      minutes = Number(minutes)
      let [seconds, milliseconds] = timeString.split('.').map(str => parseInt(str))
      return (minutes * 60 + seconds) * 1000 + milliseconds
    },
    formatLyric() {
      getLyric(this.musicId).then(res => {
        if (res.lrc.lyric === '') return (this.noLyric = true)
        this.lyricInfo = res.lyricUser
        this.lyricTransInfo = res.transUser
        let lyric = res.lrc.lyric
        lyric = lyric.split('\n')
        let productor = lyric.splice(0, 2)
        let transLyric
        let lyricTime = []
        if (res.tlyric.lyric) {
          transLyric = res.tlyric.lyric
          transLyric = transLyric.split('\n')
          transLyric.splice(0, 1)
          transLyric = transLyric.map(item => {
            item = item.replace(/\[(\d{1,2}:)?([0-5]\d:)?([0-5]\d|\d{1,2})\.(\d{2,3})\]/, '')
            return item
          })
        }
        lyric = lyric.filter(item => {
          if (item.match(/(\d{1,2}:)?([0-5]\d:)?([0-5]\d|\d{1,2})\.(\d{2,3})/)) {
            lyricTime.push(item.match(/(\d{1,2}:)?([0-5]\d:)?([0-5]\d|\d{1,2})\.(\d{2,3})/)[0])
          }
          return item
        })
        lyric = lyric.map(item => {
          item = item.replace(/\[(\d{1,2}:)?([0-5]\d:)?([0-5]\d|\d{1,2})\.(\d{2,3})\]/, '')
          return item
        })
        if (transLyric) {
          for (let i = 0; i < lyric.length; i++) {
            if (lyricTime[i]) {
              this.lyric.push({
                lyric: [lyric[i], transLyric[i]],
                nowTime: this.formatToMs(lyricTime[i]),
                nextTime: lyricTime[i + 1] ? this.formatToMs(lyricTime[i + 1]) : 0
              })
            }
          }
        } else {
          for (let i = 0; i < lyric.length; i++) {
            this.lyric.push({
              lyric: [lyric[i]],
              nowTime: this.formatToMs(lyricTime[i]),
              nextTime: lyricTime[i + 1] ? this.formatToMs(lyricTime[i + 1]) : 0
            })
          }
        }

        productor = productor.map(item => {
          return item.replace(/\[(\d{1,2}:)?([0-5]\d:)?([0-5]\d|\d{1,2})\.(\d{2,3})\]/, '')
        })
        this.lyric.unshift({
          lyric: productor,
          next: this.formatToMs(lyricTime[0]),
          nowTime: 0
        })

        this.lyricInfo = this.lyricInfo ? '歌词上传者：' + this.lyricInfo.nickname : ''
        this.lyricTransInfo = this.lyricTransInfo ? '翻译上传者：' + this.lyricTransInfo.nickname : ''
        this.lyric.push({
          lyric: [this.lyricInfo, this.lyricTransInfo],
          next: 0,
          nowTime: 0
        })
      })
    }
  },
  created() {
    this.musicId = this.$store.state.musicId || this.$route.query.id
    songsInfo(this.musicId).then(res => {
      console.log(res)
      this.info = res.songs[0]
    })
    this.formatLyric()
  }
}
</script>

<style lang='less' scoped>
.showLyric {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
}

.songInfo {
  width: 35%;
  height: 70%;

  .pic {
    width: 100%;
    height: 80%;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .info {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
    height: 20%;

    .overFlow {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .name {
      font-size: 24px;
    }
  }
}

.lyric {
  width: 60%;
  height: 70%;

  ul {
    width: 100%;
    height: 100%;
    overflow: auto;

    li {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 70px;
      font-size: 14px;
    }

    .active {
      font-size: 20px;
    }
  }
}

.noLyric {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
}
</style>
