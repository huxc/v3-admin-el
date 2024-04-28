import { typeOf } from '@/utils'

export function useUpload(props, fileVModel) {
  const { ext, maxSize, limit, imageList } = props
  const uploadRef = ref()
  const fileList = ref(imageList)
  const visible = ref(false)
  const imageUrl = ref('')
  const isLoading = ref(false)
  // 上传前校检格式和大小
  const handleBeforeUpload = (file) => {
    const fileExt = file.name.lastIndexOf('.')
    const subExt = file.name.substring(fileExt).toLocaleLowerCase()
    const isExt = ext.includes(subExt)
    if (!isExt) {
      ElMessage.warning(`只能上传${ext}格式的文件！`)
      return false
    }
    const isLtmaxWidth = file.size / 1024 < maxSize
    if (!isLtmaxWidth) {
      ElMessage.warning({
        showClose: true,
        message: `上传文件大小不能超过${maxSize}KB！`,
      })
      return false
    }
    isLoading.value = true
    return true
  }

  // 文件个数超出限制
  const handleExceed = () => {
    ElMessage.warning({
      showClose: true,
      message: `最多上传${limit}张图片！`,
    })
  }

  // 上传失败回调
  const handleError = (err) => {
    isLoading.value = false
    ElMessage.warning({
      showClose: true,
      message: err,
    })
  }

  // 上传成功回调
  const handleSuccess = (res, file) => {
    if (res.success) {
      limit > 1
        ? fileVModel.value.push(res?.data)
        : fileVModel.value = res?.data
      file.url = file.url || ''
    }
    else {
      handleError(res.msg)
    }
  }

  // 预览事件
  const handlePreview = (file) => {
    imageUrl.value = file.url
    visible.value = true
  }

  // 删除上传文件前
  const beforeDelete = (file) => {
    if (file.status === 'success')
      return ElMessageBox.confirm(`确定删除文件【${file.name}】`)
  }

  // 上传单图/多图的删除
  const handleDeleteFile = (file) => {
    if (file.status === 'success') {
      const url = file?.response?.data || file.url
      // 判断表单字段是否为数组
      const isArray = typeOf(fileVModel.value) === 'array'
      if (limit.length <= 0) {
        isArray
          ? fileVModel.value = []
          : fileVModel.value = ''
      }
      else {
        if (isArray) {
          const index = fileVModel.value.findIndex(i => i === url)
          if (index !== -1)
            fileVModel.value.splice(index, 1)
        }
      }
    }
  }

  const isUpload = computed(() => {
    return fileList.value.length >= limit
  })

  const maxSizeWithUnit = computed(() => {
    if (maxSize >= 1024)
      return `${(maxSize / 1024).toFixed(2)}MB`

    return `${maxSize}KB`
  })
  return {
    visible,
    fileList,
    isUpload,
    imageUrl,
    uploadRef,
    isLoading,
    handleError,
    handleExceed,
    beforeDelete,
    handlePreview,
    handleSuccess,
    maxSizeWithUnit,
    handleDeleteFile,
    handleBeforeUpload,
  }
}
