<template>
  <div class="userSongListBox">
    <div v-for="list in userSongsList" :key="list.id" @click="seeDetail(list.id)" class="list">
      {{list.name}}
    </div>
  </div>
</template>

<script>
import { getUserSongsList } from '@/request/request'
import { mapState } from 'vuex'
import { Loading } from 'element-ui'
export default {
  data() {
    return {
      userId: null,
      userSongsList: null
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  mounted() {
    this.userId = this.userInfo.account.id
    if (this.userId) {
      getUserSongsList(this.userId).then(res => {
        let loadingInstance = Loading.service({ lock: true, fullscreen: true })
        if (res.code === 200) {
          this.userSongsList = res.playlist
        }
        loadingInstance.close()
        clearTimeout(this.timer)
      })
    }
  },

  methods: {
    seeDetail(id) {
      this.$router.push({
        path: '/listdetail',
        query: { id }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.userSongListBox {
  margin-top: 10px;
  padding: 0 13px;
  width: 100%;
}
.list {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  width: 100%;
  height: 30px;
}
</style>
