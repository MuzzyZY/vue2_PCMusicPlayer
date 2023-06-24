import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    musicId: '',
    playList: [],
    slideValue: 0,
    currentTab: '个性推荐',
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
    updateCurrentTab(state, value) {
      state.currentTab = value
    },
    updatePlayList(state, value) {
      state.playList = (value)
    },
    updateHistoryList(state, value) {
      state.historyPlay.unshift(value)
      console.log(state.historyPlay)
    }
  },
  actions: {
  },
  modules: {
  }
})
