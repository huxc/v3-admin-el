<template>
  <div class="hello">
    <v3-form ref="formRef" :model="editForm" :form-items="formItems" />
  </div>
</template>

<script setup name="example-form">
import { useForm } from './hooks/useForm'

const props = defineProps({
  oldForm: { type: Object, default: () => ({}) },
})

const emit = defineEmits(['clsDlg'])

const { formItems, editForm, formRef } = useForm()

onMounted(() => {
  setTimeout(() => {
    Object.assign(editForm, props.oldForm)
  }, 2000)
})

function _expose_fn() {
  formRef.value.submit().then(() => {
    emit('clsDlg', true)
  })
}

defineExpose({
  _expose_fn
})
</script>
