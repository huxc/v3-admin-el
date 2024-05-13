import { useEventListener } from '@vueuse/core'

/**
 * 自动获取交代你
 */
export function useAutoFocus() {
  const codeboxEl = ref(null)
  /**
   * 等
   */
  const autoFocus = () => {
    useEventListener(codeboxEl.value, 'input', (evt) => {
      if (evt?.data?.length === 1) {
        const nextClass = evt.target.getAttribute('sms')
        if (nextClass) {
          const nextEl = codeboxEl.value.querySelector(`.${nextClass}`)
          nextEl.querySelector('input').focus()
        }
      }
    })
  }

  return {
    autoFocus,
    codeboxEl,
  }
}
