<template>
  <div class="discover">
    <div class="navBar" @click="changeActive($event)">
      <router-link to="/" class="active">个性推荐</router-link>
      <router-link to="/songlist">歌单</router-link>
      <router-link to="/totallist">排行榜</router-link>
      <router-link to="/artists">歌手</router-link>
      <router-link to="/newsongs">最新音乐</router-link>
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
  methods: {
    changeActive(e) {
      for (let item of e.target.parentNode.children) {
        if (item.classList.contains('active')) {
          item.classList.remove('active')
        }
      }
      e.target.classList.add('active')
    }
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
