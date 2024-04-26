/**
 * @description 批量导入
 * @param {Function} importApi 导入接口 (必传)
 * @param {URL} templateApi 下载模板接口 (必传)
 * @param {Function} callbackFu 导入成功后的回调函数
 * */

import { typeOf } from '@/utils'
import { useDialog } from '@/hooks/useDialog'
import ExportDialog from '@/views/components/export-dialog/index.vue'

export function useExports(importApi, templateApi, params, callbackFu) {
  useDialog({
    componentEl: ExportDialog,
    attrs: { title: '批量导入', width: '600px' },
    props: { importApi, templateApi, params },
    beforeClose: (done) => {
      done()
      ElMessage.success('导入成功')
      if (typeOf(callbackFu) === 'function')
        callbackFu()
    },
  })
}
