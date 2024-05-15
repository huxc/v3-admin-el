/**
 * 判断路由是否拥有权限
 */
function hasAuth(route, authCodes) {
  const authCode = route?.meta.permissionCode
  return authCode ? authCodes.has(authCode) : true
}

/**
 * 递归根据权限数组过滤动态路由
 */
export function filterAsyncRoutes(asyncRotuers, authCodes) {
  const filterRoutes = []
  asyncRotuers.forEach((route) => {
    const _route = { ...route }
    if (hasAuth(_route, authCodes)) {
      if (_route.children)
        _route.children = filterAsyncRoutes(_route.children, authCodes)

      filterRoutes.push(_route)
    }
  })
  return filterRoutes
}

/**
 * 筛选出权限码，根据接口区分菜单权限和按钮权限
 */
export function splitPageAndBtn(auths) {
  const btnAuths = new Set()
  const pageAuths = new Set()
  for (let i = 0; i < auths.length; i++) {
    const { permissionType, permissionCode } = auths[i]
    permissionType === 1
      ? pageAuths.add(permissionCode)
      : btnAuths.add(permissionCode)
  }
  return {
    btnAuths,
    pageAuths,
  }
}
