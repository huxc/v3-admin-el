<template>
  <el-container class="layout">
    <el-aside>
      <div class="aside-box" :style="{ width: isCollapse ? '65px' : '210px' }">
        <div class="logo flx-center">
          <img class="logo-img" src="/images/logo.svg" alt="logo">
          <span v-show="!isCollapse" class="logo-text">管理系统</span>
        </div>
        <el-scrollbar>
          <el-menu
            :router="false"
            :default-active="activeMenu"
            :collapse="isCollapse"
            :unique-opened="accordion"
            :collapse-transition="false"
          >
            <SubMenu :menu-list="menuList" />
          </el-menu>
        </el-scrollbar>
      </div>
    </el-aside>
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <Main />
    </el-container>
  </el-container>
</template>

<script setup>
import Header from './components/Header/index.vue'
import { useGlobalStore } from '@/store/modules/global'
import { useUserStore } from '@/store/modules/user'
import Main from '@/layouts/components/Main/index.vue'
import SubMenu from '@/layouts/components/Menu/SubMenu.vue'

const route = useRoute()
const userStore = useUserStore()
const globalStore = useGlobalStore()
const menuList = computed(() => userStore.asyncRoutes)
const accordion = computed(() => globalStore.accordion)
const isCollapse = computed(() => globalStore.isCollapse)
const activeMenu = computed(() => (route.meta.activeMenu ? route.meta.activeMenu : route.path))
</script>

  <style scoped lang="scss">
  @import './index.scss';
</style>
