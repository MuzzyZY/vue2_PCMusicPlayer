<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import { getProgramInfo } from '@/request/request'
export default {
  data() {
    return {}
  },

  mounted() {
    getProgramInfo().then(res => {
      console.log(res)
    })
  },

  methods: {}
}
</script>

<style lang="less" scoped>
</style>
