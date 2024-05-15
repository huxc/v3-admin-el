<template>
  <Transition
    @enter="onEnter"
    @leave="onLeave"
    @after-enter="onAfterEnter"
    @before-enter="onBeforeEnter"
    @after-leave="onAfterLeave"
    @before-leave="onBeforeLeave"
  >
    <slot />
  </Transition>
</template>

<script setup>
import { addClass, removeClass } from '@/utils/dom'

/**
 * 当进入过渡完成时调用。
 */
function onAfterLeave(el) {
  removeClass(el, 'collapse-transition')
  el.style.height = ''
  el.style.overflow = el.dataset.oldOverflow
  el.style.paddingTop = el.dataset.oldPaddingTop
  el.style.paddingBottom = el.dataset.oldPaddingBottom
}

/**
 * 在元素被插入到 DOM 之前被调用
 */
function onBeforeEnter(el) {
  addClass(el, 'collapse-transition')
  if (!el.dataset)
    el.dataset = {}

  el.dataset.oldPaddingTop = el.style.paddingTop
  el.dataset.oldPaddingBottom = el.style.paddingBottom

  el.style.height = '0'
  el.style.paddingTop = 0
  el.style.paddingBottom = 0
}

/**
 * 在元素被插入到 DOM 之后的下一帧被调用
 */
function onEnter(el) {
  el.dataset.oldOverflow = el.style.overflow
  if (el.scrollHeight !== 0) {
    el.style.height = `${el.scrollHeight}px`
    el.style.paddingTop = el.dataset.oldPaddingTop
    el.style.paddingBottom = el.dataset.oldPaddingBottom
  }
  else {
    el.style.height = ''
    el.style.paddingTop = el.dataset.oldPaddingTop
    el.style.paddingBottom = el.dataset.oldPaddingBottom
  }

  el.style.overflow = 'hidden'
}

/**
 * 当进入过渡完成时调用。
 */
function onAfterEnter(el) {
  removeClass(el, 'collapse-transition')
  el.style.height = ''
  el.style.overflow = el.dataset.oldOverflow
}

/**
 * 在 leave 钩子之前调用
 */
function onBeforeLeave(el) {
  if (!el.dataset)
    el.dataset = {}
  el.dataset.oldPaddingTop = el.style.paddingTop
  el.dataset.oldPaddingBottom = el.style.paddingBottom
  el.dataset.oldOverflow = el.style.overflow

  el.style.height = `${el.scrollHeight}px`
  el.style.overflow = 'hidden'
}

/**
 * 在离开过渡开始时调用
 */
function onLeave(el) {
  if (el.scrollHeight !== 0) {
    // 在设置高度后添加类，否则会缺失动画效果
    addClass(el, 'collapse-transition')
    el.style.height = 0
    el.style.paddingTop = 0
    el.style.paddingBottom = 0
  }
}
</script>

<style>
.collapse-transition {
  transition:
    0.3s height ease-in-out,
    0.3s padding-top ease-in-out,
    0.3s padding-bottom ease-in-out;
}
</style>
