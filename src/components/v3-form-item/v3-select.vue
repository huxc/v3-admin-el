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
    default: () => ({
      label: 'label',
      value: 'value',
      disabled: 'disabled',
    })
  },
})

const value = defineModel()
</script>
