<template>
  <el-input v-model="modelValue" class="input-view_pwd">
    <template #suffix>
      <el-button type="primary" text size="default" :disabled="isCodeBtnDisable" @click="handleCode">
        {{ codeBtnWord }}
      </el-button>
    </template>
  </el-input>
</template>

<script setup>
import { defineModel, onUnmounted } from 'vue'

const props = defineProps({
  typeCode: {
    type: String,
    default: '0',
  },
})

let timer = null
let waitTime = 60
const modelValue = defineModel()
const codeBtnWord = ref('      获取验证码')
// const codeBtnWord = ref('60s 后重新发送')
const isCodeBtnDisable = ref(false)

function handleCode() {
  if (modelValue.value?.length === 11) {
    const params = {
      phone: modelValue.value,
      type: props.typeCode,
    }
    api.login.getCaptchaSms(params).then(() => {
      getCodeBack()
    })
  }
  else {
    ElMessage({
      showClose: true,
      message: '请输入正确的手机号码',
      type: 'error',
      duration: 3 * 1000,
    })
  }
}

function getCodeBack() {
  waitTime--
  isCodeBtnDisable.value = true
  codeBtnWord.value = `${waitTime}s 后重新发送`

  timer = setInterval(() => {
    if (waitTime > 1) {
      waitTime--
      codeBtnWord.value = `${waitTime}s 后重新发送`
    }
    else {
      clearInterval(timer)
      codeBtnWord.value = '获取验证码'
      isCodeBtnDisable.value = false
      waitTime = 60
    }
  }, 1000)
}

onUnmounted(() => {
  if (timer)
    clearInterval(timer)
})
</script>

  <style lang='scss' scoped>
  :deep(.el-input__suffix-inner){
          width: 130px;
          justify-content: end;
  }
  :deep(.el-input__inner){
      width: 268px !important;
  }
  </style>
