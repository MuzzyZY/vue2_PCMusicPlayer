import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    musicId: '',
    playList: [],
    slideValue: 0,
    historyPlay: []
  },
  getters: {
  },
  mutations: {
    setMusicId(state, value) {
      state.musicId = value
    },
    updateSlideVal(state, value) {
      state.slideValue = value
    },
    updatePlayList(state, value) {
      state.playList = (value)
    },
    updateHistoryList(state, value) {
      state.historyPlay.push(value)
      console.log(state.historyPlay)
      state.historyPlay.unshift(value)
    }
  },
  actions: {
  },
  modules: {
  }
})
