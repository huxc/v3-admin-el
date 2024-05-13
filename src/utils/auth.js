/**
 * 判断路由是否拥有权限
 */
function hasAuth(route, authCodes) {
  const authCode = route?.meta.permissionCode
  return authCode ? authCodes.includes(authCode) : true
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
 * 权限筛选
 */
export function splitPageAndBtn(auths) {
  const btnAuths = []
  const pageAuths = []
  for (let i = 0; i < auths.length; i++) {
    const item = auths[i]
    if (item.permissionType === 3 && item.status)
      btnAuths.push(item.permissionCode)
    else if ((item.permissionType === 1 || item.permissionType === 2) && item.status)
      pageAuths.push(item.permissionCode)
  }
  return {
    btnAuths,
    pageAuths,
  }
}
