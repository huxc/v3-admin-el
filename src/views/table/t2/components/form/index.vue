<template>
  <div class="hello">
    <v3-form ref="formRef" :model="editForm" :form-items="formItems" @submit="onSubmit" />
  </div>
</template>

<script setup name="example-form">
import { useForm } from './useFormJson.js'

const props = defineProps({
  oldForm: {
    type: Object,
    /**
     * 默认值
     */
    default: () => ({}),
  },
})

const emit = defineEmits(['clsDlg'])

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
      emit('clsDlg')
    })
  })
}

defineExpose({
  expose_fn: onSubmit,
})
</script>
