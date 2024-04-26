/**
 * @fileDescription: 用户域
 * @title: 用户
 * @date: 2024-01-26 14:57:59
 * @host: 172.16.164.172:9302
 * @basePath: /
 * @description: Account Controller
 * @version: 1.0.0
 */

import { request } from '@/utils/request'

export default {

  /**
* @description 根据id查询.
* @param {String} code - code.
* @param {Number} id - 用户id.
*/
  getUser(data, prop = {}) {
    return request({
      data,
      ...prop,
      method: 'get',
      domain: 'account',
      url: '/user',
    })
  },

  /**
* @description 新增.
* @param {Object} accountDTO - accountDTO.
*/
  postUser(data, prop = {}) {
    return request({
      data,
      ...prop,
      method: 'post',
      domain: 'account',
      url: '/user',
    })
  },

  /**
* @description 修改.
* @param {Object} accountDTO - accountDTO.
*/
  putUser(data, prop = {}) {
    return request({
      data,
      ...prop,
      method: 'put',
      domain: 'account',
      url: '/user',
    })
  },

  /**
* @description 修改启用状态.
* @param {String} code - code.
* @param {Number} id - 用户id.
* @param {Number} status - 启用状态 0启用 1停用.
*/
  postUserChange(data, prop = {}) {
    return request({
      data,
      ...prop,
      method: 'post',
      domain: 'account',
      url: '/user/change',
    })
  },

  /**
* @description 删除.
* @param {Object} accountIdsDTO - accountIdsDTO.
*/
  putUserIds(data, prop = {}) {
    return request({
      data,
      ...prop,
      method: 'put',
      domain: 'account',
      url: '/user/ids',
    })
  },

  /**
* @description 分页查询.
* @param {Number} cityId - 城市Id.
* @param {String} code - code.
* @param {String} company - 所在公司.
* @param {Number} pageNum - 页码.
* @param {Number} pageSize - 页大小.
* @param {String} phone - 手机号.
* @param {Number} provinceId - 省份Id.
* @param {Number} roleId - 角色id.
* @param {Number} status - 账户状态 0启用 1禁用.
* @param {String} userName - 用户名.
*/
  getUserPage(data, prop = {}) {
    return request({
      data,
      ...prop,
      method: 'get',
      domain: 'account',
      url: '/user/page',
    })
  },

  /**
* @description 用户名模糊查询.
* @param {Number} pageNum - 页码.
* @param {Number} pageSize - 页大小.
*/
  getUserSearch(data, prop = {}) {
    return request({
      data,
      ...prop,
      method: 'get',
      domain: 'account',
      url: '/user/search',
    })
  },
}
