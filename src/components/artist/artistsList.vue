<template>
  <div class="artistList">
    <div class="top">
      <div class="chooseLang">
        <h4>语种：</h4>
        <div class="container">
          <el-radio-group v-model="langRadio" @change="handleLangChange">
            <el-radio label="-1">全部</el-radio>
            <el-radio label="7">华语</el-radio>
            <el-radio label="96">欧美</el-radio>
            <el-radio label="8">日本</el-radio>
            <el-radio label="16">韩国</el-radio>
            <el-radio label="0">其他</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="chooseKind">
        <h4>语种：</h4>
        <div class="container">
          <el-radio-group v-model="kindRadio" @change="handleKindChange">
            <el-radio label="-1">全部</el-radio>
            <el-radio label="1">男歌手</el-radio>
            <el-radio label="2">女歌手</el-radio>
            <el-radio label="3">乐队组合</el-radio>
          </el-radio-group>
        </div>
      </div>
    </div>
    <div class="content">
      <ul>
        <li v-for="artist in artistList" :key="artist.id" @click="seeDetail(artist.id)">
          <div class="img"><img :src="artist.picUrl" alt=""></div>
          <div class="name">{{artist.name}}</div>
        </li>
      </ul>
    </div>
    <div class="seeMore" @click="seeMore">
      查看更多
    </div>
  </div>
</template>

<script>
import { getArtist } from '@/request/request'
import { Loading } from 'element-ui'
export default {
  data() {
    return {
      langRadio: '-1',
      kindRadio: '-1',
      artistList: [],
      count: 1
    }
  },
  methods: {
    handleLangChange(val) {
      this.count = 1
      this.artistList = []
      this.langRadio = val
      getArtist(30, (this.count - 1) * 30, -1, val).then(res => {
        this.artistList = res.artists
      })
    },
    handleKindChange(val) {
      this.count = 1
      this.artistList = []
      this.kindRadio = val
      getArtist(30, (this.count - 1) * 30, val, -1).then(res => {
        this.artistList = res.artists
      })
    },
    seeDetail(id) {
      this.$router.push({
        path: '/artistdetail',
        query: {
          id
        }
      })
    },
    seeMore() {
      this.count++
      getArtist(30, (this.count - 1) * 30, this.kindRadio, this.langRadio).then(res => {
        let loadingInstance = Loading.service({ lock: true, fullscreen: true })
        this.artistList.push(...res.artists)
        loadingInstance.close()
      })
    }
  },
  created() {
    getArtist(30, (this.count - 1) * 30, -1, -1).then(res => {
      let loadingInstance = Loading.service({ lock: true, fullscreen: true })
      this.artistList = res.artists
      loadingInstance.close()
    })
  }
}
</script>

<style lang='less' scoped>
.chooseLang,
.chooseKind {
  margin-top: 10px;
  display: flex;
}
.content {
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      cursor: pointer;
      margin-top: 20px;
      margin-right: 20px;
      width: 150px;
      height: 180px;
      .img {
        width: 150px;
        height: 150px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .name {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        padding: 4px 6px;
        text-overflow: ellipsis;
        text-align: center;
      }
    }
  }
}
.seeMore {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  cursor: pointer;
}
</style>
