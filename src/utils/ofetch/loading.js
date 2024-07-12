/* 全局请求 loading(服务方式调用) */
let loadingInstance

/**
 * 打开loading
 */
export function openLoading(text = 'Loading') {
  loadingInstance = ElLoading.service({
    text,
    lock: true,
    fullscreen: true,
    background: 'rgba(0, 0, 0, 0.3)',
  })
}

/**
 * 关闭loading
 */
export function closeLoading() {
  if (loadingInstance) {
    setTimeout(() => {
      loadingInstance.close()
    }, 200)
  }
}
