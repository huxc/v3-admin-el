/**
 * 查询条件配置
 */
export function useQuery() {
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
      tag: 'daterange',
      itemAttrs: {
        label: '创建时间',
      },
      attrs: {
        key: 'createTime', // createdEndAt createdStartAt
      },
    },
  ]

  /**
   * 格式化创建时间查询
   */
  const formatQuery = (params) => {
    if (params?.createTime?.length) {
      params.createdStartAt = params.createTime[0]
      params.createdEndAt = params.createTime[1]
      delete params.createTime
    }
  }

  return {
    collapse,
    formatQuery,
    defaultOver,
    searchItems,

  }
}
