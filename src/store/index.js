import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '../utils/storage.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getItem('TOUTIAO_USER')
  },
  mutations: {
    setUser(state, user) {
      state.user = user
      setItem('TOUTIAO_USER', state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
