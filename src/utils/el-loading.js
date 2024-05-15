/* 全局请求 loading(服务方式调用) */
let loadingInstance

const loadList = []

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
  loadList.push(loadingInstance)
}

/**
 * 关闭loading
 */
export function closeLoading() {
  setTimeout(() => {
    if (loadList.length > 0) {
      loadList[0].close()
      loadList.splice(0, 1)
    }
  }, 300)
}
