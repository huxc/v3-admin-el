import axios from 'axios'
import { ElMessage } from 'element-plus'
import { has } from 'lodash-es'
import { exportFile, serviceError } from './response'
import { mergeConfig } from './merge-config'
import router from '@/routers'
import { TOKEN_STATE } from '@/config/global'
import { closeLoading, openLoading } from '@/utils/el-loading'

// token是否过期
let isRefreshing = false

/**
 * @description 配置请求方法
 * @param {object} service axios 实例
 */
function createRequest(service) {
  // isLoding：判断是否显示loading状态
  return ({ isLoading = true, ...config }) => {
    // 存在分页查询的时候不弹出loding
    const isPaging = has(config, 'data.pageNum') && has(config, 'data.pageSize')
    if (isLoading && !isPaging) {
      openLoading()
      config.isLoading = true
    }
    const option = mergeConfig(config)
    return service(option)
  }
}

/**
 * @description 创建请求实例
 */
function createService() {
  // 创建一个 axios 实例
  const service = axios.create()

  // 请求拦截
  service.interceptors.request.use(
    config => config,
    (error) => {
      // 发送失败
      console.error(error)
      return Promise.reject(error)
    },
  )
  // 响应拦截
  service.interceptors.response.use(
    (response) => {
      // 判断是否存在loading状态 存在则关闭
      if (response.config.isLoading)
        closeLoading()

      const { data: res, config } = response.data

      if (config?.responseType === 'blob') {
        exportFile(response)
        return response
      }

      if (!res.success) {
        // token失效跳转到登录页面
        if (TOKEN_STATE.includes(res.code)) {
          if (!isRefreshing) {
            isRefreshing = true
            res.msg = '登录已失效，请重新登录。'
            router.push({ path: '/login' })

            if (response.config.isMsg) {
              ElMessage({
                showClose: true,
                message: res.msg || '错误',
                type: 'error',
                duration: 3 * 1000,
              })
            }
            setTimeout(() => {
              isRefreshing = false
            }, 300)
          }
        }

        return Promise.reject(res)
      }
      else {
        if (response.config.isLoading)
          closeLoading()

        return res
      }
    },
    (error) => {
      // 判断是否存在loading状态 存在则关闭
      closeLoading()

      // 处理提示错误
      serviceError(error)

      return Promise.reject(error)
    },
  )
  return service
}
export const service = createService()
export const useRequest = createRequest(service)
