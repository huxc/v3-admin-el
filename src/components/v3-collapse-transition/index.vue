<template>
  <div ref="collapseRef" class="collapse_box">
    <div
      class="collapse_box_over"
      :class="{ collapse_box_over_max: isOver }"
    >
      <div ref="collapseMain" class="collapse_box_main">
        <slot />
      </div>
      <!-- <div v-if="isOverBtn" class="collapse_box_over_show">
        <div class="collapse_box_over_btn" @click="onCollapse">
          <v3-icon class="svg" :class="{ svg_rotate: !isOver }" icon="clarity:collapse-line" />
        </div>
      </div> -->
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  // 是否折叠
  defaultOver: {
    type: Boolean,
    default: false,
  },
  // 是否监听超过高度动态折叠
  isListener: {
    type: Boolean,
    default: true,
  },
  isOverBtn: {
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

const clpHeightPx = computed(() => `${props.collapseHeight}px`)
const mainHeightPx = computed(() => mainHeight.value > 0 ? `${mainHeight.value}px` : '')

/**
 * 初始化宽度/高度/是否折叠
 */
function changeSize() {
  boxWidth.value = collapseRef.value.offsetWidth
  mainHeight.value = collapseMain.value.offsetHeight // + 15
  if (initOver.value)
    isOver.value = mainHeight.value > props.collapseHeight

  initOver.value = true
}

/**
 * 切换隐藏显示
 */
function onCollapse() {
  isOver.value = !isOver.value
  return isOver.value
}

/**
 * 根据传值是隐藏显示
 */
function handleCollapse(visible) {
  isOver.value = visible
  return visible
}

// 暴露给父组件
defineExpose({
  onCollapse,
  handleCollapse,
})
</script>

<style lang="scss" scoped>
$overHight: 15px;

.collapse_box {
  width: 100%;
  .collapse_box_over {
    overflow: hidden;
    position: relative;
    height: v-bind(mainHeightPx);
    transition: all 0.4s ease;
  }
  .collapse_box_over_max {
    height: v-bind(clpHeightPx) !important;
  }
  .collapse_box_main {
    width: 100%;
  }
  .collapse_box_over_show {
    height: $overHight;
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
  }
  .collapse_box_over_btn {
    width: 20px;
    height: $overHight;
    cursor: pointer;
    text-align: center;
    line-height: $overHight;
    margin: 0 auto;
    svg {
      font-size: 20px;
      color: var(--el-color-primary);
      transform: rotate(180deg);
      transition: all 0.4s ease;
    }
    &:hover {
      color: var(--el-color-primary-light-3);
    }
  }
  .svg_rotate.svg {
    transform: rotate(0deg);
  }
}
</style>
