<template>
  <template v-for="subItem in menuList" :key="subItem.path">
    <el-sub-menu v-if="subItem.children?.length" :index="subItem.path">
      <template #title>
        <V3Svg v-if="subItem.meta.icon" :name="subItem.meta.icon" :icon-style="iconStyle" />
        <span class="sle">{{ subItem.meta.title }}</span>
      </template>
      <SubMenu :menu-list="subItem.children" />
    </el-sub-menu>
    <el-menu-item v-else :index="subItem.path" @click="handleClickMenu(subItem)">
      <V3Svg v-if="subItem.meta.icon" :name="subItem.meta.icon" :icon-style="iconStyle" />
      <template #title>
        <span class="sle">{{ subItem.meta.title }}</span>
      </template>
    </el-menu-item>
  </template>
</template>

<script setup>
defineProps({
  menuList: {
    type: Array,
    default: () => [],
  },
})

const router = useRouter()
const iconStyle = {
  width: '20px',
  height: '20px',
  marginRight: '10px',
}
function handleClickMenu(subItem) {
  if (subItem.meta.isLink)
    return window.open(subItem.meta.isLink, '_blank')
  router.push(subItem.path)
}
</script>

<style lang="scss">
.el-sub-menu .el-sub-menu__title:hover {
  color: var(--el-menu-hover-text-color) !important;
  background-color: transparent !important;
}
.el-menu--collapse {
  .is-active {
    .el-sub-menu__title {
      color: #ffffff !important;
      background-color: var(--el-color-primary) !important;
    }
  }
}
.el-menu-item {
  &:hover {
    color: var(--el-menu-hover-text-color);
  }
  &.is-active {
    color: var(--el-menu-active-color) !important;
    background-color: var(--el-menu-active-bg-color) !important;
    &::before {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 4px;
      content: '';
      background-color: var(--el-color-primary);
    }
  }
}
.el-menu-item {
  &.is-active {
    &::before {
      left: 0;
    }
  }
}
</style>
