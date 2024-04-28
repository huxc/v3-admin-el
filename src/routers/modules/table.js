import Layout from '@/layouts/index.vue'

export default {
  path: '/table',
  name: 'table',
  component: Layout,
  redirect: '/table/index',
  meta: {
    title: '表格',
    sort: 0,
    icon: 'data',
    permissionCode: '',
  },
  children: [
    {
      path: '/table/index',
      name: 'table-index',
      component: () => import('@/views/table/index.vue'),
      meta: {
        title: '子表格',
        keepAlive: false,
        icon: 'data',
        permissionCode: '',
      },
    },
  ],
}
