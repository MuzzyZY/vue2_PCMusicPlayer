<template>
  <div class="showLyric">
    <div class="songInfo">
      <div class="pic">
        <img :src="info.al.picUrl" alt="">
      </div>
      <div class="info">
        <div class="name overFlow">{{info.name}}</div>
        <div class="artist overFlow">
          <span v-for="(artist,index) in info.ar" :key="artist.index">
            {{index===info.ar.length-1?artist.name:artist.name+'/'}}
          </span>
        </div>
        <div class="album overFlow">
          {{info.al.name}}
        </div>
      </div>
    </div>
    <div class="lyric">
      <ul>
        <li v-for="(lyric,index) in lyric" :key="index">
          {{lyric}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getLyric, songsInfo } from '@/request/request'
export default {
  data() {
    return {
      musicId: null,
      info: null,
      lyricInfo: null,
      lyricTransInfo: null,
      lyric: null
    }
  },
  created() {
    this.musicId = this.$router.currentRoute.query.id
    songsInfo(this.musicId).then(res => {
      this.info = res.songs[0]
    })
    getLyric(this.musicId).then(res => {
      let lyric = res.lrc.lyric.split('\n')
      let transLyric = res.tlyric.lyric.split('\n')
      transLyric.splice(0, 1)
      transLyric = transLyric.map(item => {
        let temp = item.replace(/\[\d{2}:\d{2}\.\d{2,3}\]/g, '')
        return temp
      })
      lyric = lyric.map(item => {
        let temp = item.replace(/\[\d{2}:\d{2}\.\d{2,3}\]/g, '')
        return temp
      })
      let songsInfo = lyric.splice(0, 2)
      this.lyricInfo = res.lyricUser
      this.lyricTransInfo = res.transUser
      if (transLyric.length === 0) {
        this.lyric = [...songsInfo, ...lyric, this.lyricInfo ? '歌词上传人:' + this.lyricInfo.nickname : '', this.lyricTransInfo ? '翻译上传人:' + this.lyricTransInfo.nickname : '']
      } else {
        let temp = []
        for (let i = 0; i < lyric.length; i++) {
          temp.push(lyric[i], transLyric[i])
        }
        temp = [...songsInfo, ...temp, this.lyricInfo ? '歌词上传人:' + this.lyricInfo.nickname : '', this.lyricTransInfo ? '翻译上传人:' + this.lyricTransInfo.nickname : '']
        temp = temp.filter(item => item !== '')
        this.lyric = temp
      }
    })
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
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 40px;
    }
  }
}
</style>
