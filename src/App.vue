<template>
  <div id="app">
    <nav>
      <searchBar></searchBar>
    </nav>
    <article>
      <aside>
        <router-link to="/discover">发现音乐</router-link>
        <router-link to="/myinfo">myInfo</router-link>
      </aside>
      <section>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </section>
    </article>
    <footer>
      <musicPlayer></musicPlayer>
    </footer>
  </div>
</template>

<script>
import musicPlayer from './components/musicPlayer.vue'
import searchBar from './components/searchBar.vue'
export default {
  data() {
    return {}
  },
  components: {
    searchBar,
    musicPlayer
  }
}
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
ul,
li {
  list-style: none;
}
a {
  text-decoration: none;
  color: #2c3e50;
  font-size: 18px;
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
  height: 15%;
}
article {
  display: flex;
  width: 100%;
  height: 75%;
  aside {
    width: 15%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-right: 1px solid rgb(224, 224, 224);
  }
  section {
    padding: 10px 20px;
    width: 85%;
    height: 100%;
    text-align: left;
    overflow: auto;
  }
}
</style>
