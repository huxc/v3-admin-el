import { createApp, h, ref } from 'vue'
import { isObjEmpty, typeOf } from '@/utils'

/**
 * @description js方式弹出el-dialog
 * @param {object} attrs el-dialog组件参数
 * @param {object} props el-dialog内部组件的prop参数
 * @param {object} footer 底部取消/确认按钮 (若为空对象则不显示) 按钮文字：okText(默认‘确定’)，cancelText(默认‘取消’)
 * @param {componentEl} componentEl el-dialog弹出的内容(组件)
 * @param {function(done,param)} beforeClose 弹框关闭之前的回调函数 done:为关闭弹框函数，param：为内部组件的回调参数
 * @param {function} afterClose 窗口关闭之后的回调函数
 */

export function useDialog({
  attrs = {},
  props = {},
  footer = {},
  componentEl,
  beforeClose,
  afterClose,
}) {
  const root = document.createElement('div')
  document.body.prepend(root)

  const app = createApp({
    components: { ComponentEl: componentEl },

    setup() {
      const dialogRef = ref()
      const visible = ref(true)
      const elChild = ref(null)

      // el-dialog默认参数与传入参数合并
      const dialogAttrs = Object.assign(
        {
          ref: dialogRef,
          title: '默认标题',
          class: 'cus-dialog',
          modelValue: visible,
          closeOnClickModal: false,
          onClosed: () => {
            if (typeOf(afterClose) === 'function')
              afterClose()

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
      const handleClose = (param) => {
        if (typeOf(beforeClose) === 'function')
          beforeClose(done, param)
        else dialogRef.value.visible = false
      }

      // 确认事件
      const handleConfirm = () => {
        if (typeOf(elChild.value.onClsBack) === 'function')
          elChild.value.onClsBack()
        else handleClose()
      }
      // 自定义头部样式
      //   const headerDom = () => h('div', {
      //     style: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'red' }
      //   }, [
      //     h('div', {}, 'nihao')
      //   ])
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
                  { onClick: handleConfirm, type: 'primary' },
                  () => footer.okText || '确定',
                ),
              ],
            )
        : null

      const divStyle = {
        maxHeight: '70vh',
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
                onClsDialog: handleClose,
              }),
            ),
          //   header: headerDom,
          footer: footerDom,
        })
    },
  })
  app.mount(root)
}
