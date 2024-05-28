/* eslint-disable jsdoc/require-description */

/**
 *
 */
export function useForm() {
  const editForm = reactive({
    status: 1,
    avatar: 'http://dummyimage.com/100x100',
    created_at: '2007-08-18 01:50:33',
    updated_at: '2007-08-18 01:50:33',
  })
  const formRef = ref()
  const formItems = [
    {
      tag: 'input',
      itemAttrs: {
        label: '姓名',
        rules: [
          { required: true, message: '不能为空', trigger: 'click' },
        ],
      },
      attrs: {
        key: 'name',
        placeholder: '请输入姓名',
      },
    },
    {
      tag: 'input',
      itemAttrs: {
        label: '性别',
        rules: [
          { required: true, message: '不能为空', trigger: 'click' },
        ],
      },
      attrs: {
        key: 'gender',
        placeholder: '请输入年龄',
      },
    },
    {
      tag: 'input',
      itemAttrs: {
        label: '年龄',
        rules: [
          { required: true, message: '不能为空', trigger: 'click' },
        ],
      },
      attrs: {
        key: 'age',
        placeholder: '请输入年龄',
      },
    },
    {
      tag: 'input',
      itemAttrs: {
        label: '身份证',
        rules: [
          { required: true, message: '不能为空', trigger: 'click' },
        ],
      },
      attrs: {
        key: 'id_card',
        placeholder: '请输入身份证',
      },
    },
    {
      tag: 'input',
      itemAttrs: {
        label: '邮箱',
        rules: [
          { required: true, message: '不能为空', trigger: 'click' },
        ],
      },
      attrs: {
        key: 'email',
        placeholder: '请输入身份证',
      },
    },
    {
      tag: 'input',
      itemAttrs: {
        label: '地址',
        rules: [
          { required: true, message: '不能为空', trigger: 'click' },
        ],
      },
      attrs: {
        key: 'address',
        placeholder: '请输入身份证',
      },
    },
  ]
  return {
    formRef,
    editForm,
    formItems,
  }
}
