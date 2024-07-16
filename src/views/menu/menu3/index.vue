<template>
  <div>
    <el-button @click="handleDlg">
      获取文件
    </el-button>
    <el-button @click="handleJson">
      获取json
    </el-button>
  </div>
</template>

<script setup>
/**
 * handleDlg
 */
function handleDlg() {
  api_file_dlgPdf().then()
}

/**
 *handleJson
 */
function handleJson() {
  api_file_getCustomer(1).then()
}
</script>

  <style scoped lang="scss"></style>
