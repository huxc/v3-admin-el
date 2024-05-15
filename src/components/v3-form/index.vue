<!-- eslint-disable vue/no-deprecated-v-on-native-modifier -->
<template>
  <el-form
    ref="formRef" :inline :rules :label-width v-bind="$attrs" :model="formModel" @submit.native.prevent
  >
    <el-row :gutter="gutter" style="margin: 0 !important;">
      <template v-for="(item, index) in virtualForm">
        <template v-if="!item.hidden">
          <!-- eslint-disable vue/valid-v-for -->
          <component
            :is="inline ? 'span' : 'el-col'" v-if="item._ifRender"
            :span="item.itemAttrs?.col || 24"
          >
            <template v-if="item._ifRender">
              <slot v-if="item.colSlot" :name="item.colSlot" :scope="$attrs.model" />
              <el-form-item
                v-else :key="index + item.attrs.key || item.slot"
                v-bind="item.itemAttrs || {}" :prop="item.attrs.key" class="tooltip-form-item"
              >
                <!-- 将表单内部的数据通过作用域插槽传给外部 -->
                <slot v-if="item.slot" :name="item.slot" :scope="formModel" />
                <!-- 其他组件 -->
                <template v-else>
                  <div style="display: flex;width: 100%;">
                    <span v-if="item.attrs.prefix" class="attr-prefix">{{ item.attrs.prefix
                    }}</span>
                    <component
                      :is="item.tag" v-model="formModel[item.attrs.key]"
                      v-bind="item.attrs || {}" v-on="item.listeners || {}"
                    />
                    <span v-if="item.attrs.suffix" class="attr-suffix">{{ item.attrs.suffix
                    }}</span>
                  </div>
                </template>
              </el-form-item>
            </template>
          </component>
        </template>
      </template>
      <!-- 一般用于查询 -->
      <template v-if="footer && inline">
        <span class="span-btns">
          <slot name="before-btns" />
          <el-button v-if="!!submitMsg" class="footer-btn" type="primary" @click="submit">
            {{ submitMsg }}
          </el-button>
          <el-button v-if="resetMsg" class="footer-btn" type="info" @click="handleReset">
            {{ resetMsg }}
          </el-button>
          <slot name="after-btns" />
        </span>
      </template>
    </el-row>
  </el-form>
  <!-- 一般用于表单提交 重复html用于方便修改按钮样式 -->
  <template v-if="footer && !inline">
    <div class="div-btns">
      <slot name="before-btns" />
      <el-button v-if="!!submitMsg" class="footer-btn" type="primary" @click="submit">
        {{ submitMsg }}
      </el-button>
      <el-button v-if="resetMsg" class="footer-btn" type="info" @click="handleReset">
        {{ resetMsg }}
      </el-button>
      <slot name="after-btns" />
    </div>
  </template>
</template>

<script setup>
import { toReactive } from '@vueuse/core'
import { computeFormItem, elementComponent, formItemComponents } from '../v3-form-item/map-form-item.js'
import { cusProps } from './useProps'

defineOptions({
  name: 'V3Form',
  components: {
    ...elementComponent(),
    ...formItemComponents(), // 动态加载表单子组件
  },
})

const props = defineProps(cusProps)

const emit = defineEmits(['change', 'submit', 'afterReset'])

const formModel = toReactive(props.model)

const formRef = ref()

// 根据formItems渲染对应的组件
const virtualForm = computed(() => {
  let _formItems = []
  _formItems = props.formItems.map((item) => {
    return computeFormItem(item, formModel)
  })
  return _formItems
})

/**
 *表单校验
 */
function submit() {
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

/**
 * 表单验证返回promise对象
 */
function promiseSubmit() {
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
        reject(new Error('验证失败'))
      }
    })
  })
}

/**
 * 重置表单
 */
function handleReset() {
  if (!formRef.value)
    return
  formRef.value.resetFields()
  emit('afterReset')
}

defineExpose({ handleReset, promiseSubmit })
</script>

<style lang='scss' scoped>
:deep(.el-cascader),
:deep(.el-select),
:deep(.el-date-editor) {
  width: 100%;
  min-width: 190px;
}

:deep(.el-date-editor .el-input__wrapper) {
  width: calc(100% - 22px);
}

:deep(.el-form-item--default) {
  margin-bottom: 1rem;
  --font-size: 16px;
}

.from-container {
  .attr-prefix,
  .attr-suffix {
    font-size: 14px;
    font-weight: 400;
    color: #4b5971;
    width: 15% !important;
    line-height: 48px;
  }

  .attr-prefix {
    margin-right: 13px;
  }

  .attr-suffix {
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
.div-btns {
  text-align: center;
  margin-bottom: 10px;
}
</style>
