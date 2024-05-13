/* eslint-disable jsdoc/require-description */
/**
 *
 */
export function useForm() {
  const imgCode = ref()

  const rules = {
    username: [
      { required: true, message: '用户名/手机号不能为空', trigger: 'click' },
    //   { pattern: nmb_eleven, message: '请输入正确的手机号', trigger: 'change' },
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'click' },
      //   { pattern: reg_password, message: '密码中必须同时包含数字和字母，且密码长度为8-15位', trigger: 'click' },
    ],
    code: [
      { required: true, message: '请输入验证码', trigger: 'click' },
      { validator: validateCode, trigger: 'click' },
    ],
  }

  /**
   *
   */
  function validateCode(rule, value, callback) {
    if (value === imgCode.value)
      callback()
    else
      callback('验证码错误，请重新输入')
  }
  return {
    rules,
    imgCode,
  }
}
