import Layout from '@/layout'
export default {
  path: '/social_securitys',
  component: Layout,
  meta: {
    id: 'social', //用来和后端权限做约定的
  },
  children: [
    {
      path: '',
      name: 'Social',
      component: () => import('@/views/social'),
      meta: {
        title: '社保',
        icon: 'table',
      },
    },
  ],
}
