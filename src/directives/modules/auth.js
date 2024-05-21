import { useUserStore } from '@/store/modules/user'

const userStore = useUserStore()

const auth = {
  /**
   * v-auth
   * 按钮权限控制隐藏显示
   */
  mounted(el, binding) {
    const value = binding.value || ''
    const auths = userStore.authCodes || []
    if (value !== '' && !auths.includes(value))
      el.parentNode && el.parentNode.removeChild(el)
  },
}
export default auth
