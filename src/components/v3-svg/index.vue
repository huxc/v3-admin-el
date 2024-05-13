<template>
  <svg :style="iconStyle" aria-hidden="true">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script setup>
const props = defineProps({
  prefix: {
    type: String,
    default: 'icon',
  },
  name: {
    type: String,
    required: true,
  },
  iconStyle: {
    type: Object,
    /**
     * 图标样式
     */
    default: () => ({ width: '100px', height: '100px' }),
  },
})

const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>
