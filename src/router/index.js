import Vue from 'vue'
import Router from 'vue-router'
import approvals from '@/router/modules/approvals'
import departments from '@/router/modules/departments'
import employees from '@/router/modules/employees'
import permission from '@/router/modules/permission'
import attendances from '@/router/modules/attendances'
import salarys from '@/router/modules/salarys'
import setting from '@/router/modules/setting'
import social from '@/router/modules/social'
import importEmployess from '@/router/modules/import'
Vue.use(Router)

/* Layout */
import Layout from '@/layout'

// 静态路由，每个用户都有权访问的，不需要鉴权
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true,
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '首页', icon: 'dashboard' },
      },
    ],
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true },
]
// 准备好所有项目的动态路由，基于后端返回的用户权限对动态路由进行筛选
export const asyncRoutes = [
  approvals,
  departments,
  employees,
  permission,
  attendances,
  salarys,
  setting,
  social,
  importEmployess,
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: [...constantRoutes],
  })
// vueRouter实例
const router = createRouter()
// 路由（全局）前置守卫
// 会在所有路由进入之前触发

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

