import Layout from '@/layouts/index.vue'
import { routeAuths } from '@/enums/auth.js'

export default {
  path: '/table',
  name: 'table',
  component: markRaw(Layout),
  redirect: '/table/t2',
  meta: {
    title: '表格',
    sort: 0,
    icon: 'data',
    permissionCode: routeAuths.table,
  },
  children: [
    {
      path: '/table/t1',
      name: 'table-t1',
      component: () => import('@/views/table/t1/index.vue'),
      meta: {
        title: '列表',
        keepAlive: false,
        icon: 'data',
        permissionCode: '',
      },
    },
    {
        path: '/table/t2',
        name: 'table-t2',
        component: () => import('@/views/table/t2/index.vue'),
        meta: {
          title: '查询列表',
          keepAlive: false,
          icon: 'data',
          permissionCode: '',
        },
      },
      {
        path: '/table/t3',
        name: 'table-t3',
        component: () => import('@/views/table/t3/index.vue'),
        meta: {
          title: '可折叠查询',
          keepAlive: false,
          icon: 'data',
          permissionCode: '',
        },
      },
      {
        path: '/table/t4',
        name: 'table-t4',
        component: () => import('@/views/table/t4/index.vue'),
        meta: {
          title: '默认展开',
          keepAlive: false,
          icon: 'data',
          permissionCode: '',
        },
      },
  ],
}
