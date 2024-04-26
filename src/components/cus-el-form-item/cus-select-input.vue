<template>
  <div class="sinput-x" v-bind="$attrs">
    <el-select v-model="select" style="width: 40%;">
      <el-option v-for="item in $attrs.options" :key="item[value]" :label="item[label]" :value="item[value]" />
    </el-select>
    <el-input v-model="input" class="sinput-input" />
  </div>
</template>

<script setup name="cus-select-input">
const props = defineProps({
  label: {
    type: String,
    default: 'label',
  },
  value: {
    type: String,
    default: 'value',
  },
  select: {
    type: String,
    default: '',
  },
  input: {
    type: String,
    default: '',
  },
  isReset: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['onKeyCg'])

const input = ref(props.input || '')
const select = ref(props.select)
// 默认值
emit('onKeyCg', select.value, input.value)
watch([select, input], (newValue, oldValue) => {
  setTimeout(() => {
    const [key, value] = newValue
    emit('onKeyCg', key, value, oldValue[0])
  })
  // if (!newValue.includes('')) {
  //   setTimeout(() => {
  //     const [key, value] = newValue
  //     emit('onKeyCg', key, value, oldValue[0])
  //   }, 2000)
  // }
})
const attrs = useAttrs()
// 清空
watch(() => props.isReset, () => {
  emit('onKeyCg', props.select, '', select.value)
  input.value = ''
  select.value = attrs.options[0][props.value]
})
</script>

<style scoped>
    .sinput-x{
        display: flex;
        width: 280px;
    }
    .sinput-input{
        width: 60%;
        margin-left: 10px;
    }
</style>
