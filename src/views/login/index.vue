<template>
  <div class="h-main">
    <img class="logo" src="/images/nlogo.png" alt="" height="53" width="332">
    <!-- 顶部导航菜单 -->
    <div class="menu-x">
      <spn class="menu-item h" @click="$router.push('/home')" />
      <spn class="menu-item u" :class="loginComponent === 'loginForm' ? 'active' : ''" @click="() => { loginComponent = 'loginForm' }" />
      <spn class="menu-item r" :class="loginComponent === 'loginRegister' ? 'active' : ''" @click="() => { loginComponent = 'loginRegister' }" />
    </div>
    <transition
      appear
      enter-active-class="animate__animated animate__zoomIn animate__faster"
      leave-active-class="animate__animated animate__zoomOut animate__faster"
      mode="out-in"
    >
      <component :is="loginComponent" v-model="loginComponent" />
    </transition>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

defineOptions({
  components: {
    loginForm: defineAsyncComponent(() => import('./components/login-form.vue')),
    loginReset: defineAsyncComponent(() => import('./components/login-reset.vue')),
    loginRegister: defineAsyncComponent(() => import('./components/login-register.vue')),
  },
})

const route = useRoute()
const comName = route?.query?.type === '2' ? 'loginRegister' : 'loginForm'
const loginComponent = ref(comName)
</script>

  <style lang='scss' scoped>
  .h-main {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background-image: url(../../assets/images/hbg.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  .logo {
    position: absolute;
    left: 50px;
    top: 16px;
  }
  .desc-prefix {
    margin: 390px 0 6px 226px;
    font-family: NouvelleVagueFinal;
    font-size: 48px;
    color: #ffffff;
    margin-right: 2px;
    font-family: NouvelleVagueFinal;
    clip-path: inset(0 0 100% 0);
    transition: clip-path 2s ease-in-out;
  }
  .desc-cn {
    color: #ffffff;
    font-size: 14px;
    margin: 56px 0 0 226px;
    clip-path: inset(0 100% 0 0);
    transition: clip-path 3s ease-in-out;
  }
  .login-btn {
    width: 211px;
    height: 40px;
    cursor: pointer;
    margin: 60px 0 0 226px;
    background-color: rgba(213, 213, 213, 0.39);
    box-shadow: 0px 0px 45px 6px rgba(142, 143, 169, 0.56);
    border-radius: 19px;
    background-image: url(../../assets/images/login1.png);
    background-repeat: no-repeat;
    background-position: center;
    background-size: 76px 17px;
  }
  .menu-x {
    position: absolute;
    top: 0;
    left: 0;
    height: 78px;
    width: 100%;
    display: flex;
    justify-content: center;
    box-shadow: 0px 5px 40px 0px rgba(0, 0, 0, 0.49);
    .menu-item {
      display: inline-block;
      height: 100%;
      width: 100px;
      cursor: pointer;
      margin-right: 100px;
      background-repeat: no-repeat;
      background-position: center;
      background-size: 37px 22px;
    }
    .h {
      background-image: url(../../assets/images/homet.png);
    }
    .r {
      background-image: url(../../assets/images/zc.png);
    }
    .r.active {
      background-image: url(../../assets/images/zca.png);
    }
    .u {
      background-image: url(../../assets/images/login2.png);
      background-size: 72px 22px;
    }
    .u.active {
      background-image: url(../../assets/images/login_active.png);
    }
  }
}
</style>
