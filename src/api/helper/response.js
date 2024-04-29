import { get } from 'lodash-es'
import { ElMessage } from 'element-plus'
import { saveAs } from 'file-saver'

export function exportFile(response) {
  const { data, config } = response
  // 导出文件流，fileName参数为必填
  if (data.type !== 'application/json') {
    if (config.fileName)
      saveAs(data, response.config.fileName)
  }
  else {
    const reader = new FileReader()
    reader.onload = function (e) {
      const { msg } = JSON.parse(e.target.result)
      ElMessage.error(msg)
    }
    reader.readAsText(data)
  }
}

export function serviceError(error) {
  const status = get(error, 'response.status')
  switch (status) {
    case 400:
      error.message = '请求错误'
      break
    case 401:
      error.message = '未授权，请登录'
      break
    case 403:
      error.message = '拒绝访问'
      break
    case 404:
      error.message = `请求地址出错: ${error.response.config.url}`
      break
    case 408:
      error.message = '请求超时'
      break
    case 500:
      error.message = '服务器内部错误'
      break
    case 501:
      error.message = '服务未实现'
      break
    case 502:
      error.message = '网关错误'
      break
    case 503:
      error.message = '服务不可用'
      break
    case 504:
      error.message = '网关超时'
      break
    case 505:
      error.message = 'HTTP版本不受支持'
      break
    default:
      break
  }
  // 打印到控制台
  if (import.meta.env.MODE === 'development') {
    console.log('>>>>>> 接口错误： >>>>>>')
    console.log(error)
  }

  // 显示提示
  ElMessage({
    showClose: true,
    message: error.message,
    type: 'error',
    duration: 5 * 1000,
  })
//   throw error
}
