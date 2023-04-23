import { createStore } from 'vuex'

export default createStore({
  state: {
    token: null,
    pagination: null,
    candidates: [],
    editCandidate: {},
    deleteCandidate: null
  },
  getters: {
    getCandidates (state) { return state.candidates },
    getCandidate (state) { return state.editCandidate },
    getPagination (state) { return state.pagination },
    getToken (state) { return state.token },
    getDeleteId (state) { return state.deleteCandidate },
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
    },
    setCandidate (state, payload) {
      state.editCandidate = payload
    },
    setDeleteCandidate (state, id) {
      state.deleteCandidate = id
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
    },
    editCandidate (context, payload) {
      context.commit('setCandidate', payload)
    },
    setDeleteCandidate (context, id) {
      context.commit('setDeleteCandidate', id)
    }
  },
})
