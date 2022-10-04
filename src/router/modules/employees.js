import Layout from '@/layout'
export default {
  path: '/employees',
  component: Layout,
  children: [
    {
      path: '', //默认子路由
      name: 'Employees',
      component: () => import('@/views/employees'),
      // 可以配置路由的额外信息
      meta: {
        title: '员工',
        icon: 'people',
      },
    },
    {
      path: 'detail/:id',
      component: () => import('@/views/employees/detail'),
      hidden: true,
    },
  ],
}
