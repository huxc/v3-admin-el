<template>
  <span :class="{ 'cus-upload-x': isUpload }">
    <el-upload
      ref="uploadRef"
      v-model:file-list="fileList"
      :data="param"
      :limit="limit"
      :action="action"
      :headers="headers"
      :on-error="handleError"
      list-type="picture-card"
      :on-exceed="handleExceed"
      :on-success="handleSuccess"
      :on-preview="handlePreview"
      :on-remove="handleDeleteFile"
      :before-upload="handleBeforeUpload"
    >
      <v3-icon icon="ep:plus" />
      <template #file="{ file }">
        <div style="width: 100%;">
          <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
          <span class="el-upload-list__item-actions">
            <span
              class="el-upload-list__item-preview"
            >
              <el-image
                style="width: 22px;height: 22px;"
                class="el-upload-list__item-thumbnail" :src="preview" :zoom-rate="1.2"
                :max-scale="7"
                :min-scale="0.2"
                :preview-src-list="[file.url]"
                fit="cover"
              />
            </span>
            <span
              class="el-upload-list__item-delete"
              @click="onRemove(file)"
            >
              <v3-icon icon="ep:delete" />
            </span>
          </span>
        </div>
      </template>
      <template #tip>
        <div v-if="showMsg" class="el-upload__tip">
          只能上传{{ ext }}文件，且不超过{{ maxSizeWithUnit }}
          <span v-if="limit">最多上传{{ limit }}张</span>
        </div>
        <div v-else class="el-upload__tip">
          {{ tip }}
        </div>
      </template>
    </el-upload>
  </span>
</template>

<script setup name="cus-upload-img">
import { invoke, until } from '@vueuse/core'
import { useUpload } from '@/hooks/useUpload'
import { file_upload_url } from '@/api/config/globalsUrl.js'
import { typeOf } from '@/utils'
import { useUserStore } from '@/store/modules/user'
import preview from '@/assets/images/preview.png'

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
  limit: {
    type: Number,
    default: 1,
  },
  ext: {
    type: String,
    default: '.jpg,.png,.jpeg',
  },
  tip: {
    type: String,
    default: '',
  },
  showMsg: {
    type: Boolean,
    default: true,
  },
  imageList: {
    type: Array,
    /**
     * 详情图片回显，数组格式[{url:xxx}]
     */
    default: () => [],
  },
})
const userStore = useUserStore()
const filePaths = defineModel()
// 设置token
const headers = { Authorization: userStore?.getToken }

const {
  fileList,
  isUpload,
  uploadRef,
  handleError,
  handleExceed,
  handlePreview,
  handleSuccess,
  maxSizeWithUnit,
  handleDeleteFile,
  handleBeforeUpload,
} = useUpload(props, filePaths)

/**
 * 移出事件
 */
function onRemove(file) {
  uploadRef.value.handleRemove(file)
}

invoke(async () => {
  await until(filePaths).toMatch(v => v?.length > 0)
  fileList.value = []
  typeOf(filePaths.value) === 'array'
    ? fileList.value = filePaths.value.map(url => ({ url }))
    : fileList.value.push({ url: filePaths.value })
})
</script>

  <style lang="scss">
  .upload-image .el-dialog__header {
  border: transparent;
  background-color: transparent !important;
}
.upload-image .el-dialog__header .el-dialog__headerbtn {
  background-color: transparent !important;
}
.upload-image .el-dialog__body {
  max-height: 500px;
  overflow-y: auto;
}
.cus-upload-x {
  .el-upload--picture-card {
    display: none;
  }
}
.el-upload-list__item .el-icon--close-tip {
  display: none !important;
}
.maxImg {
  max-width: 100%;
}
</style>
