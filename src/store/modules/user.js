import { login } from '@/api/user.js'

export default {
  namespaced: true,
  state: {
    token: '',
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload
    },
  },
  actions: {
    async getToken(context, payload) {
      const res = await login(payload)
      // console.log(res);
      // 发送请求得来的
      context.commit('setToken', res)
    },
  },
}
