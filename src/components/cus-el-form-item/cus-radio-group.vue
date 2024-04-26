<template>
  <el-radio-group v-bind="$attrs" :value="value" style="line-height:40px">
    <el-radio
      v-for="item in $attrs.options"
      :key="item.value"
      :label="item.value"
      :disabled="item.disabled"
    >
      {{ item.label }}
    </el-radio>
  </el-radio-group>
</template>

<script>
export default {
  name: 'CusRadioGroup',
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
  },
}
</script>
