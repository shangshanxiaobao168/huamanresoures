import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import createVuexpersisted from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
  },
  getters,
  plugins: [
    createVuexpersisted({
      reducer(state) {
        return {
          user: {
            token: state.user.token,
          },
        }
      },
    }),
  ],
})

export default store
