import { useEventListener } from '@vueuse/core'

export function useAutoFocus() {
  const codeboxEl = ref(null)
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
