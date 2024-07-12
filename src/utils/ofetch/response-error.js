// 状态码白名单
export const passStatus = [401]

/**
 * 处理错误码
 */
export function handleErrorStatus(status) {
  if (!passStatus.includes(status)) {
    let errorMsg = ''
    switch (status) {
      case 400:
        // 处理 400 错误
        errorMsg = `Bad Request ${status}`
        break
      case 403:
        // 处理 403 错误
        errorMsg = `Forbidden ${status}`
        break
      case 404:
        // 处理 404 错误
        errorMsg = `Not Found ${status}`
        break
      case 500:
        // 处理 500 错误
        errorMsg = `Internal Server Error ${status}`
        break
        // 添加其他状态码的处理
      default:
        errorMsg = `Bad Request ${status}`
    }
    ElMessage({
      showClose: true,
      message: errorMsg || '错误',
      type: 'error',
      duration: 3 * 1000,
    })
  }
}
