<template>
  <el-select ref="selectRef" v-bind="$attrs" :value="defaultValue" @change="handleCg">
    <template #default>
      <el-option
        v-for="item in $attrs.options"
        :key="item[value] + item[label]"
        class="select-icon"
        :label="item[label]"
        :value="item[value]"
      >
        <img class="icon" :src="item[url]">
        <span>{{ item[label] }}</span>
      </el-option>
    </template>
    <template #prefix>
      <img v-show="!!imgUrl" class="icon" :src="imgUrl" width="30">
    </template>
  </el-select>
</template>

<script setup name="CusSelectImg">
const props = defineProps({
//   modelValue: String,
  defaultValue: {
    type: [String, Number],
    default: '',
  },
  label: {
    type: String,
    default: 'label',
  },
  value: {
    type: String,
    default: 'value',
  },
  url: {
    type: String,
    default: 'value',
  },
})

const selectRef = ref(null)
const attrs = useAttrs()
const imgUrl = ref(null)

watch(() => attrs.modelValue, (val) => {
  handleCg(val)
})

function handleCg(value) {
  const option = attrs.options?.find(item => item[props.value] === value)
  imgUrl.value = option && option[props.url]
}
</script>

  <style lang='scss' scoped>
  .select-icon {
    display: flex;
    flex-direction: row;
    align-items: center;
    .icon {
      height: 30px;
      margin-right: 10px;
    }
  }
  </style>
