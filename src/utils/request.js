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
      // 导出文件流，fileName参数为必填
      if (response.config?.responseType === 'blob') {
        if (res.type !== 'application/json') {
          if (response.config.fileName)
            saveAs(res, response.config.fileName)
        }
        else {
          const reader = new FileReader()
          reader.onload = function (e) {
            const { msg } = JSON.parse(e.target.result)
            ElMessage.error(msg)
          }
          reader.readAsText(res)
        }
        return response
      }
      if (!res.success) {
        // token失效跳转到登录页面
        const codes = ['A02309999', 'A02319999']
        if (codes.includes(res.code)) {
        //   appStore.userStore.ref_token = true
        //   appStore.userStore.clearState()
          res.msg = '请重新登录'
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
