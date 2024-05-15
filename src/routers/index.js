import { createRouter, createWebHashHistory } from 'vue-router'
import { useUserStore } from '@/store/modules/user'
import NProgress from '@/config/nprogress'
import { LOGIN_URL } from '@/config/global'
import { errorRouter, staticRouter } from '@/routers/helper/staticRouter'

const route = {
  history: createWebHashHistory(),
  routes: [...staticRouter, ...errorRouter],
  strict: false,
  /**
   *切换页面，滚动到最顶部
   */
  scrollBehavior: () => ({ left: 0, top: 0 }),
}

const router = createRouter(route)

/**
 *   路由拦截 beforeEach
 */
router.beforeEach(async (to, from, next) => {
  NProgress.start()

  const userStore = useUserStore()

  const hasToken = userStore.state.access_token

  if (to.path.toLocaleLowerCase() === LOGIN_URL) {
    if (hasToken)
      return next(from.fullPath)
    resetRouter()
    return next()
  }

  if (!hasToken)
    return next({ path: LOGIN_URL, replace: true })

  // 判断用户是否获取了权限数据
  const hasRoutes = userStore.asyncRoutes
  if (!hasRoutes) {
    const accessRoutes = await userStore.generateRoutes()

    accessRoutes.forEach((route) => {
      router.addRoute(route)
    })

    next({ ...to, replace: true })
  }

  // 正常访问页面
  next()
})

/**
 *   路由跳转错误
 */
router.onError((error) => {
  NProgress.done()
  console.warn('路由错误', error.message)
})

/**
 *   路由跳转结束
 */
router.afterEach(() => {
  NProgress.done()
})

/**
 *重置路由
 */
export function resetRouter() {
  const newRouter = createRouter(route)
  // 重置matcher以确保所有的路由都被重新定义
  router.matcher = newRouter.matcher
}

export default router
