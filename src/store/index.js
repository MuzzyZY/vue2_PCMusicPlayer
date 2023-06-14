import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    searchList: null,
    historySearch: []
  },
  getters: {
  },
  mutations: {
    updateSeachList(state, value) {
      state.searchList = value
    },
    upadteHistorySearch(state, value) {
      state.historySearch.push(value)
    }
  },
  actions: {
  },
  modules: {
  }
})
