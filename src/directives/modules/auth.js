import appStore from '@/store/index.js'

const auth = {
  /**
   * v-auth
   * 按钮权限控制隐藏显示
   */
  mounted(el, binding) {
    const value = binding.value || ''
    const auths = appStore.userStore.authCodes || []
    if (value !== '' && !auths.includes(value))
      el.parentNode && el.parentNode.removeChild(el)
  },
}
export default auth
