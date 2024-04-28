<template>
  <div class="register-x">
    <p class="login-title">
      用户注册
    </p>
    <div class="form-x">
      <cus-el-form
        ref="formRef" class="cusform-box" :model="editForm" :gutter="100"
        label-position="top" :form-items="formItems" @submit="handleSave"
      >
        <!-- 验证码 -->
        <template #phoneCode>
          <div ref="codeboxEl" class="code-x">
            <el-input v-model="smsCodes[0]" maxlength="1" sms="sms1" class="smsitem del1" />
            <el-input v-model="smsCodes[1]" maxlength="1" sms="sms2" class="smsitem sms1 del2" del="del1" />
            <el-input v-model="smsCodes[2]" maxlength="1" sms="sms3" class="smsitem sms2 del3" del="del2" />
            <el-input v-model="smsCodes[3]" maxlength="1" sms="sms4" class="smsitem sms3 del4" del="del3" />
            <el-input v-model="smsCodes[4]" maxlength="1" sms="sms5" class="smsitem sms4 del5" del="del4" />
            <el-input v-model="smsCodes[5]" maxlength="1" class="smsitem sms5" del="del5" />
          </div>
          <el-input style="height: 0;width: 0; opacity: 0;" />
          <div class="el-form-item__error">
            {{ codeError || '' }}
          </div>
        </template>
      </cus-el-form>
      <div class="btn-x">
        <el-button class="cusform-btn" size="default" @click="handleRegister">
          快速注册
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import md5 from 'js-md5'
import { onKeyStroke, useEventListener } from '@vueuse/core'
import { useRouter } from 'vue-router'
import { useAutoFocus } from './hooks/useAutoFocus'
import { useRegister } from './hooks/useRegister'
import { deepCopy } from '@/utils/index'

const router = useRouter()
const componentName = defineModel()
const { autoFocus, codeboxEl } = useAutoFocus()
const {
  formRef,
  formItems,
  editForm,
  smsCodes,
  codeError,
  validateCode,
} = useRegister()

onMounted(() => {
  autoFocus()
  // 验证码-连续删除
  onKeyStroke('Backspace', (e) => {
    useEventListener(codeboxEl.value, 'input', (evt) => {
      if (!evt?.data) {
        const lastClass = evt.target.getAttribute('del')
        if (lastClass) {
          const lastEl = codeboxEl.value.querySelector(`.${lastClass}`)
          lastEl.querySelector('input').focus()
        }
      }
    })
  })
})

// 监听回车键注册
onKeyStroke('Enter', (e) => {
  e.preventDefault()
  handleRegister()
})

function handleSave() {
  const smsVcode = smsCodes.value.join('')
  if (smsVcode.length === 6)
    editForm.code = smsVcode
  const params = deepCopy(editForm)
  params.password = md5(params.password)
  delete params.passwords
  api.login.postRegister(params).then((res) => {
    if (res) {
      ElNotification({
        title: '已成功注册！',
        message: '即将跳转至登录',
        type: 'success',
        duration: 2 * 1000,
        onClose: () => {
        // appStore.userStore.refToken(res.data)
        // router.push({ path: '/project/list' })
          componentName.value = 'loginForm'
        },
      })
    }
  })
}

function handleRegister() {
  const isVali = validateCode()
  if (isVali)
    formRef.value.handleSubmit()
}
</script>

  <style lang='scss' scoped>
  .register-x {
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
</style>
