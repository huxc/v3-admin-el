import axios from 'axios'
import appStore from '@/store'

// 当token失效时，把所有请求放入此重试队列，每一项将是一个待执行的函数形式
const _requests = []

// 是否有正在刷新tokne的标记
let _isRefTokening = false

function refreshToken(response, service) {
  const config = response.config
  if (!_isRefTokening) {
    _isRefTokening = true
    return axios
      .get('/sys/refreshToken', {
        headers: {
          'X-Token': '此处获取token方法',
        },
      })
      .then((res) => {
        appStore.userStore.refToken(res.data)
        return service(config)
      })
      .catch((res) => {
        console.error('refreshtoken error =>', res)
        window.location.href = '/'
      })
      .finally(() => {
        _isRefTokening = false
      })
  }
  else {
    // 正在刷新token，将返回一个未执行resolve的promise
    return new Promise((resolve) => {
      // 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
      _requests.push((token) => {
        config.baseURL = ''
        config.headers['X-Token'] = token
        resolve(service(config))
      })
    })
  }
}

export default refreshToken
