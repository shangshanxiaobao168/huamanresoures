import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css
import '@/styles/test.scss'

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
import * as directives from '@/directives'
// mock假数据
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}
// 注册element ui
// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)
// dev：development 开发
// test：测试
// production：生产（打包上线环境）
// 将上线的提示关闭掉
Vue.config.productionTip = false
for (let key in directives) {
  Vue.directive(key, directives[key])
}
new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App),
})
