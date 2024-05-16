<template>
  <div class="login-x">
    <p class="login-title">
      欢迎登录
    </p>
    <!-- 登录表单 -->
    <el-form ref="formEl" class="cusform-box" style="width: 65%;" :rules="rules" :model="formLogin" label-position="top" label-width="100px">
      <el-form-item label="用户名/手机号" prop="username">
        <el-input v-model="formLogin.username" maxlength="30" placeholder="用户名：admin / user01 / user02" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="formLogin.password" maxlength="15" type="password" show-password placeholder="密码：123456" />
      </el-form-item>
    </el-form>
    <p class="reset">
      忘记密码？
    </p>
    <el-button v-on-key-stroke:c,v="handleValidate" class="cusform-btn" type="primary" size="default" @click="handleValidate">
      立即登录
    </el-button>
    <div class="login-footer">
      <span>还没有账号？</span>
      <span class="register" @click="onRgister">去注册</span>
    </div>
  </div>
</template>

<script setup>
import { onKeyStroke } from '@vueuse/core'
import { vOnKeyStroke } from '@vueuse/components'
import { useRoute, useRouter } from 'vue-router'
import { useForm } from './hooks/useForm'
import { HOME_URL } from '@/config/global'
import { useUserStore } from '@/store/modules/user'

const emit = defineEmits(['onRegister'])
const userStore = useUserStore()

const formEl = ref(null)
const { rules } = useForm()
const formLogin = reactive({
  phone: '',
  password: '',
  grant_type: 'password',
  client_id: 'client_2',
  client_secret: '123456',
})

const router = useRouter()
const route = useRoute()
const redirect = (route.query && route.query.redirect) || HOME_URL

// 监听回车键登录
onKeyStroke('Enter', (e) => {
  e.preventDefault()
  handleValidate()
})

/**
 *登录
 */
function onLogin(loginEl) {
  if (!loginEl)
    return
  userStore.logIn(formLogin).then(() => {
    // 避免获取token失败
    setTimeout(() => {
      router.push(redirect)
    }, 500)
  })
}

/**
 * 去注册
 */
function onRgister() {
  emit('onRegister')
}
/**
 *登录校验
 */
function handleValidate() {
  if (!formEl.value)
    return
  formEl.value.validate((valid) => {
    if (valid) {
      try {
        onLogin(formEl)
        return true
      }
      catch (e) {
      }
    }
    else {
      return false
    }
  })
}
</script>

  <style lang='scss' scoped>
.login-x {
  --el-component-size: 42px;
  --el-border-radius-base: 14px;

  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
  height: 560px;
  background: #ffffff;
  box-shadow: 0px 6px 16px 1px rgba(104, 105, 114, 0.1);
  border-radius: 30px;
  :deep(.cusform-box) {
    .el-form-item__label {
      font-size: 14px;
      font-weight: 400;
      color: #495363;
      line-height: 24px;
      margin-left: 6px;
    }
    .el-input .el-input__password {
      font-size: 20px !important;
      margin-left: -2px;
    }
    .el-input__suffix-inner {
      margin-left: -30px;
    }
  }
  .login-title {
    margin-top: 68px;
    margin-bottom: 46px;
    font-size: 40px;
    font-weight: bold;
    color: #8f6efe;
    font-family: W03;
  }

  .cusform-btn {
    margin-top: 30px;
    width: 330px;
    height: 48px;
    background: #8f6efe;
    box-shadow: 0px 6px 12px 1px rgba(63, 140, 255, 0.26);
    border-radius: 14px;
    font-size: 16px;
  }
  .reset {
    margin-left: 355px;
    font-size: 16px;
    color: #7d8592;
    cursor: pointer;
  }
  .login-footer {
    font-size: 16px;
    margin-top: 18px;
    color: #8f6efe;
    .register {
      color: #fc7100;
      text-decoration: underline;
      cursor: pointer;
    }
  }
}
</style>
