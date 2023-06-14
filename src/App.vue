<template>
  <div id="app">
    <nav>
      <searchBar></searchBar>
    </nav>
    <div class="content">
      <aside>
        <router-link to="/discover">发现音乐</router-link>
        <router-link to="/myinfo">myInfo</router-link>
      </aside>
      <section>
        <router-view></router-view>
      </section>
    </div>
    <footer>footer</footer>
  </div>
</template>

<script>
import searchBar from './components/searchBar.vue'
export default {
  data() {
    return {}
  },
  components: {
    searchBar
  }
}
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}
html,
body {
  width: 100%;
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
nav {
  width: 100%;
  height: 10%;
  background-color: rgb(245, 245, 245);
}
footer {
  width: 100%;
  height: 10%;
}
.content {
  display: flex;
  width: 100%;
  height: 80%;
  aside {
    width: 30%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  section {
    padding: 10px 20px;
    width: 80%;
    height: 100%;
  }
}
</style>
