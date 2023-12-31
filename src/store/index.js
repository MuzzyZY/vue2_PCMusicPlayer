import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    musicId: '',
    playList: [],
    slideValue: 0,
    historyPlay: [],
    userInfo: null,
    isLogin: false,
    radio: null,
    play: false
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
    },
    updateUserInfo(state, value) {
      state.userInfo = value
    },
    updateIsLogin(state, value) {
      state.isLogin = value
    },
    updateRadio(state, value) {
      state.radio = value
      state.play = true
    },
    pauseRadio(state) {
      state.radio.pause()
      state.play = false
    }
  },
  actions: {
  },
  modules: {
  }
})
