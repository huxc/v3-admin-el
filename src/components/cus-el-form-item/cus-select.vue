<template>
  <el-select v-bind="$attrs" :value="defaultValue" :multiple="multiple">
    <el-option
      v-for="item in $attrs.options"
      :key="item[value] + item[label]"
      :label="item[label]"
      :value="item[value]"
      :disabled="item.disabled"
    />
  </el-select>
</template>

<script>
export default {
  name: 'CusSelect',
  props: {
    defaultValue: {
      type: [String, Number],
      default: '',
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: 'label',
    },
    value: {
      type: String,
      default: 'value',
    },
  },
}
</script>
