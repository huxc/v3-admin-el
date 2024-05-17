<template>
  <div ref="collapseRef" class="collapse_box">
    <div
      class="collapse_box_over"
      :class="{ collapse_box_over_max: isOver }"
    >
      <div ref="collapseMain" class="collapse_box_main">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  // 默认是否展开
  defaultOver: {
    type: Boolean,
    default: false,
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

const boxWidth = ref(0)
const mainHeight = ref(0)
const isOver = ref(false)
const initOver = ref(props.defaultOver)

onMounted(() => {
  changeSize(props.defaultOver)
  if (props.isListener)
    window.addEventListener('resize', changeSize)
})

onBeforeUnmount(() => {
  if (props.isListener)
    window.removeEventListener('resize', changeSize)
})

const clpHeightPx = computed(
  () => `${props.collapseHeight}px`,
)

/**
 * 初始化宽度/高度/是否折叠
 */
function changeSize() {
  // setTimeout处理页面渲染完成后计算
  setTimeout(() => {
    boxWidth.value = collapseRef.value.offsetWidth
    mainHeight.value = collapseMain.value.offsetHeight
    if (!initOver.value)
      isOver.value = mainHeight.value > props.collapseHeight

    initOver.value = false
  }, 500)
}

/**
 * 根据传值隐藏显示
 */
function handleCollapse(visible) {
  isOver.value = visible
}

// 暴露给父组件
defineExpose({
  handleCollapse,
})
</script>

<style lang="scss" scoped>
.collapse_box {
  width: 100%;
  .collapse_box_over {
    overflow: hidden;
    position: relative;
    // height: v-bind(mainHeightPx);
    transition: all 0.4s ease;
  }
  .collapse_box_over_max {
    height: v-bind(clpHeightPx) !important;
  }
  .collapse_box_main {
    width: 100%;
  }
}
</style>
