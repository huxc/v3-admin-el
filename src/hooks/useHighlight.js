// 点击el-dialog或el-drawer的遮罩层高亮 弹窗框的border

import gsap from 'gsap'

export const idKey = 'cus_highlight'

function eventDarwer(event) {
  const el = event.target
  if (el.className === 'el-overlay') {
    const tl = gsap.timeline()
    tl.to('.cus-drawer.open', {
      boxShadow: '0 0 20px 5px #f00',
    })
    tl.to('.cus-drawer.open', {
      boxShadow: '0 0 15px 5px #FC7100',
    })
    tl.to('.cus-drawer.open', {
      boxShadow: '0 0 10px 3px #f00',
    })
    tl.to('.cus-drawer.open', {
      boxShadow: '0 0 0px 0px #FC7100',
    })
    tl.yoyo(true)
  }
}

export function addDrawerListener() {
  document.getElementById(idKey).addEventListener('click', eventDarwer, true)
}

export function removeDrawerListener() {
  document.getElementById(idKey).removeEventListener('click', eventDarwer)
}
