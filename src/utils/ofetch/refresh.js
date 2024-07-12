/* eslint-disable jsdoc/require-jsdoc */
import { ofetch } from 'ofetch'
import { useUserStore } from '@/store/modules/user'

// 当前是否在请求刷新 Token
let isRefreshing = false

// 将在请求刷新 Token 中的请求暂存起来，等刷新 Token 后再重新请求
let requestQueue = []

// 执行暂存起来的请求
function executeQueue(error) {
  requestQueue.forEach((promise) => {
    if (error)
      promise.reject(error)

    else
      promise.resolve()
  })

  requestQueue = []
}

// 刷新 Token 请求处理，参数为刷新成功后的回调函数
function refreshToken() {
  // 如果当前是在请求刷新 Token 中，则将期间的请求暂存起来
  if (isRefreshing) {
    return new Promise((resolve, reject) => {
      requestQueue.push({ resolve, reject })
    })
  }

  isRefreshing = true

  return new Promise((resolve, reject) => {
    const userStore = useUserStore()
    // 刷新token
    ofetch('/users/refresh', {
      method: 'post',
      baseURL: import.meta.env.VITE_API_BASE_URL,
      body: {
        refreshToken: userStore?.state?.refresh_token,
      },
    })
      .then(res => (res.code === 200 ? res : Promise.reject(res)))
      .then((res) => {
        userStore.refToken(res.data)
        resolve()
        executeQueue(null)
      })
      .catch((err) => {
        reject(err)
        executeQueue(err || new Error('Refresh token error'))
      })
      .finally(() => {
        isRefreshing = false
      })
  })
}

export { refreshToken }
