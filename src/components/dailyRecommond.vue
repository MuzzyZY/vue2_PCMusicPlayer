<template>
  <div>
    <div class="top">
      <div class="icon">
        <div class="el-icon-date" style="font-size:80px;"></div>
        <span>{{date}}</span>
      </div>
      <div class="text">
        <h3>每日歌曲推荐</h3>
        <div class="tips">根据你的音乐口味生成，每天6:00更新</div>
      </div>
    </div>
    <div class="content">
      <ul>
        <li>
          <div class="title">音乐标题</div>
          <div class="artist">歌手</div>
          <div class="album">专辑</div>
          <div class="songsTime">时长</div>
        </li>
        <li v-for="(item,index) in list" :key='item.index' @dblclick="playMusic(item.id)" @click="toDetail($event)">
          <div class=" index overFlow">{{((index+1<10)?'0'+(index+1):(index+1))}}
          </div>
          <div class="name overFlow">
            <div class="reason">{{item.reason}}</div>
            {{item.name}}
            <span class="vip" v-if="item.fee!=0?item.fee!=8:false">vip</span>
            <div class="mv">
              <span class="el-icon-video-camera" v-if="(item.mv!==0)" @click="seeMv(item.mv,index)"></span>
            </div>
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
  </div>
</template>

<script>
import { getDaylyRecommand } from '@/request/request'
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      list: null
    }
  },
  computed: {
    date() {
      return new Date().getDate()
    }
  },
  created() {
    getDaylyRecommand(localStorage.cookie).then(res => {
      if (res.code === 200) {
        this.list = res.data.dailySongs
      }
    })
  },

  methods: {
    ...mapMutations(['setMusicId', 'updatePlayList']),
    playMusic(id) {
      let temp = JSON.stringify(this.list)
      this.setMusicId(id)
      this.updatePlayList(JSON.parse(temp))
    },
    seeMv(id, index) {
      let info = {
        name: this.list[index].name,
        artist: this.list[index].ar
      }
      this.$router.push({
        path: '/play',
        query: {
          id,
          info
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.top {
  display: flex;
  align-items: center;
  .icon {
    margin-right: 20px;
    font-size: 30px;
  }
}
.content {
  flex: 1;
  ul {
    position: relative;
    .toDetail {
      position: absolute;
      width: 100px;
      height: 40px;
      background-color: rgb(235, 235, 235);
    }
    li {
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
      .overFlow {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        text-overflow: ellipsis;
      }
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
        position: relative;
        width: 50%;
        height: 100%;
        .reason {
          position: absolute;
          left: 2%;
          padding: 0 2px;
          font-size: 12px;
          color: rgb(254, 145, 103);
        }
        .vip {
          padding: 0 2px;
          font-size: 12px;
          color: rgb(254, 145, 103);
          border: 1px solid rgb(254, 145, 103);
        }
        .mv {
          position: absolute;
          left: 90%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 10%;
          height: 100%;
          text-align: center;
          line-height: 50px;
          span {
            cursor: pointer;
            font-size: 26px;
          }
        }
      }
      .artist {
        height: 100%;
        span {
          text-align: center;
          display: inline-block;
          height: 100%;
          cursor: pointer;
        }
      }
      .album {
        height: 100%;
      }
    }
  }
}
</style>
