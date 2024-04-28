<template>
  <el-checkbox-group v-bind="$attrs" v-model="value">
    <el-checkbox
      v-for="option in $attrs.options"
      :key="`${option[subProps.value]}${option[subProps.label]}`"
      :label="option[subProps.label]"
      :value="option[subProps.value]"
      :disabled="option[subProps.disabled] || false"
    >
      {{ option[subProps.label] }}
    </el-checkbox>
  </el-checkbox-group>
</template>

<script setup name="v3-checkbox-group">
defineProps({
  subProps: {
    type: Object,
    default: () => ({
      label: 'label',
      value: 'value',
      disabled: 'disabled',
    }),
  }
})

const value = defineModel()
</script>
