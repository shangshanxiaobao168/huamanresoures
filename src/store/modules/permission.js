import router, { constantRoutes, asyncRoutes } from '@/router'
export default {
  namespaced: true,
  state: {
    routes: [], //所有路由规则，静态路由+筛选后的动态路由
    points: [], //按钮权限
  },
  mutations: {
    setRoutes(state, routes) {
      state.routes = [...constantRoutes, ...routes]
    },
    setPoints(state, points) {
      state.points = points
    },
  },
  actions: {
    async filterRoutes(context, roles) {
      const routes = asyncRoutes.filter((item) => {
        console.log(item.meta.id)
        // 如果权限标识在roles.menus，有这个权限 返回true
        // 如果权限标识不再roles.menus，没有这个权限 返回false
        return roles.menus.includes(item.meta.id)
      })
      context.commit('setRoutes', routes)
      // 动态添加路由规则
      // console.log(routes)
      router.addRoutes([
        ...routes,
        { path: '*', redirect: '/404', hidden: true },
      ])
    },
    setPointsAction(context,points){
      context.commit('setPoints',points)
    }
  },
}
