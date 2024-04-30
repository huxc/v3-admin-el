<template>
  <div class="login-x">
    <p class="login-title">
      欢迎登录
    </p>
    <!-- 登录表单 -->
    <el-form ref="formEl" class="cusform-box" style="width: 65%;" :rules="rules" :model="formLogin" label-position="top" label-width="100px">
      <el-form-item label="用户名/手机号" prop="username">
        <el-input v-model="formLogin.username" maxlength="30" placeholder="请输入用户名/手机号" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="formLogin.password" maxlength="15" type="password" show-password placeholder="请输入密码" />
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <div style="display: flex; justify-content: space-between;align-items: center;">
          <el-input v-model="formLogin.code" maxlength="4" class="verification-code" placeholder="请输入验证码" />
          <p style="width: 38px;" />
          <image-code style="margin-top: 4px;" :change="imgRefresh" @click="changeImageCode" @get-code="getImgBase64" />
        </div>
      </el-form-item>
    </el-form>
    <p class="reset" @click="componentName = 'loginReset'">
      忘记密码？
    </p>
    <el-button v-on-key-stroke:c,v="handleValidate" class="cusform-btn" type="primary" size="default" @click="handleValidate">
      立即登录
    </el-button>
    <div class="login-footer">
      <span>还没有账号？</span>
      <span class="register" @click=" componentName = 'loginRegister'">去注册</span>
    </div>
  </div>
</template>

<script setup>
import md5 from 'js-md5'
import { onKeyStroke } from '@vueuse/core'
import { useRoute, useRouter } from 'vue-router'
import imageCode from './img-code.vue'
import { useForm } from './hooks/useForm'
import { deepCopy } from '@/utils/index'
import { HOME_URL } from '@/config/global'
import appStore from '@/store'

const componentName = defineModel()

const formEl = ref(null)
const { rules, imgCode } = useForm()
const formLogin = reactive({
  phone: '',
  password: '',
  grant_type: 'password',
  client_id: 'client_2',
  client_secret: '123456',
})

const router = useRouter()
const route = useRoute()
const imgRefresh = ref(true)
const redirect = (route.query && route.query.redirect) || HOME_URL

// 监听回车键登录
onKeyStroke('Enter', (e) => {
  e.preventDefault()
  handleValidate()
})

// 登录
function onLogin(loginEl) {
  if (!loginEl)
    return
  const params = deepCopy(formLogin)
  params.password = md5(params.password)
  params.phone = params.username
  appStore.userStore.logIn(params).then(() => {
    // 避免获取token失败
    setTimeout(() => {
      router.push(redirect)
    }, 500)
  })
}

// 登录校验
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

function getImgBase64(code) {
  imgCode.value = code
}

// 刷新验证码操作
function changeImageCode() {
  imgRefresh.value = !imgRefresh.value
}
</script>

  <style lang='scss' scoped>
  .login-x {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 522px;
  height: 620px;
  background: #ffffff;
  box-shadow: 0px 6px 16px 1px rgba(104, 105, 114, 0.1);
  border-radius: 30px;
  :deep(.cusform-box) {
    .el-form-item__label {
      //   font-size: 14px;
      font-family:
        Microsoft YaHei UI-Regular,
        Microsoft YaHei UI;
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
    font-size: 24px;
    font-weight: bold;
    color: #2b3eb1;
    font-family:
      Microsoft YaHei UI-Bold,
      Microsoft YaHei UI;
  }

  .cusform-btn {
    margin-top: 30px;
    width: 170px;
    height: 48px;
    background: #2b3eb1;
    box-shadow: 0px 6px 12px 1px rgba(63, 140, 255, 0.26);
    border-radius: 14px;
    font-size: 16px;
  }
  .reset {
    margin-left: 355px;
    font-size: 16px;
    font-family: PingFangSC-Regular-, PingFangSC-Regular;
    color: #7d8592;
    cursor: pointer;
  }
  .login-footer {
    font-size: 16px;
    margin-top: 18px;
    font-family: PingFangSC-Regular-, PingFangSC-Regular;
    color: #2b3eb1;
    .register {
      color: #fc7100;
      text-decoration: underline;
      cursor: pointer;
    }
  }
}
</style>
