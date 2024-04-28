<template>
  <el-radio-group v-bind="$attrs" v-model="value" style="line-height:40px">
    <el-radio
      v-for="option in $attrs.options"
      :key="`${option[subProps.value]}${option[subProps.label]}`"
      :value="option[subProps.value]"
      :disabled="option[subProps.disabled] || false"
    >
      {{ option[subProps.label] }}
    </el-radio>
  </el-radio-group>
</template>

<script setup name="v3-radio-group">
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
