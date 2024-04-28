<template>
  <div class="hello">
    <v3-form ref="formRef" :model="editForm" :form-items="formItems" @submit="handleSave" />
  </div>
</template>

<script setup name="example-form">
import { useForm } from './hooks/useForm'

const props = defineProps({
  oldForm: { type: Object, default: () => ({}) },
})

const emit = defineEmits(['closeDialog'])

const { formItems, editForm, formRef } = useForm()

onMounted(() => {
  setTimeout(() => {
    Object.assign(editForm, props.oldForm)
  }, 2000)
})

function fromValidate() {
  formRef.value.submit().then(() => {
    emit('closeDialog', true)
  })
}

defineExpose({
  fromValidate
})
</script>
