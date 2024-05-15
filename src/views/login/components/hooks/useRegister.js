import { reg_password } from '@/utils/regexs.js'

/**
 * 注册
 */
export function useRegister() {
  const editForm = reactive({})
  const formRef = ref(null)
  const codeError = ref(null)
  const codeboxEl = ref(null)
  const smsCodes = ref(['', '', '', '', '', ''])
  const state = reactive({
    avatarList: [], // 头像列表
  })

  /**
   * 校验
   */
  const validateCode = () => {
    if (smsCodes.value.join('').length !== 6) {
      codeError.value = '请输入6位短信验证码'
      return false
    }
    else {
      codeError.value = null
      return true
    }
  }

  /**
   * 校验
   */
  const validatePass = (rule, value, callback) => {
    if (editForm.password === editForm.passwords)
      callback()
    else callback('确认密码不一致，请重新输入')
  }
  const formItems = [
    {
      tag: 'input',
      itemAttrs: {
        label: '用户名',
        rules: [
          { required: true, message: '请输入用户名', trigger: 'click' },
        ],
      },
      attrs: {
        key: 'userName',
        maxLength: 30,
        placeholder: '请输入用户名',
      },
    },
    {
      tag: 'input',
      itemAttrs: {
        label: '所在公司',
        rules: [
          { required: true, message: '请输入所在公司', trigger: 'click' },
        ],
      },
      attrs: {
        key: 'company',
        maxLength: 30,
        placeholder: '请输入所在公司',
      },
    },
    {
      tag: 'input',
      itemAttrs: {
        label: '输入密码',
        rules: [
          { required: true, message: '请输入密码', trigger: 'click' },
          {
            pattern: reg_password,
            message: '密码中必须同时包含数字和字母，且密码长度为8-15位',
            trigger: 'click',
          },
        ],
      },
      attrs: {
        key: 'password',
        class: 'password',
        type: 'password',
        showPassword: true,
        maxLength: '15',
        autocomplete: 'new-password',
        placeholder: '请输入密码',
      },
    },
    {
      tag: 'input',
      itemAttrs: {
        label: '确认密码',
        rules: [
          { required: true, message: '请输入密码', trigger: 'click' },
          {
            pattern: reg_password,
            message: '密码中必须同时包含数字和字母，且密码长度为8-15位',
            trigger: 'click',
          },
          { validator: validatePass, trigger: 'click' },
        ],
      },
      attrs: {
        key: 'passwords',
        class: 'password',
        type: 'password',
        showPassword: true,
        maxLength: '15',
        placeholder: '请确认密码',
      },
    },
  ]

  return {
    state,
    formItems,
    editForm,
    formRef,
    smsCodes,
    codeError,
    codeboxEl,
    validateCode,
  }
}
