<template>
  <div>
    <el-button @click="show3 = !show3">
      Click Me
    </el-button>
    <el-collapse-transition>
      <div v-show="show3" class="title">
        <span>首页</span>
      </div>
    </el-collapse-transition>
    <div class="title">
      <span>首页</span>
    </div>
  </div>
</template>

<script setup>
const show3 = ref(true)
onMounted(() => {
//   api_account_getUser()
})
</script>

<style lang='scss' scoped>
  .title {
  font-size: 300px;
}
</style>
