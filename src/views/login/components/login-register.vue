<template>
  <div class="register-x">
    <p class="login-title">
      用户注册
    </p>
    <div class="form-x">
      <v3-form
        ref="formRef" class="cusform-box" :model="editForm" :gutter="100"
        label-position="top" :form-items="formItems" @submit="handleSave"
      />
      <div class="btn-x">
        <el-button class="cusform-btn" size="default" @click="handleRegister">
          快速注册
        </el-button>
      </div>
      <div class="login-footer">
        <span>已注册账号</span>
        <span class="register" @click="onLogin">去登录</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onKeyStroke } from '@vueuse/core'
import { useRegister } from './hooks/useRegister'
import { deepCopy } from '@/utils/index'

const emit = defineEmits(['onLogin'])

const {
  formRef,
  formItems,
  editForm,
  smsCodes,
  validateCode,
} = useRegister()

// 监听回车键注册
onKeyStroke('Enter', (e) => {
  e.preventDefault()
  handleRegister()
})

/**
 * 保存
 */
function handleSave() {
  const smsVcode = smsCodes.value.join('')
  if (smsVcode.length === 6)
    editForm.code = smsVcode
  const params = deepCopy(editForm)
  // params.password = md5(params.password)
  delete params.passwords
}

/**
 * 校验
 */
function handleRegister() {
  const isVali = validateCode()
  if (isVali)
    formRef.value.handleSubmit()
}

/**
 * 去登录
 */
function onLogin() {
  emit('onLogin')
}
</script>

  <style lang='scss' scoped>
  .register-x {
  --el-component-size: 42px;
  --el-border-radius-base: 14px;

  display: flex;
  flex-direction: column;
  align-items: center;
  width: 522px;
  height: 710px;
  background: #ffffff;
  border-radius: 30px;
  box-shadow: 0px 6px 16px 1px rgba(104, 105, 114, 0.1);

  .btn-x {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .cusform-btn {
    margin-top: 10px;
    width: 100%;
    height: 58px;
    background: linear-gradient(45deg, #b342fe 50%, #41d1ff);
    box-shadow: 0px 6px 12px 1px rgba(63, 140, 255, 0.26);
    border-radius: 14px;
    font-size: 18px;
    font-family:
      Microsoft YaHei UI-Regular,
      Microsoft YaHei UI;
    font-weight: 400;
    color: #ffffff;
  }
  .cusform-btn + .cusform-btn {
    margin-left: 20px;
    background: #fc7100;
    box-shadow: 0px 6px 12px 1px rgba(252, 153, 72, 0.26);
  }
  :deep(.form-x) {
    .password {
      .el-input__password {
        font-size: 20px !important;
        margin-left: -2px;
      }
      .el-input__suffix {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        margin-left: -20px;
      }
    }
    .smsitem {
      .el-input__wrapper {
        width: 50px;
        height: 50px;
        border-radius: 14px;
        padding: 0;
        margin-right: 20px;
      }
      .el-input__inner {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        width: 58px;
        height: 50px;
        text-align: center;
        border-radius: 0;
        font-size: 14px;
        background-color: unset;
      }
    }
  }
}
.form-x {
  width: 420px;
}
.login-title {
  margin-top: 30px;
  margin-bottom: 30px;
  font-size: 34px;
  font-weight: bold;
  color: #b342fe;
  font-family:
    Microsoft YaHei UI-Bold,
    Microsoft YaHei UI;
}
.code-x {
  display: flex;
  justify-content: space-between;
}

.avatar-list {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .avatar-image {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 1px solid #c7cfe3;
    cursor: pointer;
    box-sizing: border-box;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .active {
    border: 2px solid #fc7100;
  }
}

.login-footer {
  font-size: 16px;
  margin-top: 18px;
  text-align: right;
  font-family: PingFangSC-Regular-, PingFangSC-Regular;
  color: #ad3afe;
  .register {
    color: #fc7100;
    margin-left: 30px;
    margin-right: 20px;
    text-decoration: underline;
    cursor: pointer;
  }
}
</style>
