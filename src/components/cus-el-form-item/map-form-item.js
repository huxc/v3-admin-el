import { defineAsyncComponent } from 'vue'

import {
  ElCascader,
  ElCheckbox,
  ElCol,
  ElDatePicker,
  ElInput,
  ElInputNumber,
  ElRadio,
  ElRadioButton,
  ElRadioGroup,
  ElSelect,
  ElSelectV2,
  ElUpload,
} from 'element-plus'

// 因为按需加载插件无法打包动态组件(component标签)，所以封装form组件按需引入
export function elementComponent() {
  const elementComponent = {
    ElInput,
    ElRadio,
    ElInputNumber,
    ElSelect,
    ElDatePicker,
    ElCol,
    ElCascader,
    ElCheckbox,
    ElRadioGroup,
    ElRadioButton,
    ElUpload,
    ElSelectV2,
  }
  return elementComponent
}

export function formItemComponents() {
  const components = {
    'cus-select': defineAsyncComponent(() => import('./cus-select.vue')),
    'cus-select-v2': defineAsyncComponent(() => import('./cus-select-v2.vue')),
    'cus-select-img': defineAsyncComponent(() => import('./cus-select-img.vue')),
    // 'cus-upload': defineAsyncComponent(() => import('./cus-uploads.vue')),
    'cus-radio-group': defineAsyncComponent(() => import('./cus-radio-group.vue')),
    'cus-checkbox-group': defineAsyncComponent(() => import('./cus-checkbox-group.vue')),
    'cus-daterange': defineAsyncComponent(() => import('./cus-daterange.vue')),
    'cus-upload-img': defineAsyncComponent(() => import('./cus-upload-img.vue')),
    'cus-upload-file': defineAsyncComponent(() => import('./cus-upload-file.vue')),
    'cus-phone-code': defineAsyncComponent(() => import('./cus-phone-code.vue')),
    'cus-select-input': defineAsyncComponent(() => import('./cus-select-input.vue')),
  }
  return components
}

const componentMap = {
  'input': {
    component: 'el-input',
    attrs: {
      placeholder: '请输入',
    },
  },
  'phonecode': {
    component: 'cus-phone-code',
    attrs: {
      placeholder: '请输入',
    },
  },
  'select': {
    component: 'cus-select', // 自定义组件,为了在el-select添加options能够生成el-options节点
    attrs: {
      placeholder: '请选择',
      clearable: true,
      filterable: true,
    },
  },
  'select-v2': {
    component: 'cus-select-v2',
    attrs: {
      placeholder: '请选择',
      clearable: true,
      filterable: true,
    },
  },
  'select-img': {
    component: 'cus-select-img',
    attrs: {
      placeholder: '请选择',
      clearable: true,
      filterable: true,
    },
  },
  'sinput': {
    component: 'cus-select-input', // 自定义组件,为了在el-select添加options能够生成el-options节点
    attrs: {
    },
  },
  'date': {
    component: 'el-date-picker',
    attrs: {
      'placeholder': '选择日期',
      'clearable': true,
      'type': 'date',
      'format': 'YYYY-MM-DD',
      'value-format': 'YYYY-MM-DD HH:mm:ss',
    },
  },
  'daterange': {
    component: 'cus-daterange',
    attrs: {
      'clearable': true,
      'format': 'YYYY-MM-DD',
      'value-format': 'YYYY-MM-DD HH:mm:ss',
    },
  },
  'radio': {
    component: 'cus-radio-group', // 自定义组件,为了在el-radio-group添加options能够生成el-radio节点
    value: [],
    attrs: {
      placeholder: '选择',
      clearable: true,
    },
  },
  'checkbox': {
    component: 'el-checkbox',
  },
  'checkbox-group': {
    component: 'cus-checkbox-group', // 同上
  },

  'cascader': {
    component: 'el-cascader',
    attrs: {
      placeholder: '请选择',
      clearable: true,
    },
  },
  'textarea': {
    component: 'el-input',
    attrs: {
      type: 'textarea',
    },
  },
  'number': {
    component: 'el-input-number',
    attrs: {
      min: 1,
      max: 999,
      controls: false,
      precision: 2,
    },
  },
  'uploadImg': {
    component: 'cus-upload-img',
  },
  'uploadFile': {
    component: 'cus-upload-file',
  },
}

export function computeFormItem(formItem, fModel) {
  const item = { ...formItem }
  // 表单控件的类型
  const tag = item.tag || 'input'
  // 对应到组件映射表
  const basicItem = componentMap[tag]
  item.tag = basicItem.component
  // 继承基类的属性
  item.attrs = Object.assign({}, basicItem.attrs, item.attrs)
  // 获取动态 Attributes
  if (item.getAttrs)
    item.attrs = Object.assign(item.attrs, item.getAttrs(fModel))

  // 条件渲染
  item._ifRender = item.ifRender ? item.ifRender(fModel) : true
  // 防止表单提交时存在多余 key
  if (!item._ifRender)
    delete fModel[item.attrs.key]

  // form-item 配置
  return item
}
