// 非拦截状态码
export const passStatus = [200, 401]

/**
 * 处理错误码
 */
export function handleErrorStatus(response) {
  if (!passStatus.includes(response.status)) {
    let errorMsg = ''
    switch (response.status) {
      case 400:
        // 处理 400 错误
        errorMsg = `Bad Request ${response.status}`
        break
      case 403:
        // 处理 403 错误
        errorMsg = `Forbidden ${response.status}`
        console.error('Forbidden', response.data)
        break
      case 404:
        // 处理 404 错误
        errorMsg = `Not Found ${response.status}`
        console.error('Not Found', response.data)
        break
      case 500:
        // 处理 500 错误
        errorMsg = `Internal Server Error ${response.status}`
        break
        // 添加其他状态码的处理
      default:
        errorMsg = `Bad Request ${response.status}`
    }
    ElMessage({
      showClose: true,
      message: errorMsg || '错误',
      type: 'error',
      duration: 3 * 1000,
    })
  }
}
