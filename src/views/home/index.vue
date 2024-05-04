<template>
  <div class="title">
    首页
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  api_account_getUser()
  // console.log('api :>> ', api)
})
</script>

<style lang='scss' scoped>
  .title {
  font-size: 300px;
}
</style>
