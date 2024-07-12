/* eslint-disable jsdoc/require-jsdoc */
import { ofetch } from 'ofetch'
import { isObjEmpty } from '../../utils'
import router from '../../routers'
import { useUserStore } from '../../store/modules/user'
import {
  closeLoading,
  generateRequestKey,
  handleErrorStatus,
  ongoingRequests,
  openLoading,
  passStatus,
  refreshToken,
} from './base'

// 创建 ofetch 实例
const fetchInstance = ofetch.create({
  // 请求拦截器
  async onRequest({ options }) {
    const userStore = useUserStore()

    // 取消重复请求
    const controller = new AbortController()
    options.signal = controller.signal
    const requestKey = generateRequestKey(options)
    ongoingRequests.has(requestKey)
      ? controller.cancel()
      : ongoingRequests.set(requestKey, `${Date.now()}-${Math.random()}`)

    const { method, data } = options

    options.ignoreResponseError = true

    // 配置接口域名
    options.baseURL ??= import.meta.env.VITE_IS_MICRO_SERVICE
      ? import.meta.env.VITE_API_DOMAIN_JSON[options.domain]
      : import.meta.env.VITE_API_BASE_URL

    options.headers = {
      ...options.headers,
      Authorization: userStore?.getToken,
    }

    // 添加请求参数
    if (!isObjEmpty(data)) {
      const key = method.toUpperCase() === 'GET' ? 'query' : 'body'
      options[key] = data
    }
    // 错误弹窗默认true
    options.isErrorMsg ??= true

    // 是否显示loading
    options.isLoading ??= import.meta.env.VITE_IS_LOADING
    if (options.isLoading)
      openLoading()
  },

  // 响应拦截器
  async onResponse({ options, response }) {
    // 请求完成后，从 ongoingRequests 中删除
    const requestKey = generateRequestKey(options)
    ongoingRequests.delete(requestKey)

    // 关闭loading
    if (ongoingRequests.size === 0 && options?.isLoading)
      closeLoading()

    const res = response._data
    const { status } = response
    if ((status >= 200 && status < 300) || passStatus.includes(status)) {
    // 错误提醒
      if (!res.success && options?.isErrorMsg) {
        ElMessage({
          showClose: true,
          message: res?.msg || '错误',
          type: 'error',
          duration: 3 * 1000,
        })
      }

      // 无感刷新token
      if (response.status === import.meta.env.VITE_ACCESS_TOKEN_EXP && import.meta.env.VITE_IS_REFRESH_TOKEN)
        response._data = await refreshToken().then(() => fetchInstance(options.url, options))

      // 跳转登录页面
      if (response.status === '此处替换成业务接口的返回code') {
        const userStore = useUserStore()
        userStore.ref_token = true
        userStore.clearState()
        router.push({ path: '/login' })
      }
    }
    else {
      // 错误状态码处理
      handleErrorStatus(status)
    }
  },
})

export const useRequest = options => fetchInstance(options.url, options)
