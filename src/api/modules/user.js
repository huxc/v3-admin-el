/**
 * 180.100.200.14 登录
 */
export function login(data, prop = {}) {
  return useRequest({
    data,
    ...prop,
    method: 'post',
    domain: 'user',
    url: '/users/login',
  })
}

/**
 * 获取权限
 * api_user_getAuths
 */
export function getAuths(data, prop = {}) {
  return useRequest({
    data,
    ...prop,
    method: 'get',
    domain: 'user',
    url: '/users/authcodes',
  })
}

/**
 * api_user_getCustomers
 * 获取客户信息列表
 */
export function getCustomers(data, prop = {}) {
  return useRequest({
    data,
    ...prop,
    method: 'post',
    domain: 'user',
    url: '/customer/list',
  })
}

/**
 * api_user_postCustomers
 * 获取客户信息列表
 */
export function postCustomers(data, prop = {}) {
  return useRequest({
    data,
    ...prop,
    method: 'post',
    domain: 'user',
    url: '/customer',
  })
}
