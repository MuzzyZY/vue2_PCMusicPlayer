<template>
  <div class="discover">
    <div class="navBar">
      <router-link :to="{name:'recommend'}" exact>个性推荐</router-link>
      <router-link :to="{name:'songlist'}" exact>歌单</router-link>
      <router-link :to="{name:'totallist'}" exact>排行榜</router-link>
      <router-link :to="{name:'artists'}" exact>歌手</router-link>
      <router-link :to="{name:'newsongs'}" exact>最新音乐</router-link>
    </div>
    <div class="content">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {},
  methods: {},
  created() {}
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
    .router-link-active {
      padding-bottom: 6px;
      font-size: 22px;
      font-weight: 700;
      border-bottom: 3px solid rgb(236, 65, 65);
    }
  }
  .content {
    margin-top: 0;
  }
}
</style>
