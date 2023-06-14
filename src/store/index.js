import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    musicId: ''
  },
  getters: {
  },
  mutations: {
    setMusicId(state, value) {
      state.musicId = value
    }
  },
  actions: {
  },
  modules: {
  }
})
