import qs from 'qs'
import { invoke, merge } from 'lodash-es'
import { isObjEmpty, typeOf } from '../../utils'
import { useUserStore } from '../../store/modules/user'
import { domain_list } from '../../api/config/domainConfig'

export function mergeConfig({ domain = 'user', ...config }) {
  const userStore = useUserStore()
  // 获取token
  const token = userStore?.getToken
  const _params = config.data || config.params
  // 判断是否有参数
  if (!isObjEmpty(_params)) {
    // 格式化get参数
    if (config.method.toLowerCase() === 'get') {
      config.params = config.data
      delete config.data
    }

    // formDate格式处理
    const isMultipart = invoke(config, 'headers["Content-Type"].indexOf', 'multipart/form-data')
    if (isMultipart && isMultipart !== -1) {
      const params = config.data
      const formData = new FormData()
      if (typeOf(params) === 'object') {
        for (const key in params)
          formData.append(key, params[key])

        config.data = formData
      }
    }
  }

  const defaultConfig = {
    isMsg: true, // 是否弹出错误信息
    headers: {
      'Authorization': token,
      'Authorization-Refresh': 'none-token-refresh',
      'Content-Type': 'application/json;charset=UTF-8',
    },
    method: 'POST',
    timeout: 2 * 60 * 1000,

    // 选择相应的域名
    baseURL: domain_list[domain],

    // 序列化`params`
    paramsSerializer: (params) => {
      // get请求格式化对象/数组并转义字符
      return qs.stringify(params, { allowDots: true, encode: true, indices: false })
    },
  }

  return merge(defaultConfig, config)
}
