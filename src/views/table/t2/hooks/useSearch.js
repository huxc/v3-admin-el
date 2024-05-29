/**
 * 查询条件配置
 */
export function useSearch() {
  const collapse = true // 搜索框可折叠
  const defaultOver = false
  const searchItems = [
    {
      tag: 'select',
      itemAttrs: {
        label: '性别',
      },
      attrs: {
        key: 'gender',
        options: [
          { value: 0, label: '男' },
          { value: 1, label: '女' },
        ],
      },
    },
  ]

  return {
    collapse,
    defaultOver,
    searchItems,
  }
}
