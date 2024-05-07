import { getDepOptions } from '@/hooks/useOptions'

export function useSearch() {
  const searchItems = [
    {
      tag: 'input',
      itemAttrs: {
        label: '角色',
      },
      attrs: {
        key: 'roleName',
        maxlength: 10,
        placeholder: '请输入工号',
      }
    },
    {
      tag: 'select',
      itemAttrs: {
        label: '兴趣',
      },
      attrs: {
        key: 'hobby',
        placeholder: '请输入兴趣',
        options: [
          { value: '1', label: '吃饭' },
          { value: '2', label: '睡觉' },
          { value: '3', label: '打豆豆' },
        ]
      },
    },
    {
      tag: 'select',
      itemAttrs: {
        label: '部门',
      },
      attrs: shallowReactive({
        key: 'depid',
        placeholder: '请选择部门',
        subProps: {
          value: 'id',
          label: 'departmentName'
        },
        options: []
      }),
    },
  ]

  // 动态给key='depid'的options赋值
  getDepOptions(searchItems, 'depid')

  return {
    searchItems
  }
}
