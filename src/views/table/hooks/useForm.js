export const useForm = () => {
  const editForm = reactive({
    checkboxGroup: ['1']
  })
  const formRef = ref()
  const formItems = [
    {
      tag: 'input',
      itemAttrs: {
        label: '姓名',
        col: 12,
        rules: [
          { required: true, message: '年龄不能为空', trigger: 'click' }
        ]
      },
      attrs: {
        key: 'name',
        placeholder: '请输入姓名'
      },
      getAttrs(Model) {
        // 返回一个被合并到当前attrs属性里的对象
        return Model.age === '22' ? { disabled: true } : null
      }
    },
    {
      tag: 'select',
      itemAttrs: {
        label: '兴趣',
        col: 12
      },
      attrs: {
        key: 'hobby',
        placeholder: '请输入兴趣',
        options: [
          { value: 1, label: '吃饭' },
          { value: 2, label: '睡觉' },
          { value: 3, label: '打豆豆' }
        ]
      }
    },
    {
      tag: 'input',
      itemAttrs: {
        label: '年龄',
        rules: [
          { required: true, message: '年龄不能为空', trigger: 'click' }
        ]
      },
      attrs: {
        key: 'age',
        placeholder: '请输入年龄'
      },
      ifRender(Model) {
        return Model.hobby === 2
      }
    },
    {
      tag: 'date',
      itemAttrs: {
        label: '日期',
        col: 12
      },
      attrs: {
        key: 'date',
        'value-format': 'yyyy-MM-dd'
      }
    },
    {
      tag: 'daterange',
      itemAttrs: {
        label: '日期范围',
        col: 10
      },
      attrs: {
        key: ['start', 'end']
      }
    },
    {
      tag: 'radio',
      itemAttrs: {
        label: '单选框'
      },
      attrs: {
        value: '1',
        key: 'radio',
        options: [{ value: '1', label: '男' }, { value: '2', label: '女' }]
      }
    },
    {
      tag: 'uploadFile',
      itemAttrs: {
        label: '文件',
        col: 24
      },
      attrs: {
        key: 'file_uri',
        limit: 1
      }
    },
    {
      tag: 'uploadImg',
      itemAttrs: {
        label: '文章封面',
        col: 24
      },
      attrs: {
        key: 'image_uri',
        limit: 2
      }
    },
    {
      tag: 'radio',
      itemAttrs: {
        label: '调用后端接口-单选框'
      },
      attrs: {
        value: '1',
        key: 'asyncRadio',
        options: []
      }
    },
    {
      tag: 'checkbox-group',
      itemAttrs: {
        label: '复选框组'
      },
      attrs: {
        key: 'checkboxGroup',
        options: [
          { value: '1', label: '复选框1' },
          { value: '2', label: '复选框2' },
          { value: '3', label: '复选框3' }
        ]
      }
    },
    {
      tag: 'cascader',
      itemAttrs: {
        label: '级联选择器'
      },
      attrs: {
        key: 'cascader',
        options: [
          {
            value: 'guide',
            label: 'Guide',
            children: [
              {
                value: 'disciplines',
                label: 'Disciplines',
                children: [
                  {
                    value: 'consistency',
                    label: 'Consistency'
                  },
                  {
                    value: 'feedback',
                    label: 'Feedback'
                  },
                  {
                    value: 'efficiency',
                    label: 'Efficiency'
                  },
                  {
                    value: 'controllability',
                    label: 'Controllability'
                  }
                ]
              },
              {
                value: 'navigation',
                label: 'Navigation',
                children: [
                  {
                    value: 'side nav',
                    label: 'Side Navigation'
                  },
                  {
                    value: 'top nav',
                    label: 'Top Navigation'
                  }
                ]
              }
            ]
          },
          {
            value: 'component',
            label: 'Component',
            children: [
              {
                value: 'basic',
                label: 'Basic',
                children: [
                  {
                    value: 'layout',
                    label: 'Layout'
                  },
                  {
                    value: 'color',
                    label: 'Color'
                  },
                  {
                    value: 'typography',
                    label: 'Typography'
                  },
                  {
                    value: 'icon',
                    label: 'Icon'
                  },
                  {
                    value: 'button',
                    label: 'Button'
                  }
                ]
              },
              {
                value: 'form',
                label: 'Form',
                children: [
                  {
                    value: 'radio',
                    label: 'Radio'
                  },
                  {
                    value: 'checkbox',
                    label: 'Checkbox'
                  },
                  {
                    value: 'input',
                    label: 'Input'
                  },
                  {
                    value: 'input-number',
                    label: 'InputNumber'
                  },
                  {
                    value: 'select',
                    label: 'Select'
                  },
                  {
                    value: 'cascader',
                    label: 'Cascader'
                  },
                  {
                    value: 'switch',
                    label: 'Switch'
                  },
                  {
                    value: 'slider',
                    label: 'Slider'
                  },
                  {
                    value: 'time-picker',
                    label: 'TimePicker'
                  },
                  {
                    value: 'date-picker',
                    label: 'DatePicker'
                  },
                  {
                    value: 'datetime-picker',
                    label: 'DateTimePicker'
                  },
                  {
                    value: 'upload',
                    label: 'Upload'
                  },
                  {
                    value: 'rate',
                    label: 'Rate'
                  },
                  {
                    value: 'form',
                    label: 'Form'
                  }
                ]
              },
              {
                value: 'data',
                label: 'Data',
                children: [
                  {
                    value: 'table',
                    label: 'Table'
                  },
                  {
                    value: 'tag',
                    label: 'Tag'
                  },
                  {
                    value: 'progress',
                    label: 'Progress'
                  },
                  {
                    value: 'tree',
                    label: 'Tree'
                  },
                  {
                    value: 'pagination',
                    label: 'Pagination'
                  },
                  {
                    value: 'badge',
                    label: 'Badge'
                  }
                ]
              },
              {
                value: 'notice',
                label: 'Notice',
                children: [
                  {
                    value: 'alert',
                    label: 'Alert'
                  },
                  {
                    value: 'loading',
                    label: 'Loading'
                  },
                  {
                    value: 'message',
                    label: 'Message'
                  },
                  {
                    value: 'message-box',
                    label: 'MessageBox'
                  },
                  {
                    value: 'notification',
                    label: 'Notification'
                  }
                ]
              },
              {
                value: 'navigation',
                label: 'Navigation',
                children: [
                  {
                    value: 'menu',
                    label: 'Menu'
                  },
                  {
                    value: 'tabs',
                    label: 'Tabs'
                  },
                  {
                    value: 'breadcrumb',
                    label: 'Breadcrumb'
                  },
                  {
                    value: 'dropdown',
                    label: 'Dropdown'
                  },
                  {
                    value: 'steps',
                    label: 'Steps'
                  }
                ]
              },
              {
                value: 'others',
                label: 'Others',
                children: [
                  {
                    value: 'dialog',
                    label: 'Dialog'
                  },
                  {
                    value: 'tooltip',
                    label: 'Tooltip'
                  },
                  {
                    value: 'popover',
                    label: 'Popover'
                  },
                  {
                    value: 'card',
                    label: 'Card'
                  },
                  {
                    value: 'carousel',
                    label: 'Carousel'
                  },
                  {
                    value: 'collapse',
                    label: 'Collapse'
                  }
                ]
              }
            ]
          },
          {
            value: 'resource',
            label: 'Resource',
            children: [
              {
                value: 'axure',
                label: 'Axure Components'
              },
              {
                value: 'sketch',
                label: 'Sketch Templates'
              },
              {
                value: 'docs',
                label: 'Design Documentation'
              }
            ]
          }
        ]

      }
    },
    {
      tag: 'checkbox',
      itemAttrs: {
        label: '复选框'
      },
      attrs: {
        key: 'checkbox',
        value: true,
        label: '复选框'
      }
    },
    {
      tag: 'textarea',
      itemAttrs: {
        label: '文本框'
      },
      attrs: {
        key: 'textarea'
      }
    }
  ]
  return {
    formRef,
    editForm,
    formItems
  }
}
