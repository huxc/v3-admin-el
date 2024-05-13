import { nmb_eleven, reg_password } from '@/utils/regexs.js'

/**
 * 重置
 */
export function useReset() {
  const codeError = ref('')
  const editForm = reactive({})
  const smsCodes = ref(['', '', '', '', '', ''])

  /**
   * 短信
   */
  const validateCode = () => {
    if (smsCodes.value.join('').length !== 6)
      codeError.value = '请输入6位短信验证码'
    else
      codeError.value = null
  }

  /**
   * 校验
   */
  const validatePass = (rule, value, callback) => {
    if (editForm.password === editForm.passwords)
      callback()
    else
      callback('确认密码不一致，请重新输入')
  }

  const formItems = [
    {
      tag: 'phonecode',
      itemAttrs: {
        label: '手机号码',
        rules: [
          { required: true, message: '请输入手机号', trigger: 'click' },
          { pattern: nmb_eleven, message: '手机号不准确', trigger: 'click' },
        ],
      },
      attrs: {
        key: 'phone',
        typeCode: 1,
        maxLength: '11',
        placeholder: '请输入手机号码',
      },
    },
    {
      slot: 'phoneCode',
      itemAttrs: {
        label: '短信验证码',
      },
    },
    {
      tag: 'input',
      itemAttrs: {
        label: '输入新密码',
        rules: [
          { required: true, message: '请输入密码', trigger: 'click' },
          { pattern: reg_password, message: '密码中必须同时包含数字和字母，且密码长度为8-15位', trigger: 'click' },
        ],
      },
      attrs: {
        key: 'password',
        class: 'password',
        type: 'password',
        showPassword: true,
        maxLength: '16',
        autocomplete: 'new-password',
        placeholder: '请输入密码',
      },
    },
    {
      tag: 'input',
      itemAttrs: {
        label: '确认新密码',
        rules: [
          { required: true, message: '请输入密码', trigger: 'click' },
          { pattern: reg_password, message: '密码中必须同时包含数字和字母，且密码长度为8-15位', trigger: 'click' },
          { validator: validatePass, trigger: 'click' },
        ],
      },
      attrs: {
        key: 'passwords',
        class: 'password',
        type: 'password',
        showPassword: true,
        maxLength: '16',
        autocomplete: 'new-password',
        placeholder: '请确认密码',
      },
    },

  ]

  return {
    formItems,
    smsCodes,
    codeError,
    editForm,
    validateCode,
  }
}
