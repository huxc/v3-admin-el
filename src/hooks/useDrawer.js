import { createApp, h, ref } from 'vue'
import { Icon } from '@iconify/vue'
import { ElDrawer } from 'element-plus'
import { typeOf } from '@/utils'

/**
 *   js方式弹出el-drawer
 * @param {object} attrs el-drawer组件参数
 * @param {object} props el-drawer内部组件的prop参数
 * @param {componentEl} componentEl el-drawer弹出的内容(组件)
 * @param {function(done,param)} beforeClose 弹框关闭之前的回调函数 done:为关闭弹框函数，param：为内部组件的回调参数
 * @param {Function} afterClose 窗口关闭之后的回调函数
 */
export function useDrawer({ attrs = {}, props = {}, componentEl, beforeClose, afterClose }) {
  const root = document.createElement('div')
  document.body.prepend(root)
  const app = createApp({
    components: { ComponentEl: componentEl },

    /**
     * setup
     */
    setup() {
      const drawerRef = ref()
      const visible = ref(true)
      const elChild = ref(null)

      // el-dialog默认参数与传入参数合并
      const cusAttrs = Object.assign({
        ref: drawerRef,
        title: '默认标题',
        class: 'cus-drawer',
        modelValue: visible.value,
        closeOnClickModal: false,
        /**
         * 关闭
         */
        onClosed: () => {
          if (typeOf(afterClose) === 'function')
            afterClose()

          app.unmount()
          document.body.removeChild(root)
        },
      }, attrs)

      /**
       * 关闭
       */
      const done = () => {
        drawerRef.value.handleClose()
      }

      /**
       * 关闭处理事件
       */
      const onClose = (param) => {
        // 关闭之前的回调事件
        if (typeOf(beforeClose) === 'function')
          beforeClose(done, param)
        else
          done()
      }

      // 返回el-drawer组件
      return () => h(
        ElDrawer,
        cusAttrs,
        {
          /**
           * 合并参数
           */
          default: () => h(componentEl, {
            ref: elChild,
            ...props,
            onClsDwr: onClose,
          }),
        },
      )
    },
  })
  app.component('v3-icon', Icon)
  app.mount(root)
}
