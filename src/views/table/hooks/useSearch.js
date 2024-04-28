
// import { useGetTestList } from '@/hooks/useDropDownList'

export const useSearch = () => {
  const searchItems = reactive([
    {
      tag: 'input',
      itemAttrs: {
        label: '角色'
      },
      attrs: {
        key: 'roleName',
        maxlength: 10,
        placeholder: '请输入工号'
      }
    },
    {
      tag: 'daterange',
      itemAttrs: {
        label: '日期范围'
      },
      attrs: {
        key: ['start', 'end']
      }
    },
    {
      tag: 'sinput',
      itemAttrs: {
        label: '组合查询'
      },
      attrs: {
        key: 'sinput1',
        options: [
          { value: 'name', label: '吃饭' },
          { value: 'bbb', label: '睡觉' },
          { value: 'ccc', label: '打豆豆' },
          { value: 'ttt', label: '打豆豆2' }
        ]
      }
    },
    {
      tag: 'select',
      itemAttrs: {
        label: '兴趣'
      },
      attrs: {
        key: 'hobby',
        placeholder: '请输入兴趣',
        options: [
          { value: '1', label: '吃饭' },
          { value: '2', label: '睡觉' },
          { value: '3', label: '打豆豆' }
        ]
      }
    }
  ])
  //   useGetTestList(searchItems, 'sinput1')
  return {
    searchItems
  }
}
