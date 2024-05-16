/**
 * 分页查询接口
 */
export function usePageList() {
  const requestApi = ref(api_account_getUsers)

  // 列表列名
  const columns = [
    { type: 'selection', label: '多选' },
    { type: 'index', label: '序号', width: '60px' },
    { prop: 'avatar', label: '头像', isImg: true },
    { prop: 'gender', label: '性别' },
    { prop: 'age', label: '年龄' },
    { prop: 'idCard', label: '身份证' },
    { prop: 'email', label: '邮箱' },
    { prop: 'address', label: '地址' },
    { prop: 'email', label: '邮箱' },
    {
      prop: 'status',
      label: '状态',
      // eslint-disable-next-line jsdoc/require-jsdoc
      render: (h, { row }) => {
        const status = ['禁用', '启用']
        // const types = ['danger', 'success']
        return h('el-tag', { type: 'success' }, status[row.status])
      },
    },
    { prop: 'createTime', label: '创建时间' },
    { slot: 'operation', label: '操作' },
  ]

  return {
    columns,
    requestApi,
  }
}
