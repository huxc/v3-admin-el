<template>
  <el-checkbox-group v-bind="$attrs" :value="value">
    <el-checkbox
      v-for="item in $attrs.options"
      :key="item.value + item.label"
      :disabled="item.disabled"
      :label="item.value || item.label"
    >
      {{ item.label }}
    </el-checkbox>
  </el-checkbox-group>
</template>

<script>
export default {
  name: 'CusCheckboxGroup',
  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
