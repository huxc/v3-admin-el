import Layout from '@/layouts/index.vue'

export default {
  path: '/menu',
  name: 'menu',
  redirect: '/menu/menu1',
  component: markRaw(Layout),
  meta: {
    icon: 'data',
    title: '菜单嵌套',
  },
  children: [
    {
      path: '/menu/menu1',
      name: 'menu1',
      component: () => import('@/views/menu/menu1/index.vue'),
      meta: {
        icon: 'data',
        title: '菜单1',
      },
    },
    {
      path: '/menu/menu3',
      name: 'menu3',
      component: () => import('@/views/menu/menu3/index.vue'),
      meta: {
        icon: 'Menu',
        title: '菜单3',
      },
    },
  ],
}
