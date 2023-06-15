<template>
  <div class="searchList">
    <header>
      <h2>搜索：{{searchKey}}</h2>
    </header>
    <div class="content">
      <ul>
        <li>
          <div class="title">音乐标题</div>
          <div class="artist">歌手</div>
          <div class="album">专辑</div>
          <div class="songsTime">时长</div>
        </li>
        <li v-for="(item,index) in list.songs" :key='item.index' @dblclick="playMusic(item.id)">
          <div class=" index overFlow">{{((index+1<10)?(currentPage===1)?'0':'':'') + ((index+1)+(currentPage-1)*30)}}
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
    <div class="bottom">
      <div class="dot" v-for="i in searchTotal" :key='i.index' @click="updatePage(i)" ref="dotList">
        {{i}}
      </div>
    </div>
  </div>
</template>

<script>
import { search } from '@/request/request'
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      list: [],
      searchKey: '',
      searchTotal: '',
      currentPage: 1,
      visible: false
    }
  },
  watch: {
    $route(to, from) {
      if (this.$route.query.keyword) {
        this.searchData()
        let temp = this.$refs.dotList.findIndex(item => {
          return item.classList.contains('active')
        })
        this.$refs.dotList[temp].classList.remove('active')
        this.currentPage = 1
      }
    }
  },
  methods: {
    ...mapMutations(['setMusicId']),
    searchData() {
      this.searchKey = this.$router.currentRoute.query.keyword
      search(this.$router.currentRoute.query.keyword).then(res => {
        this.list = res.result
        this.searchTotal = Math.ceil(res.result.songCount / 30)
      })
    },
    playMusic(id) {
      this.setMusicId(id)
    },
    updatePage(page) {
      let temp = this.$refs.dotList.findIndex(item => {
        return item.classList.contains('active')
      })
      this.$refs.dotList[temp].classList.remove('active')
      this.currentPage = page
      document.querySelector('section').scrollTo(0, 0, {
        behavior: 'smooth'
      })
      search(this.searchKey, 30, this.currentPage - 1).then(res => {
        this.list = res.data.result
        this.searchTotal = Math.ceil(res.data.result.songCount / 30)
      })
    }
  },
  mounted() {
    this.searchData()
    document.querySelector('section').oncontextmenu = function (e) {
      e.preventDefault()
    }
  },
  updated() {
    if (this.$refs.dotList) {
      this.$refs.dotList[this.currentPage - 1].classList.add('active')
    }
  }
}
</script>

<style lang='less' scoped>
.overFlow {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.searchList {
  display: flex;
  flex-direction: column;
}
header {
  h2 {
    text-align: left;
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
.bottom {
  display: flex;
  align-content: center;
  justify-content: center;
  margin-top: 40px;
  .active {
    background-color: rgb(236, 65, 65) !important;
    color: #fff;
  }
  .dot {
    width: 30px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    margin: 0 10px;
    background-color: rgb(235, 235, 235);
    cursor: pointer;
    border-radius: 50%;
  }
}
</style>
