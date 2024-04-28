import axios from 'axios'
import { ElMessage } from 'element-plus'
import { has } from 'lodash-es'
import { saveAs } from 'file-saver'
import router from '@/routers'
import appStore from '@/store/index.js'
import refreshToken from '@/utils/ref-token'
import { serviceError } from '@/utils/service-error'
import { mergeConfig } from '@/api/config/requestConfig'
import { closeLoading, openLoading } from '@/utils/el-loading'

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

      const res = response.data
      if (response.config && response.config.responseType === 'blob') {
        saveAs(res, response.config.fileName)
        return res
      }
      if (!res.success) {
        // token失效跳转到登录页面
        if (res.code === 'A02309999' || res.code === 'A02319999') {
          appStore.userStore.ref_token = true
          res.msg = '请重新登录'
          appStore.userStore.clearState()
          router.push({ path: '/login' })
        }
        // 刷新token 预留判断 (待完善)
        if (res.code === '预留判断根据业务调整code值')
          refreshToken(response)

        //
        if (response.config.isMsg && !appStore.userStore.ref_token) {
          ElMessage({
            showClose: true,
            message: res.msg || '错误',
            type: 'error',
            duration: 3 * 1000,
          })
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
export const request = createRequest(service)
