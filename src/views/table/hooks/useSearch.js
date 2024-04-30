// import { useGetTestList } from '@/hooks/useDropDownList'

export function useSearch() {
  const initParam = { roleName: 888, hobby: 2 }
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
    }
  ]
  return {
    searchItems,
    initParam,
  }
}
