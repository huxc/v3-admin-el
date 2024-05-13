<template>
  <div class="hello">
    <v3-form ref="formRef" footer :model="editForm" :form-items="formItems" @submit="onSubmit" />
    <p style="color:red;text-align:center">
      上方的的提交，重置按钮 通过footer进行隐藏显示
    </p>
  </div>
</template>

<script setup name="example-form">
import { useForm } from './hooks/useForm'

const props = defineProps({
  oldForm: {
    type: Object,
    /**
     * 表单赋值对象
     */
    default: () => ({}),
  },
})

const emit = defineEmits(['clsDwr', 'clsDlg'])

const { formItems, editForm, formRef } = useForm()

onMounted(() => {
  setTimeout(() => {
    Object.assign(editForm, props.oldForm)
  }, 2000)
})

/**
 * 提交
 */
function onSubmit() {
  emit('clsDwr', { a: 1, b: 2 })
  emit('clsDlg', { a: 1, b: 2 })
}

/**
 * 导出给弹窗确定按钮使用
 */
function expose_fn() {
  formRef.value.promiseSubmit().then(() => {
    emit('clsDwr', { a: 1, b: 2 })
    emit('clsDlg', { a: 1, b: 2 })
  })
}

defineExpose({
  expose_fn,
})
</script>
