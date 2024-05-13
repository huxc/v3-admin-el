<template>
  <div class="register-x">
    <p class="login-title">
      忘记密码
    </p>
    <div class="form-x">
      <cus-el-form
        ref="formRef" class="cusform-box" :model="editForm" :gutter="100"
        label-position="top" :form-items="formItems" @submit="handleSave"
      >
        <template #phoneCode>
          <div ref="codeboxEl" class="code-x">
            <el-input v-model="smsCodes[0]" maxlength="1" sms="sms1" class="smsitem " />
            <el-input v-model="smsCodes[1]" maxlength="1" sms="sms2" class="smsitem sms1" />
            <el-input v-model="smsCodes[2]" maxlength="1" sms="sms3" class="smsitem sms2" />
            <el-input v-model="smsCodes[3]" maxlength="1" sms="sms4" class="smsitem sms3" />
            <el-input v-model="smsCodes[4]" maxlength="1" sms="sms5" class="smsitem sms4" />
            <el-input v-model="smsCodes[5]" maxlength="1" class="smsitem sms5" />
          </div>
          <div class="el-form-item__error">
            {{ codeError }}
          </div>
        </template>
      </cus-el-form>
      <div class="btn-x">
        <el-button class="cusform-btn" size="default" @click="handleSubmit">
          确定
        </el-button>
        <el-button class="cusform-btn" size="default" @click="() => { componentName = 'loginForm' }">
          返回登录
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
// import md5 from 'js-md5'
import { onKeyStroke } from '@vueuse/core'
import { useReset } from './hooks/useReset'
import { useAutoFocus } from './hooks/useAutoFocus'
import { deepCopy } from '@/utils/index'

const componentName = defineModel()

const formRef = ref(null)
const { autoFocus, codeboxEl } = useAutoFocus()
const { formItems, smsCodes, codeError, editForm, validateCode } = useReset()

onMounted(() => {
  autoFocus()
})

// 监听回车键修改密码
onKeyStroke('Enter', (e) => {
  e.preventDefault()
  handleSubmit()
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
  api.login.postForget(params).then(() => {
    // eslint-disable-next-line no-undef
    ElNotification({
      title: '密码已重置！',
      message: '即将跳转至登录',
      type: 'success',
      duration: 2 * 1000,
      /**
       * 关闭
       */
      onClose: () => {
        componentName.value = 'loginForm'
      },
    })
  })
}

/**
 * 校验表单
 */
function handleSubmit() {
  setTimeout(() => {
    validateCode()
  }, 200)
  formRef.value.handleSubmit()
}
</script>

  <style lang='scss' scoped>
  .register-x {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 522px;
  height: 640px;
  background: #ffffff;
  border-radius: 30px;
  box-shadow: 0px 6px 16px 1px rgba(104, 105, 114, 0.1);

  .btn-x {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .cusform-btn {
    margin-top: 30px;
    width: 170px;
    height: 48px;
    background: #2b3eb1;
    box-shadow: 0px 6px 12px 1px rgba(63, 140, 255, 0.26);
    border-radius: 14px;
    font-size: 16px;
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
        margin-left: -20px;
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
  width: 403px;
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
.code-x {
  display: flex;
  justify-content: space-between;

  .codeitem {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 58px;
    height: 50px;
    background: #ffffff;
    box-shadow: 0px 1px 2px 1px rgba(184, 200, 224, 0.22);
    border-radius: 14px;
    border: 1px solid #d8e0f0;
    margin-right: 15px;
  }
}
</style>
