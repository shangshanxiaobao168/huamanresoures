// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import axios from 'axios'
// 尽管element已经完全引入，但那是在vue全局上注册，可以在vue文件上使用，而不是在js文件上，所以此处需要单独引入
import { Message } from 'element-ui'
import store from '@/store'
import { getTokenTime } from '@/utils/auth'
import router from '@/router'
function isTimeOut() {
  const currentTime = Date.now()
  const tokenTime = getTokenTime()
  const timeout = 2 * 60 * 60 * 1000
  return currentTime - tokenTime > timeout
}
const service = axios.create({
  // 基准地址
  baseURL: process.env.VUE_APP_BASE_API,
  //超时时间
  timeout: 5000,
}) // 创建一个axios的实例
service.interceptors.request.use(async (config) => {
  // 当前请求的配置
  // console.log(config);
  if (store.state.user.token) {
    if (isTimeOut()) {
      await store.dispatch('user/logout')
      router.push('/login')
      return Promise.reject(new Error('登录过期'))
    } else {
      config.headers.Authorization = 'Bearer ' + store.state.user.token
    }
  }
  return config
}) // 请求拦截器
service.interceptors.response.use(
  (res) => {
    console.log(res)
    // 响应成功的两种情况,根据data中的success判断
    const { success, data, message } = res.data
    if (success) {
      return data
    }
    Message.error(message)
    // 这个message就是res.data中的错误信息，用户名错误或者是电话错误
    // 如果success是false，也需要进到失败的promise，因为此时只是请求成功，逻辑错误
    // 需要自己手动制造错误，让promise状态改为失败状态
    return Promise.reject(new Error(message))
  },
  // 响应错误
  async function (error) {
    // 对响应错误做点什么
    // console.dir(error)
    // 401代表token过期
    if (error?.response?.status === 401) {
      Message.error('登录过期')
      await store.dispatch('user/logout')
      router.push('/login')
    } else {
      Message.error(error.message)
    }
    return Promise.reject(error)
  },
) // 响应拦截器
export default service // 导出axios实例
