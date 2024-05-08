import { createApp, h, ref } from 'vue'
import { Icon } from '@iconify/vue'
import { isObjEmpty, typeOf } from '@/utils'

/**
 * @description js方式弹出el-dialog
 * @param {object} attrs el-dialog组件参数
 * @param {object} props el-dialog内部组件的prop参数
 * @param {object} footer 底部取消/确认按钮 (若为空对象则不显示) 按钮文字：okText(默认‘确定’)，cancelText(默认‘取消’)
 * @param {componentEl} componentEl el-dialog弹出的内容(组件)
 * @param {function(done,param)} beforeClose 弹框关闭之前的回调函数 done:为关闭弹框函数，param：为内部组件的回调参数
 * @param {Function} afterClose 窗口关闭之后的回调函数
 */

export function useDialog({ attrs = {}, props = {}, footer = {}, componentEl, beforeClose, afterClose }) {
  const root = document.createElement('div')
  document.body.prepend(root)

  const app = createApp({
    components: {
      ComponentEl: componentEl
     },

    setup() {
      let bcParam = null
      const dialogRef = ref()
      const visible = ref(true)
      const elChild = ref(null)

      // el-dialog默认参数与传入参数合并
      const dialogAttrs = Object.assign(
        {
          ref: dialogRef,
          title: '默认标题',
          class: 'cus-dialog',
          modelValue: visible.value,
          closeOnClickModal: false,
          onClosed: () => {
            if (typeOf(afterClose) === 'function')
              afterClose(bcParam)

            app.unmount()
            document.body.removeChild(root)
          },
        },
        attrs,
      )

      const done = () => {
        dialogRef.value.visible = false
      }

      // 弹框关闭之前的回调函数
      const onClose = (param) => {
        bcParam = param
        if (typeOf(beforeClose) === 'function')
          beforeClose(done, param)
        else
          done()
      }

      // 确认事件
      const onConfirm = () => {
        if (typeOf(elChild.value.expose_fn) === 'function')
          elChild.value.expose_fn()
        else
          onClose()
      }
      // 根据参数渲染底部插槽
      const footerDom = !isObjEmpty(footer)
        ? () =>
            h(
              'div',
              {
                style: {
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              },
              [
                h(
                  ElButton,
                  { onClick: done },
                  () => footer.cancelText || '取消',
                ),
                h(
                  ElButton,
                  { onClick: onConfirm, type: 'primary' },
                  () => footer.okText || '确定',
                ),
              ],
            )
        : null

      const divStyle = {
        maxHeight: !isObjEmpty(footer) ? '50vh' : '65vh',
        viewStyle: { overflowX: 'hidden' },
      }
      // 返回el-dialog组件
      return () =>
        h(ElDialog, dialogAttrs, {
          default: () =>
            h(ElScrollbar, divStyle, () =>
              h(componentEl, {
                ref: elChild,
                ...props,
                onClsDlg: onClose,
              }),),
          //   header: headerDom,
          footer: footerDom,
        })
    },
  })
  app.component('v3-icon', Icon)
  app.mount(root)
}
