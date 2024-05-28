// mock数据

/**
 * 根据id查询.
 * api_account_login
 */
export function login(data, prop = {}) {
  return useRequest({
    data,
    ...prop,
    headers: {
      apifoxToken: 'moZglxeJmCbZ2h5jheDEN',
    },
    method: 'get',
    domain: 'account',
    url: '/account/token',
  })
}

/**
 * 获取权限
 * api_account_getAuths
 */
export function getAuths(data, prop = {}) {
  return useRequest({
    data,
    ...prop,
    method: 'get',
    domain: 'account',
    url: '/account/auths',
  })
}

/**
 * api_account_getUsers
 * 获取客户信息列表
 */
export function getUsers(data, prop = {}) {
  return useRequest({
    data,
    ...prop,
    method: 'get',
    domain: 'account',
    url: '/user/list',
  })
}

/**
 * 获取部门列表
 */
export function gettDepartments(data, prop = {}) {
  return useRequest({
    data,
    ...prop,
    method: 'get',
    domain: 'account',
    url: '/departments',
  })
}
