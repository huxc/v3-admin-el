<!-- 修改el-dialog 为局部全屏弹出，以父元素的position: relative决定dialog位置 -->
<template>
  <div class="cus-full-dialog">
    <el-dialog v-bind="$attrs" v-model="visible" fullscreen :close-on-click-modal="false">
      <slot />
    </el-dialog>
  </div>
</template>

<script setup name="cus-dialog">
import { useVModel } from '@vueuse/core'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits([
  'update:modelValue',
])

const visible = useVModel(props, 'modelValue', emit)
</script>

<style lang='scss' scoped>
.cus-full-dialog {
    :deep(.el-overlay) {
        position: absolute;
        .el-overlay-dialog {
            position: absolute;
        }

        .el-dialog.is-fullscreen {
            border-radius: 0;

            .el-dialog__header {
                border-bottom: 0;
                background-color: #ffffff;

                .el-dialog__title {
                    font-size: 16px;
                    color: #303133;
                }
            }
            .el-dialog__body{
                padding: 0 20px;
            }
        }
    }
}
</style>
