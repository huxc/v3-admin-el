/**
 * 查询条件配置
 */
export function useSearch() {
  const collapse = true // 搜索框可折叠
  const defaultOver = false
  const searchItems = [
    {
      tag: 'input',
      itemAttrs: {
        label: '姓名',
      },
      attrs: {
        key: 'name',
        maxlength: 10,
      },
    },
    {
      tag: 'input',
      itemAttrs: {
        label: '年龄',
      },
      attrs: {
        key: 'age',
        maxlength: 3,
      },
    },
    {
      tag: 'select',
      itemAttrs: {
        label: '性别',
      },
      attrs: {
        key: 'gender',
        options: [
          { value: 1, label: '男' },
          { value: 2, label: '女' },
        ],
      },
    },
    {
      tag: 'input',
      itemAttrs: {
        label: '身份证',
      },
      attrs: {
        key: 'idCard',
        maxlength: 18,
      },
    },
    {
      tag: 'input',
      itemAttrs: {
        label: '姓名',
      },
      attrs: {
        key: 'name',
        maxlength: 10,
      },
    },
    {
      tag: 'input',
      itemAttrs: {
        label: '年龄',
      },
      attrs: {
        key: 'age',
        maxlength: 3,
      },
    },
    {
      tag: 'select',
      itemAttrs: {
        label: '性别',
      },
      attrs: {
        key: 'gender',
        options: [
          { value: 1, label: '男' },
          { value: 2, label: '女' },
        ],
      },
    },
    {
      tag: 'input',
      itemAttrs: {
        label: '身份证',
      },
      attrs: {
        key: 'idCard',
        maxlength: 18,
      },
    },
    {
      tag: 'input',
      itemAttrs: {
        label: '姓名',
      },
      attrs: {
        key: 'name',
        maxlength: 10,
      },
    },
    {
      tag: 'input',
      itemAttrs: {
        label: '年龄',
      },
      attrs: {
        key: 'age',
        maxlength: 3,
      },
    },
    {
      tag: 'select',
      itemAttrs: {
        label: '性别',
      },
      attrs: {
        key: 'gender',
        options: [
          { value: 1, label: '男' },
          { value: 2, label: '女' },
        ],
      },
    },
    {
      tag: 'input',
      itemAttrs: {
        label: '身份证',
      },
      attrs: {
        key: 'idCard',
        maxlength: 18,
      },
    },
  ]

  return {
    collapse,
    defaultOver,
    searchItems,
  }
}
