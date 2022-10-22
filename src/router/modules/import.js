import Layout from '@/layout'
export default {
  path: '/import',
  component: Layout,
  meta: {
    id: 'user12345',
  },
  hidden: true,
  children: [
    {
      path: '', //默认子路由
      name: 'import',
      component: () => import('@/views/import'),
      //   meta: {
      //     title: '审批',
      //     icon: 'tree-table',
      //   },
    },
  ],
}
