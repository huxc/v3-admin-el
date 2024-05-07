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
    default: () => ({}) 
  }
})

const emit = defineEmits(['clsDwr'])

const { formItems, editForm, formRef } = useForm()

onMounted(() => {
  setTimeout(() => {
    Object.assign(editForm, props.oldForm)
  }, 2000)
})

function onSubmit() {
  emit('clsDwr', true)
}

function expose_fn() {
  formRef.value.promiseSubmit().then(() => {
    emit('clsDwr', true)
  })
}

defineExpose({
  expose_fn
})
</script>
