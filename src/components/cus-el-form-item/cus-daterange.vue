<template>
  <el-date-picker
    v-model="dateValue"
    v-bind="$attrs"
    :type="timeType"
    range-separator="至"
    start-placeholder="开始时间"
    end-placeholder="截止时间"
  />
</template>

<script setup name="cus-daterange">
import { useVModels } from '@vueuse/core'

const props = defineProps({
  start: {
    type: String,
    default: '',
  },
  end: {
    type: String,
    default: '',
  },
  isReset: {
    type: Boolean,
    default: false,
  },
  timeType: {
    type: String,
    default: 'daterange',
  },
})

const emit = defineEmits(['update:start', 'update:end'])

const { start, end } = useVModels(props, emit)
// 展示默认值
const defaultValue = ref([start.value, end.value])
const dateValue = computed({
  get() {
    return defaultValue.value
  },
  set(val) {
    if (val) {
      start.value = val[0]
      end.value = val[1]
      defaultValue.value = val
    }
    else { // 清空
      start.value = ''
      end.value = ''
      defaultValue.value = ['', '']
    }
  },
})

// 清空
watch(() => props.isReset, () => {
  start.value = ''
  end.value = ''
  defaultValue.value = []
})
</script>
