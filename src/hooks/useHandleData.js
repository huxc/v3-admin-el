/**
 *   操作单条数据信息 (二次确认【删除、禁用、启用、重置密码】)
 * @param {Function} api 操作数据接口的api方法 (必传)
 * @param {object} params 携带的操作数据参数 {id,params} (必传)
 * @param {string} message 提示信息 (必传)
 * @param {string} confirmType icon类型 (不必传,默认为 warning)
 * @param {string} successMessage 返回成功提示信息 (不必传)
 * @returns Promise
 */
export function useHandleData(handleApi, params = {}, message, confirmType = 'warning', successMsg = '操作成功') {
  return new Promise((resolve, reject) => {
    ElMessageBox.confirm(message, '温馨提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: confirmType,
      draggable: true,
    }).then(() => {
      handleApi(params).then((res) => {
        resolve(res)
        ElMessage.success({
          showClose: true,
          message: successMsg,
        })
      }, (error) => {
        return reject(error)
      })
    })
  })
}
