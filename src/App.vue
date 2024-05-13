<template>
  {{ a }}
  <el-config-provider :locale="zhCn" :button="config" :size="assemblySize">
    <router-view />
  </el-config-provider>
</template>

<script setup name="App">
// 配置element中文
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { storeToRefs } from 'pinia'
import appStore from '@/store'

const { assemblySize } = storeToRefs(appStore.globalStore)
// 配置element按钮文字中间是否有空格
const config = reactive({
  autoInsertSpace: false,
})
</script>
