<template>
  <div class="searchList">
    <header>
      <h2>搜索：{{list.searchKey}}</h2>
    </header>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      list: []
    }
  },
  computed: {
    ...mapState(['searchList'])
  },
  created() {
    this.list = this.searchList
    console.log(this.list)
  }
}
</script>

<style lang='less' scoped>
.searchList {
  padding: 10px 20px;
}
header {
  h2 {
    text-align: left;
  }
}
</style>
