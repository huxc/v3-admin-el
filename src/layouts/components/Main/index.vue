<template>
  <el-main>
    <router-view v-slot="{ Component, route }">
      <transition appear name="fade-transform" mode="out-in">
        <keep-alive :include="cacheRouter">
          <component :is="Component" :key="route.path" />
        </keep-alive>
      </transition>
    </router-view>
  </el-main>
</template>

<script setup>
import { cacheRouter } from '@/routers/helper/dynamicRouter'
</script>

<style scoped lang="scss">
@use './index.scss' as *;
</style>
