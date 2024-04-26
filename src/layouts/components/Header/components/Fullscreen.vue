<template>
  <el-tooltip effect="dark" :content="isFullscreen ? '退出全屏' : '全屏'" placement="bottom">
    <Icon v-show="isFullscreen" class="header-icon" icon="ant-design:fullscreen-exit-outlined" @click="toggle" />
    <Icon v-show="!isFullscreen" class="header-icon" icon="ant-design:fullscreen-outlined" @click="toggle" />
  </el-tooltip>
</template>

<script setup>
import { useFullscreen } from '@vueuse/core'

const { toggle, isFullscreen } = useFullscreen()
</script>

<style lang="scss" scoped>
.header-icon {
  font-size: 1.5rem;
  color: #606266;
}
.header-icon:hover {
  cursor: pointer;
}
</style>
