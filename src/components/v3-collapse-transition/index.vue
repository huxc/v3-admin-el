<template>
  <div ref="collapseRef" class="clsBox">
    <div class="clsBox_over" :class="{ clsBox_over_max: isOver }">
      <div ref="collapseMain" class="clsBox_main">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  // 是否开启折叠功能
  collapse: {
    type: Boolean,
    default: false,
  },
  // 是否默认折叠
  defaultOver: {
    type: Boolean,
    default: true,
  },
  // 是否监听超过高度动态折叠
  isListener: {
    type: Boolean,
    default: true,
  },
  // 折叠后的高度
  collapseHeight: {
    type: Number,
    default: 100,
  },
})

const collapseRef = ref()
const collapseMain = ref()

const mainHeight = ref(0)
const isOver = ref(false)

const clpHeightPx = computed(() => `${props.collapseHeight}px`)
const mainHeightPx = computed(() => mainHeight.value > 0 ? `${mainHeight.value}px` : '')

onMounted(() => {
  if (props.collapse && !props.defaultOver)
    isOver.value = true

  setTimeout(() => {
    mainHeight.value = collapseMain.value.offsetHeight
  }, 200)

  if (props.isListener)
    window.addEventListener('resize', changeSize)
})

onBeforeUnmount(() => {
  if (props.isListener)
    window.removeEventListener('resize', changeSize)
})

/**
 * 初始化宽度/高度/是否折叠
 */
function changeSize() {
  setTimeout(() => {
    mainHeight.value = collapseMain.value.offsetHeight
    if (props.isListener)
      isOver.value = mainHeight.value > props.collapseHeight
  }, 300)
}

/**
 * 根据传值是隐藏显示
 */
function handleCollapse(visible) {
  changeSize()
  setTimeout(() => {
    isOver.value = visible
  }, 300)
}

// 暴露给父组件
defineExpose({
  handleCollapse,
})
</script>

  <style lang="scss" scoped>
  $overHight: 15px;

.clsBox {
  width: 100%;
  .clsBox_over {
    overflow: hidden;
    position: relative;
    height: v-bind(mainHeightPx);
    transition: all 0.4s ease;
  }
  .clsBox_over_max {
    height: v-bind(clpHeightPx) !important;
  }
  .clsBox_main {
    width: 100%;
  }
}
</style>
