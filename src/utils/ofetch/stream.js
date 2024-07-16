import { saveAs } from 'file-saver'

/**
 *导出文件流
 */
export function expStream(options, response) {
  const { _data } = response
  // 自定义文件名fileName
  if (_data.type !== 'application/json') {
    if (options.fileName) {
      saveAs(_data, options.fileName)
    }
    else {
      // 获取文件流返回的文件名
      const contentDisposition = response.headers['Content-Disposition']
      let fileName
      if (contentDisposition) {
        const match = contentDisposition.match(/filename="?([^";]*)"?/)
        fileName = match ? match[1] : null
        if (fileName)
          saveAs(_data, fileName)
      }
      else {
        console.error('未取到包含类型的文件名称！')
      }
    }
  }
  else {
    const reader = new FileReader()
    /**
     *错误处理
     */
    reader.onload = function (e) {
      const result = JSON.parse(e.target.result)
      ElMessage.error(result.msg)
      response._data = result
    }
    reader.readAsText(response._data)
  }
}
