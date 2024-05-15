/* eslint-disable jsdoc/require-description */
/**
 *
 */
export function useForm() {
  const rules = {
    username: [
      { required: true, message: '用户名/手机号不能为空', trigger: 'click' },
    //   { pattern: nmb_eleven, message: '请输入正确的手机号', trigger: 'change' },
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'click' },
      //   { pattern: reg_password, message: '密码中必须同时包含数字和字母，且密码长度为8-15位', trigger: 'click' },
    ],
  }
  return {
    rules,
  }
}
