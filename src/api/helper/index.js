/* eslint-disable jsdoc/check-alignment */
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { has } from 'lodash-es'
import { exportFile, serviceError } from './response'
import { mergeConfig } from './merge-config'
import router from '@/routers'
import { TOKEN_STATE } from '@/config/global'
import { closeLoading, openLoading } from '@/utils/el-loading'
// import { useUserStore } from '@/store/modules/user'

// token是否过期
let isRefreshing = false

// 保存需要重新发起请求的队列
const retryRequests = []

/**
 * 配置请求方法
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
 *   创建请求实例
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

      const { data: res, config, success, msg } = response.data

      if (config?.responseType === 'blob') {
        exportFile(response)
        return response
      }

      if (!success) {
        // token失效跳转到登录页面
        if (TOKEN_STATE.includes(res.code)) {
          if (!isRefreshing) {
            isRefreshing = true

            /** 此处为调转到登录逻辑 */
            router.push({ path: '/login' })

            if (response.config.isMsg) {
              ElMessage({
                showClose: true,
                message: '登录已失效，请重新登录。',
                type: 'error',
                duration: 3 * 1000,
              })
            }
            /**
             * 此处为刷新token逻辑
            return api_刷新token的方法
              .then((res) => {
                const userStore = useUserStore()
                // 赋值刷新后的Token
                userStore.refToken(res.data)
                //   遍历执行需要重新发起请求的队列
                retryRequests.forEach(cb => cb(res))
                //   清空队列
                retryRequests = []
                return createRequest(service)
              })
              .catch(() => {
                retryRequests = []
                res.msg = '登录已失效，请重新登录。'
                router.push({ path: '/login' })
              })
              .finally(() => {
                // 请求完成后重置flag
                isRefreshing = false
              })

             */
            /**
             * 延迟
             */
            setTimeout(() => {
              isRefreshing = false
            }, 3000)
          }
          else {
            // 正在刷新token，返回一个未执行resolve的promise
            // 把promise 的resolve 保存到队列的回调里面，等待刷新Token后调用
            // 原调用者会处于等待状态直到 队列重新发起请求，再把响应返回，以达到用户无感知的目的（无痛刷新）
            return new Promise((resolve) => {
              // 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
              retryRequests.push(() => {
                resolve(createRequest(service))
              })
            })
          }
        }
        else {
          if (response.config.isMsg) {
            ElMessage({
              showClose: true,
              message: msg || '错误',
              type: 'error',
              duration: 3 * 1000,
            })
          }
          return Promise.reject(res)
        }
      }
      else {
        if (response.config.isLoading)
          closeLoading()
        return response.data
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
