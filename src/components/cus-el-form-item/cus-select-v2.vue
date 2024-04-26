<template>
  <el-select-v2 v-bind="$attrs" :value="defaultValue" :multiple="multiple" />
</template>

<script>
export default {
  name: 'CusSelectV2',
  props: {
    defaultValue: {
      type: [String, Number],
      default: '',
    },
    multiple: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
