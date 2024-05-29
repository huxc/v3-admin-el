<template>
  <div class="hello">
    <v3-form ref="formRef" footer :model="editForm" :form-items="formItems" @submit="onSubmit" />
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
  Object.assign(editForm, props.oldForm)
})

/**
 * 提交
 */
function onSubmit() {
  formRef.value.promiseSubmit().then(() => {
    const apiRes = editForm.id
      ? api_user_patchCustomers
      : api_user_postCustomers

    apiRes(editForm).then(() => {
      emit('clsDwr')
    })
  })
}
</script>
