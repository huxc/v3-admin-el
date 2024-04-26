import { ElLoading } from 'element-plus'

/* 全局请求 loading(服务方式调用) */
let loadingInstance
const loadList = []
export function openLoading(text = 'Loading') {
  loadingInstance = ElLoading.service({
    text,
    lock: true,
    fullscreen: true,
    background: 'rgba(0, 0, 0, 0.5)',
    // spinner: "el-icon-loading",
  })
  loadList.push(loadingInstance)
}

export function closeLoading() {
  setTimeout(() => {
    if (loadList.length > 0) {
      loadList[0].close()
	  loadList.splice(0, 1)
	   }
  }, 300)
}
