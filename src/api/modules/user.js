import { useRequest } from '../helper'

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
 * 新增客户
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

/**
 * api_user_patchCustomers
 * 更新客户
 */
export function patchCustomers(data, prop = {}) {
  return useRequest({
    data,
    ...prop,
    method: 'patch',
    domain: 'user',
    url: `/customer/${data.id}`,
  })
}

/**
 * api_user_deleteCustomers
 * 删除客户
 */
export function deleteCustomers(data, prop = {}) {
  return useRequest({
    data,
    ...prop,
    method: 'delete',
    domain: 'user',
    url: `/customer`,
  })
}
