<template>
  <div class="header">
    <div />
    <div class="header-right">
      <!-- 全屏 -->
      <FullScreen />
      <!-- 登录用户昵称 -->
      <span class="nikeName">admin</span>

      <el-dropdown trigger="click">
        <div class="avatar">
          <img src="/images/user.png" alt="avatar">
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              修改密码
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import FullScreen from './components/Fullscreen.vue'
</script>

<style scoped lang="scss">
.header {
  height: 80px;
  width: 100%;
}

.header-right {
  position: absolute;
  right: 30px;
  display: flex;
  height: 80px;
  align-items: center;
  justify-content: space-between;
}
.nikeName {
  margin-right: 10px;
}
.avatar {
  width: 40px;
  height: 40px;
  overflow: hidden;
  cursor: pointer;
  border-radius: 50%;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
