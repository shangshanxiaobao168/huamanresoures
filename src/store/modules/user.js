import { getUserDetail, getUserInfoApi, login } from '@/api/user.js'
import { setTokenTime } from '@/utils/auth'
import { resetRouter } from '@/router'
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
      // 通过userBaseInfo处理动态路由
      // actions内部可以通过return将数据传递出去，类似then中的return
      return userBaseInfo
    },
    // 登出功能
    logout(context) {
      context.commit('setToken', '')
      context.commit('setUserInfo', {})
      resetRouter()
      context.commit('permission/setRoutes', [], { root: true })
    },
  },
}
