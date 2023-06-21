<template>
  <div class="songList">
    <div class="popList">
      <h2>精品歌单推荐</h2>
      <ul>
        <li v-for="item in songList" :key="item.id" @click="toListDetail(item.id)">
          <div class="img"><img :src="item.coverImgUrl" alt=""></div>
          <div class="desc">
            <div class="name">{{item.name}}</div>
            <div class="tags">
              <span v-for="tag in item.tags" :key="tag.id">
                {{tag}}
              </span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getPopSongsList } from '@/request/request'
export default {
  data() {
    return {
      songList: [],
      loading: false,
      timer: null
    }
  },
  computed: {
    disabled() {
      return this.loading
    }
  },
  methods: {
    toListDetail(id) {
      this.$router.push({
        path: '/listdetail',
        query: { id }
      })
    },
    load() {
      this.$nextTick(() => {
        this.loading = true
        console.log(this)
      })
    }
  },
  created() {
    getPopSongsList(30).then(res => {
      if (res.code === 200) {
        this.songList = res.playlists
      }
    })
  }
}
</script>

<style lang='less' scoped>
.popList {
  width: 100%;
  height: auto;
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 10px;
    width: 100%;
    height: 100%;
    li {
      margin-top: 10px;
      min-width: 214px;
      width: 214px;
      height: 280px;
      border: 1px solid #ccc;
      cursor: pointer;
      .img {
        border: 1px solid #ccc;
        width: 100%;
        height: 200px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .desc {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        height: 80px;
        padding: 0 10px;
        .name {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .tags {
          span {
            padding: 2px 4px;
            font-size: 12px;
            border: 1px solid #ccc;
            margin-right: 4px;
          }
        }
      }
    }
  }
}
</style>
