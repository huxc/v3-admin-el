import { HOME_URL, LOGIN_URL } from '@/config/global'
// 静态路由
export const staticRouter = [
  {
    path: '/',
    redirect: HOME_URL,
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home/index.vue'),
  },
  {
    path: LOGIN_URL,
    name: 'login',
    meta: {
      title: '系统登录',
    },
    props: {
      type: 1,
    },
    component: () => import('@/views/login/index.vue'),
  },
]

// 错误页面路由
export const errorRouter = [
  {
    // 页面重定向空白页
    path: '/redirect',
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index.vue'),
      },
    ],
  },
  {
    path: '/404',
    name: '404',
    meta: {
      title: '未找到页面',
    },
    component: () => import ('@/views/error/404.vue'),
  },
]
