import { getUserDetail, getUserInfoApi, login } from '@/api/user.js'
import { setTokenTime } from '@/utils/auth'
export default {
  namespaced: true,
  state: {
    token: '',
    userInfo: {},
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload
    },
    setUserInfo(state, payload) {
      state.userInfo = payload
    },
  },
  actions: {
    // 登录获取token
    async getToken(context, payload) {
      const res = await login(payload)
      // console.log(res);
      // 发送请求得来的
      context.commit('setToken', res)
      setTokenTime()
    },
    // 登录获取用户信息
    async getUserInfo(context) {
      const userBaseInfo = await getUserInfoApi()
      const userInfo = await getUserDetail(userBaseInfo.userId)
      context.commit('setUserInfo', { ...userBaseInfo, ...userInfo })
      // console.log(userBaseInfo)
      // console.log(userInfo)
      // setTimeout(() => {
      //   const res = { name: '周杰伦' }
      //   context.commit('setUserInfo', res)
      // }, 1000)
    },
    // 登出功能
    logout(context) {
      context.commit('setToken', '')
      context.commit('setUserInfo', {})
    },
  },
}
