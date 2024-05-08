export function usePageList() {
  // 分页查询接口
  const requestApi = ref(api_account_getUserPage)

  // 列表列名
  const columns = [
    { type: 'selection', label: '多选' },
    { type: 'index', label: '序号', width: '60px' },
    { prop: 'jobNo', label: '工号' },
    { prop: 'nickName', label: '姓名' },
    {
      prop: 'departmentName',
      label: '部门',
      render: (h, { row }) => {
        return h('span', { style: { color: '#60D7A7' } }, row.departmentName)
      },
    },
    { prop: 'roleName', label: '角色' },
    { prop: 'createAt', label: '创建时间' },
    { slot: 'operation', label: '操作' },
  ]

  return {
    columns,
    requestApi,
  }
}
