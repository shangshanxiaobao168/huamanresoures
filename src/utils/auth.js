import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
// 第一个参数：名字
// 第二个参数：当前时间戳
export function setTokenTime() {
  Cookies.set('tokenTime', Date.now())
}
// 存储在本地的cookie中的
export function getTokenTime() {
  return Cookies.get('tokenTime')
}
