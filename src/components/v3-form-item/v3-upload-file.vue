<template>
  <div v-loading="isLoading">
    <span class="upload-file__x">
      <el-input v-if="showIpt" v-model="fileName" class="upload-file__ipt" readonly />
      <el-upload
        ref="uploadRef"
        v-model:file-list="fileList"
        class="upload"
        :data="param"
        :before-upload="handleBeforeUpload"
        :headers="headers"
        :show-file-list="false"
        :action="action"
        :on-remove="handleDelete"
        :on-success="handleSuccess"
        :on-error="handleError"
        :auto-upload="autoUpload"
        :limit="limit"
        :on-exceed="handleExceed"
      >
        <template #trigger>
          <el-button type="warning">{{ btnMsg }}</el-button>
        </template>

        <el-button v-if="!autoUpload" type="primary" class="export-button page-primary-button primary-blue" @click="submitUpload">
          {{ exportBtnMsg }}
        </el-button>
      </el-upload>
    </span>
    <div v-if="showMsg" class="el-upload__tip text-red">
      只能上传{{ ext }}文件，且不超过{{ maxSizeWithUnit }}
    </div>
  </div>
</template>

<script setup name="cus-upload-file">
import { last } from 'lodash-es'
import { useVModel } from '@vueuse/core'
import { genFileId } from 'element-plus'
import appStore from '@/store/index.js'
import { useUpload } from '@/hooks/useUpload'
import { file_upload_url } from '@/api/config/globalsUrl.js'

const props = defineProps({
  action: {
    type: String,
    default: file_upload_url,
  },
  param: {
    type: Object,
    /**
     * 参数
     */
    default: () => {},
  },
  maxSize: {
    type: Number,
    default: 5 * 1024,
  },
  ext: {
    type: String,
    default: '.xls,.pdf,.jpg,.png,.jpeg',
  },
  showMsg: {
    type: Boolean,
    default: true,
  },
  showIpt: {
    type: Boolean,
    default: true,
  },
  isBack: {
    type: Boolean,
    default: true,
  },
  btnMsg: {
    type: String,
    default: '查找',
  },
  isAllData: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: [String, Object],
    default: '',
  },
  // 手动上传
  autoUpload: {
    type: Boolean,
    default: true,
  },
  // 手动上传 button text
  exportBtnMsg: {
    type: String,
    default: '导入',
  },
  limit: {
    type: Number,
    default: 1,
  },
})

const emit = defineEmits(['update:modelValue', 'upload'])
const param = computed(() => props.param)
const formItemVal = useVModel(props, 'modelValue', emit)

const fileName = ref(props.modelValue)
const uploadRef = ref(null)
const headers = { Authorization: appStore.userStore?.getToken } // 设置token

watch(props, () => {
  if (props?.modelValue?.length === 0) {
    uploadRef.value.clearFiles()
    fileName.value = ''
  }
  else {
    fileName.value = props.modelValue
  }
})

const { fileList, isLoading, maxSizeWithUnit, handleDelete, handleError } = useUpload(props, formItemVal)

watch(fileList, () => {
  if (fileList.value && !props.autoUpload)
    fileName.value = fileList.value[0].name
})

/**
 * 成功处理
 */
function handleSuccess(res, file, files) {
  if (props.isBack) {
    if (res.success) {
      fileName.value = last(files).name
      emit('upload', res.data)
      if (props.isAllData)
        formItemVal.value = JSON.stringify(res.data)
      else
        formItemVal.value = res.data?.documentAddress
    }
    else {
      handleError(res.msg)
    }
  }
  isLoading.value = false
}

/**
 *上传前校检格式和大小
 */
function handleBeforeUpload(file) {
  const fileExt = file.name.lastIndexOf('.')
  const subExt = file.name.substring(fileExt).toLocaleLowerCase()
  const isExt = props.ext.includes(subExt)
  if (!isExt) {
    ElMessage.warning({
      showClose: true,
      message: `只能上传${props.ext}格式的文件!`,
    })
    return false
  }
  const isLtmaxWidth = file.size / 1024 < props.maxSize
  if (!isLtmaxWidth) {
    ElMessage.warning({
      showClose: true,
      message: `上传文件大小不能超过${props.maxSize}KB！`,
    })
    return false
  }
  isLoading.value = true
  return true
}

/**
 *导入
 */
function submitUpload() {
  uploadRef.value.submit()
}

/**
 * 当超出限制时，执行的钩子函数
 */
function handleExceed(files) {
  uploadRef.value.clearFiles()
  const file = files[0]
  file.uid = genFileId()
  uploadRef.value.handleStart(file)
}
</script>

  <style lang="scss" scoped>
  .upload-file__x {
  display: flex;
  align-items: flex-start;

  .upload {
    display: flex;
    flex-direction: row;
    .export-button {
      margin-left: 10px;
    }
  }
}

.upload-file__ipt {
  margin-right: 10px;
}
</style>
