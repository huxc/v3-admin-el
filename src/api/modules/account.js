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
 * 根据id查询.
 * @param {string} data
 * @param {string} data.code - code.
 * @param {number} data.id - 用户id.
 */
export function getUser(data, prop = {}) {
  return useRequest({
    data,
    ...prop,
    method: 'get',
    domain: 'account',
    url: '/user',
  })
}

/**
 *   新增.
 * @param {object} accountDTO - accountDTO.
 */
export function postUser(data, prop = {}) {
  return useRequest({
    data,
    ...prop,
    method: 'post',
    domain: 'account',
    url: '/user',
  })
}

/**
 *   修改.
 * @param {object} accountDTO - accountDTO.
 */
export function putUser(data, prop = {}) {
  return useRequest({
    data,
    ...prop,
    method: 'put',
    domain: 'account',
    url: '/user',
  })
}

/**
 *   删除.
 * @param {object} accountIdsDTO - accountIdsDTO.
 */
export function putUserIds(data, prop = {}) {
  return useRequest({
    data,
    ...prop,
    method: 'put',
    domain: 'account',
    url: '/user/ids',
  })
}

/**
 *   分页查询.
 * @param {number} cityId - 城市Id.
 * @param {string} code - code.
 * @param {string} company - 所在公司.
 * @param {number} pageNum - 页码.
 * @param {number} pageSize - 页大小.
 * @param {string} phone - 手机号.
 * @param {number} provinceId - 省份Id.
 * @param {number} roleId - 角色id.
 * @param {number} status - 账户状态 0启用 1禁用.
 * @param {string} userName - 用户名.
 */
export function getUserPage(data, prop = {}) {
  return useRequest({
    data,
    ...prop,
    method: 'get',
    domain: 'account',
    url: '/accounts',
  })
}

/**
 *   用户名模糊查询.
 * @param {number} pageNum - 页码.
 * @param {number} pageSize - 页大小.
 */
export function getUserSearch(data, prop = {}) {
  return useRequest({
    data,
    ...prop,
    method: 'get',
    domain: 'account',
    url: '/user/search',
  })
}

/**
 *gettDepartments
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
