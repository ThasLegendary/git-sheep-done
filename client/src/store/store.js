import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const initialState = {
  token: null,
  user: null,
  isUserLoggedIn: false
}

export default new Vuex.Store({
  strict: true,
  plugins: [
    createPersistedState()
  ],
  state: initialState,
  mutations: {
    setToken (state, token) {
      state.token = token
      if (token) {
        state.isUserLoggedIn = true
      } else {
        state.isUserLoggedIn = false
      }
    },
    setUser (state, user) {
      state.user = user
    },
    clear (state) {
      for (let prop in state) {
        state[prop] = initialState[prop]
      }
    }
  },
  actions: {
    setToken ({commit}, token) {
      commit('setToken', token)
    },
    setUser ({commit}, user) {
      commit('setUser', user)
    },
    clear({commit}) {
      commit('clear')
    }
  }
})
