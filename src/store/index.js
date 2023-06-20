import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    musicId: '',
    slideValue: 0
  },
  getters: {
  },
  mutations: {
    setMusicId(state, value) {
      state.musicId = value
    },
    updateSlideVal(state, value) {
      state.slideValue = value
    }
  },
  actions: {
  },
  modules: {
  }
})
