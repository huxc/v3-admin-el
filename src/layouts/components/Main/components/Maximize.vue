<template>
  <div class="maximize" @click="exitMaximize">
    <i class="iconfont icon-tuichu" />
  </div>
</template>

<script setup>
import { useGlobalStore } from '@/store/modules/global'

const globalStore = useGlobalStore()
/**
 *exitMaximize
 */
function exitMaximize() {
  globalStore.setGlobalState('maximize', false)
}
</script>

<style scoped lang="scss">
.maximize {
  position: fixed;
  top: -25px;
  right: -25px;
  z-index: 999;
  width: 55px;
  height: 55px;
  cursor: pointer;
  background-color: var(--el-color-info);
  border-radius: 50%;
  opacity: 0.9;
  &:hover {
    background-color: var(--el-color-info-dark-2);
  }
  .iconfont {
    position: relative;
    top: 46%;
    left: 19%;
    font-size: 14px;
    color: #ffffff;
  }
}
</style>
