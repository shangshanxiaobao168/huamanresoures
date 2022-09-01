import Layout from '@/layout'
export default {
  path: '/approvals',
  component: Layout,
  children: [
    {
      path: '', //默认子路由
      name: 'Approvals',
      component: () => import('@/views/approvals'),
      meta: {
        title: '审批',
        icon: 'tree-table',
      },
    },
  ],
}
