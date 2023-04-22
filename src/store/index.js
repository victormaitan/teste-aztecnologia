import { createStore } from 'vuex'

export default createStore({
  state: {
    token: null,
    pagination: null,
    candidates: []
  },
  getters: {
    getCandidates (state) { return state.candidates },
    getPagination (state) { return state.pagination },
    getToken (state) { return state.token },
    isAuthenticated (state) { return !!state.token },
  },
  mutations: {
    setToken (state, payload) {
      state.token = payload
      window.sessionStorage.setItem('token', JSON.stringify(payload))
    },
    removeToken (state) {
      state.token = null
      window.sessionStorage.clear()
    },
    setCandidates (state, payload) {
      state.candidates = payload
    },
    setPagination (state, payload) {
      state.pagination = payload
    }
  },
  actions: {
    setToken (context, payload) {
      context.commit('setToken', payload)
    },
    removeToken (context) {
      context.commit('removeToken')
    },
    setCandidates (context, payload) {
      context.commit('setCandidates', payload)
    },
    setPagination (context, payload) {
      context.commit('setPagination', payload)
    }
  },
})
