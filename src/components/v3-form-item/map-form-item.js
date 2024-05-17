/**
 * 因为按需加载插件无法打包动态组件，要把需要用到的表单组件才此处统一引入
 */
export const comElements = {
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

export const comFormItems = {
  'v3-select': defineAsyncComponent(() => import('./v3-select.vue')),
  'v3-upload-img': defineAsyncComponent(() => import('./v3-upload-img.vue')),
  'v3-upload-file': defineAsyncComponent(() => import('./v3-upload-file.vue')),
  'v3-radio-group': defineAsyncComponent(() => import('./v3-radio-group.vue')),
  'v3-checkbox-group': defineAsyncComponent(() => import('./v3-checkbox-group.vue')),
}

const componentMap = {
  'input': {
    component: 'el-input',
    attrs: {
      placeholder: '请输入',
    },
  },
  'selectv2': {
    component: 'el-select-v2', // 虚拟化选择器
    attrs: {
      placeholder: '请输入',
    },
  },
  'select': {
    component: 'v3-select', // 自定义组件,为了在el-select添加options能够生成el-options节点
    attrs: {
      placeholder: '请选择',
      clearable: true,
      filterable: true,
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
  'radio': {
    component: 'v3-radio-group', // 自定义组件,为了在el-radio-group添加options能够生成el-radio节点
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
    component: 'v3-checkbox-group', // 同上
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
    component: 'v3-upload-img',
  },
  'uploadFile': {
    component: 'v3-upload-file',
  },
}

/**
 * 初始化处理
 */
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
