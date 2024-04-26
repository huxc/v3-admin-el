<!-- eslint-disable vue/no-deprecated-v-on-native-modifier -->
<template>
  <div class="container from-container">
    <el-form
      ref="formRef" v-bind="$attrs" :model="formModel" :inline="inline" :rules="rules"
      :label-width="labelWidth" @submit.native.prevent
    >
      <el-row :gutter="gutter">
        <template v-for="(item, index) in virtualForm">
          <template v-if="!item.hidden">
            <!-- eslint-disable vue/valid-v-for -->
            <component :is="inline ? 'span' : 'el-col'" v-if="item._ifRender" :span="item.itemAttrs && item.itemAttrs.col || 24">
              <template v-if="item._ifRender">
                <slot v-if="item.colSlot" :name="item.colSlot" :scope="$attrs.model" />
                <el-form-item
                  v-else :key="index + item.attrs.key || item.slot"
                  v-bind="item.itemAttrs || {}" :prop="item.attrs.key"
                  class="tooltip-form-item"
                >
                  <template v-if="item.attrs.tipImg || item.attrs.tipTxt" #label="{ label }">
                    <span>{{ label }}&#12288;</span>
                    <el-image
                      v-if="item.attrs.tipImg"
                      style="width: 13px; height: 13px;margin-left: 6px;"
                      :src="formTip"
                      :zoom-rate="1.2"
                      :max-scale="7"
                      :min-scale="0.2"
                      :preview-src-list="[item.attrs.tipImg]"
                      fit="cover"
                    />
                    <el-tooltip v-else effect="dark" placement="top" trigger="click">
                      <template #content>
                        {{ item.attrs.tipTxt }}
                      </template>
                      <el-image style="width: 13px; height: 13px;margin-left: 6px;cursor: pointer;" :src="formTip" />
                    </el-tooltip>
                  </template>
                  <!-- 将表单内部的数据通过作用域插槽传给外部 -->
                  <slot v-if="item.slot" :name="item.slot" :scope="formModel" />
                  <!-- 其他组件 -->
                  <template v-else>
                    <div style="display: flex;width: 100%;">
                      <span v-if="item.attrs.prefix" class="attr-prefix">{{ item.attrs.prefix }}</span>
                      <component
                        :is="item.tag" v-model="formModel[item.attrs.key]"
                        v-bind="item.attrs || {}" v-on="item.listeners || {}"
                      />
                      <span v-if="item.attrs.suffix" class="attr-suffix">{{ item.attrs.suffix }}</span>
                    </div>
                  </template>
                </el-form-item>
              </template>
            </component>
          </template>
        </template>
        <component :is="inline ? 'span' : 'el-col'" v-if="footer" :span="btnCol">
          <el-form-item>
            <slot name="buttons" />
            <el-button v-if="!!submitMsg" class="footer-btn" type="primary" @click="handleSubmit">
              {{ submitMsg }}
            </el-button>
            <el-button v-if="resetMsg" class="footer-btn" type="info" @click="handleReset(formRef)">
              {{ resetMsg }}
            </el-button>
          </el-form-item>
        </component>
      </el-row>
    </el-form>
  </div>
</template>

<script setup>
import { toReactive } from '@vueuse/core'
import { computeFormItem, elementComponent, formItemComponents } from '../cus-el-form-item/map-form-item.js'
import { cusProps } from './useProps'
import formTip from '@/assets/images/form-tip.png'

const props = defineProps(cusProps)

const emit = defineEmits(['change', 'submit', 'afterReset'])

defineOptions({
  name: 'CusForm',
  components: {
    ...elementComponent(),
    ...formItemComponents(), // 动态加载表单子控件
  },
})

const formModel = toReactive(props.model)

const formRef = ref(Symbol('form'))

// 根据formItems渲染对应的组件
const virtualForm = computed(() => {
  let _formItems = []
  _formItems = props.formItems.map((item) => {
    return computeFormItem(item, formModel)
  })
  return _formItems
})

// 表单校验
function handleSubmit() {
  if (!formRef.value)
    return
  // 验证表单中的所有项目
  formRef.value.validate((valid) => {
    if (valid) {
      try {
        emit('submit')
        return true
      }
      catch (e) {
      }
    }
    else {
      return false
    }
  })
}

function promiseSubmit(errMsg, isMsg = true) {
  return new Promise((resolve, reject) => {
    formRef.value.validate((valid) => {
      if (valid) {
        try {
          resolve(true)
        }
        catch (e) {
        }
      }
      else {
        if (isMsg) {
          ElMessage.warning({
            showClose: true,
            message: errMsg,
          })
        }
        reject(new Error('验证失败'))
      }
    })
  })
}
// 重置表单
function handleReset() {
  if (!formRef.value)
    return
  formRef.value.resetFields()
  emit('afterReset')
}

defineExpose({ handleSubmit, handleReset, promiseSubmit })
</script>

<style lang='scss' scoped>
:deep(.el-cascader),:deep(.el-select),:deep(.el-date-editor){width: 100%;}
:deep(.el-date-editor .el-input__wrapper){width: calc(100% - 22px);}
:deep(.el-form-item--default){margin-bottom:1rem; --font-size: 16px;}

.from-container{
    .attr-prefix,
    .attr-suffix{
        font-size: 14px;
        font-weight: 400;
        color: #4B5971;
        width: 15% !important;
        line-height: 48px;
    }
    .attr-prefix{
        margin-right: 13px;
    }
    .attr-suffix{
        margin-left: 13px;
    }

    .el-form {
        .el-row {
            flex-wrap: wrap;

            :deep(.tooltip-form-item) {
                .el-form-item__label {
                    align-items: center;
                }
            }
        }
    }
}
</style>
