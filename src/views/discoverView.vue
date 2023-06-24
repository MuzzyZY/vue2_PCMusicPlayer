<template>
  <div class="discover">
    <div class="navBar" @click="changeActive($event)">
      <router-link to="/" :class="{active:active==='个性推荐'}">个性推荐</router-link>
      <router-link to="/songlist" :class="{active:active==='歌单'}">歌单</router-link>
      <router-link to="/totallist" :class="{active:active==='排行榜'}">排行榜</router-link>
      <router-link to="/artists" :class="{active:active==='歌手'}">歌手</router-link>
      <router-link to="/newsongs" :class="{active:active==='最新音乐'}">最新音乐</router-link>
    </div>
    <div class="content">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  data() {
    return {
      active: '个性推荐'
    }
  },
  computed: {
    ...mapState(['currentTab'])
  },
  methods: {
    ...mapMutations(['updateCurrentTab']),
    changeActive(e) {
      if (e.target.tagName === 'A') {
        this.active = e.target.innerHTML
        this.updateCurrentTab(e.target.innerHTML)
      }
    }
  },
  created() {
    this.active = this.currentTab
  }
}
</script>

<style lang="less" scoped>
.discover {
  width: 100%;
  height: 100%;
  .navBar {
    display: flex;
    align-items: center;
    font-size: 20px;
    height: 10%;
    a {
      transition: all 0.2s;
      margin-right: 14px;
    }
    .active {
      padding-bottom: 6px;
      font-size: 22px;
      font-weight: 700;
      border-bottom: 3px solid rgb(236, 65, 65);
    }
  }
}
</style>
