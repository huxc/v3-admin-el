/**
 * @fileDescription: 用户域
 * @title: 用户
 * @date: 2024-01-26 14:57:59
 * @host: 172.16.164.172:9302
 * @basePath: /
 * @description: Account Controller
 * @version: 1.0.0
 */

import { request } from '../helper/index'

export default {
  /**
   * @description 根据id查询.
   * @param {string} code - code.
   * @param {number} id - 用户id.
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
   * @param {object} accountDTO - accountDTO.
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
   * @param {object} accountDTO - accountDTO.
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
   * @param {string} code - code.
   * @param {number} id - 用户id.
   * @param {number} status - 启用状态 0启用 1停用.
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
   * @param {object} accountIdsDTO - accountIdsDTO.
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
   * @param {number} pageNum - 页码.
   * @param {number} pageSize - 页大小.
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
