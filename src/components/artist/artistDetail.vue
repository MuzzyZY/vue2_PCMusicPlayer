<template>
  <div class="artistDetail">
    <div class="top">
      <div class="img"><img :src="artistInfo.artist.cover" alt=""></div>
      <div class="info">
        <h2>{{artistInfo.artist.name}}</h2>
        <div class="alias">
          <span v-for="item in artistInfo.artist.alias" :key="item.id">{{item}}</span>
        </div>
        <div class="count">
          <span>单曲数：{{artistInfo.artist.musicSize}}</span>
          <span>专辑数：{{artistInfo.artist.albumSize}}</span>
          <span>MV数：{{artistInfo.artist.mvSize}}</span>
          <span>演出数：{{artistInfo.preferShow}}</span>
        </div>
      </div>
    </div>
    <div class="content">
      <ul>
        <li :class="{active:radio==='album'}" @click="handleActive('album')">专辑</li>
        <li :class="{active:radio==='music'}" @click="handleActive('music')">单曲</li>
      </ul>
      <keep-alive>
        <component :is='currentTab' :artistId='id'></component>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import { getArtistDetail } from '@/request/request'
import artistAlbum from './artistAlbum.vue'
import artistMusic from './artistMusic.vue'
export default {
  data() {
    return {
      id: null,
      artistInfo: null,
      currentTab: artistAlbum,
      radio: 'album'
    }
  },
  components: {
    artistAlbum,
    artistMusic
  },
  methods: {
    handleActive(str) {
      this.radio = str
      if (str === 'album') {
        this.currentTab = artistAlbum
      } else if (str === 'music') {
        this.currentTab = artistMusic
      }
    }
  },
  created() {
    this.id = this.$router.currentRoute.query.id
    getArtistDetail(this.id).then(res => {
      this.artistInfo = res.data
    })
  }
}
</script>

<style lang='less' scoped>
.top {
  display: flex;
  width: 100%;
  height: 200px;
  .img {
    width: 200px;
    height: 200px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .info {
    margin-left: 40px;
    flex: 1;
    font-size: 18px;
    h2 {
      font-size: 28px;
    }
    .alias {
      margin: 20px 0 30px 0;
      span {
        margin-right: 15px;
      }
    }
    .count {
      span {
        margin-right: 30px;
      }
    }
  }
}
.content {
  width: 100%;
  > ul {
    display: flex;
    width: 100%;
    height: 40px;
    background-color: rgb(245, 245, 245);
    li {
      user-select: none;
      cursor: pointer;
      width: 80px;
      height: 100%;
      margin-right: 20px;
      text-align: center;
      line-height: 40px;
      transition: all 0.3s;
    }
    .active {
      background-color: #fff;
    }
  }
}
</style>
