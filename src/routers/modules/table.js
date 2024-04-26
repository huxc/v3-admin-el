import Layout from '@/layouts/index.vue'

export default {
  path: '/table',
  name: 'table',
  component: Layout,
  redirect: '/table/index',
  children: [
    {
      path: '/table/index',
      name: 'table-index',
      component: () => import('@/views/cus-table/index.vue'),
      meta: {
        title: '子表格',
        keepAlive: false,
        permissionCode: '',
      },
    },
  ],
  meta: {
    title: '表格',
    sort: 0,
    icon: 'database',
    permissionCode: '',
  },
}
