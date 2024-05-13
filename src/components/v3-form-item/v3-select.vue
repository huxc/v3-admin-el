<template>
  <el-select v-bind="$attrs" v-model="value">
    <el-option
      v-for="option in $attrs.options"
      :key="`${option[subProps.value]}${option[subProps.label]}`"
      :label="option[subProps.label]"
      :value="option[subProps.value]"
      :disabled="option[subProps.disabled] || false"
    />
  </el-select>
</template>

<script setup name="v3-select">
defineProps({
  subProps: {
    type: Object,
    /**
     *设置默认的label，value，disabled的显示字段
     */
    default: () => ({
      label: 'label',
      value: 'value',
      disabled: '',
    }),
  },
})

const value = defineModel()
</script>
