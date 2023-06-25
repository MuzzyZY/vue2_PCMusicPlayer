<template>
  <div class="musicList">
    <div class="chooseType">
      <el-radio-group v-model="sortType" @input="handleChangeChose">
        <el-radio label="hot">热度</el-radio>
        <el-radio label="time">时间</el-radio>
      </el-radio-group>
    </div>
    <div class="content">
      <ul>
        <li>
          <div class="title">音乐标题</div>
          <div class="artist">歌手</div>
          <div class="album">专辑</div>
          <div class="songsTime">时长</div>
        </li>
        <li v-for="(item,index) in musicList" :key='item.id' @dblclick="playMusic(item.id)">
          <div class=" index overFlow">{{((index+1<10)?(page===1)?'0':'':'') + ((index+1)+(page-1)*30)}}
          </div>
          <div class="name overFlow">
            {{item.name}}
            <span v-if="item.fee!=0?item.fee!=8:false">vip</span>
          </div>
          <div class="artist overFlow">
            <span v-for="singer in item.ar" :key='singer.index'>
              {{item.ar.length!==1?singer.name+'/':singer.name}}
            </span>
          </div>
          <div class="album overFlow">{{item.al.name}}</div>
          <div class="songsTime overFlow">{{(item.dt/1000/60).toFixed(2)}}</div>
        </li>
      </ul>
    </div>
    <div class="pagination">
      <el-pagination background layout="prev, pager, next" @current-change='handleChangePage' :page-size='50' :total="totalCount">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getArtistMusic } from '@/request/request'
import { Loading } from 'element-ui'
import { mapMutations } from 'vuex'
export default {
  props: ['artistId'],
  data() {
    return {
      musicList: null,
      sortType: 'hot',
      totalCount: 0,
      page: 1
    }
  },
  created() {
    this.getMusic()
  },
  methods: {
    ...mapMutations(['setMusicId']),
    handleChangePage(val) {
      this.page = val
      this.getMusic()
    },
    handleChangeChose(val) {
      this.sortType = val
      this.page = 1
      this.getMusic()
    },
    getMusic() {
      getArtistMusic(this.artistId, 50, (this.page - 1) * 50, this.sortType).then(res => {
        if (res.code === 200) {
          let loadingInstance = Loading.service({ lock: true, fullscreen: true })
          this.totalCount = res.total
          this.musicList = res.songs
          loadingInstance.close()
        }
      })
    },
    playMusic(id) {
      this.setMusicId(id)
    }
  }
}
</script>

<style lang='less' scoped>
.musicList {
  .chooseType {
    display: flex;
    align-items: center;
    height: 40px;
  }
  .content {
    margin-top: 0;
    ul {
      position: relative;
      li {
        .overFlow {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        user-select: none;
        &:first-of-type {
          height: 60px;
          background-color: rgb(245, 245, 245);
          line-height: 60px;
        }
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
  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80px;
  }
}
</style>
