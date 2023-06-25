<template>
  <div class="newSongs">
    <div class="select">
      <el-radio-group v-model="areaRadio" @input="changeArea">
        <el-radio :label="0">全部</el-radio>
        <el-radio :label="7">华语</el-radio>
        <el-radio :label="96">欧美</el-radio>
        <el-radio :label="8">日本</el-radio>
        <el-radio :label="16">韩国</el-radio>
      </el-radio-group>
    </div>
    <div class="list">
      <ul>
        <li v-for="(item,index) in newSongsList" :key='item.id' @dblclick="playMusic(item.id)">
          <div class=" index overFlow">{{((index+1<10)?'0'+(index+1):index)}}
          </div>
          <div class="name overFlow">
            {{item.name}}
            <span v-if="item.fee!=0?item.fee!=8:false">vip</span>
          </div>
          <div class="artist overFlow">
            <span v-for="singer in item.artists" :key='singer.index'>
              {{item.artists.length!==1?singer.name+'/':singer.name}}
            </span>
          </div>
          <div class="album overFlow">{{item.album.name}}</div>
          <div class="songsTime overFlow">{{(item.duration/1000/60).toFixed(2)}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getNewSongs } from '@/request/request'
import { Loading } from 'element-ui'
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      areaRadio: 0,
      newSongsList: null
    }
  },
  methods: {
    ...mapMutations(['setMusicId', 'updatePlayList', 'updateHistoryList']),
    getData() {
      getNewSongs(this.areaRadio).then(res => {
        if (res.code === 200) {
          let loadingInstance = Loading.service({ lock: true, fullscreen: true })
          this.newSongsList = res.data
          loadingInstance.close()
        }
      })
    },
    changeArea(val) {
      this.areaRadio = val
      this.getData()
    },
    playMusic(id) {
      this.setMusicId(id)
      let temp = JSON.stringify(this.newSongsList)
      this.updateHistoryList(id)
      this.updatePlayList(JSON.parse(temp))
    }
  },
  created() {
    this.getData()
  }
}
</script>

<style lang='less' scoped>
.list {
  margin-top: 20px;
  ul {
    li {
      .overFlow {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      user-select: none;
      &:hover {
        background-color: rgb(242, 242, 243);
      }
      display: flex;
      align-items: center;
      height: 40px;
      margin: 10px 0;
      line-height: 40px;
      text-align: center;
      .title {
        width: 55%;
      }
      .artist {
        width: 20%;
      }
      .album {
        width: 20%;
      }
      .songsTime {
        width: 5%;
      }
      .index {
        width: 5%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-content: center;
      }
      .name {
        width: 50%;
        height: 100%;
        span {
          padding: 0 2px;
          font-size: 12px;
          color: rgb(254, 145, 103);
          border: 1px solid rgb(254, 145, 103);
        }
      }
      .artist {
        height: 100%;
        span {
          text-align: center;
          display: inline-block;
          height: 100%;
        }
      }
      .album {
        height: 100%;
      }
    }
  }
}
</style>
