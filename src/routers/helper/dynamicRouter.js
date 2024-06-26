import { keys, sortBy } from 'lodash-es'

/**
 * 根据meta.sort进行路由排序
 */
function importRouters(routers) {
  const routes = keys(routers).map(key => routers[key].default)
  return sortBy(routes, 'meta.sort')
}
// 所有异步路由
export const dynamicRouter = importRouters(import.meta.glob('../modules/*.js', { eager: true }))
// 筛选需要缓存的路由
export const cacheRouter = []

/**
 * 获取需要缓存的路由页面
 */
function filterKeepAlive(_route, _cache) {
  _route.forEach((item) => {
    item.meta?.keepAlive && item.name && _cache.push(item.name)
    item.children && item.children.length !== 0 && filterKeepAlive(item.children, _cache)
  })
}
filterKeepAlive(dynamicRouter, cacheRouter)
