import router, { asyncRoutes } from '@/router/index'
import store from '@/store'
// 路由（全局）前置守卫
// 会在所有路由进入之前触发
// to：去哪里的路由信息
// from：来自于哪个路由信息
// next：是否进入
// 准备白名单
const whiteList = ['/login', '/404']
router.beforeEach(async (to, from, next) => {
  const token = store.state.user.token
  if (token) {
    if (!store.state.user.userInfo.userId) {
      // 获取用户信息,store.dispatch返回值是promise
      const { roles } = await store.dispatch('user/getUserInfo')
      // console.log(roles.menus) //后端返回来的权限菜单
      // console.log(asyncRoutes) //准备好的所有动态路由
      await store.dispatch('permission/filterRoutes', roles)
      await store.dispatch('permission/setPointsAction', roles.points)
      next(to.path)
    }
    // console.log('发送请求获取数据')
    // 1.登录
    // 是否进入首页
    if (to.path === '/login') {
      //1.1 是跳到首页
      next('/')
    } else {
      //1.2 不是首页，直接进入
      next()
    }
  } else {
    // 2.未登录，检查访问的是否在白名单（未登录也能访问的页面）
    const isCludes = whiteList.includes(to.path)
    if (isCludes) {
      // 2.1在白名单放行
      next()
    } else {
      // 2.2不在白名单（不能登录不能访问）跳到登录页
      next('/login')
    }
  }
})
