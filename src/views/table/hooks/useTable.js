/**
 * 分页查询接口
 */
export function useTable() {
  const requestApi = ref(api_user_getCustomers)

  // 列表列名
  const columns = [
    { type: 'selection', label: '多选' },
    { type: 'index', label: '序号', width: '60px' },
    { prop: 'name', label: '姓名' },
    { prop: 'gender', label: '性别', formatter: fmtGender },
    { prop: 'age', label: '年龄' },
    { prop: 'avatar', label: '头像', isImg: true },
    { prop: 'id_card', label: '身份证' },
    { prop: 'email', label: '邮箱' },
    { prop: 'address', label: '地址' },
    { prop: 'email', label: '邮箱' },
    { prop: 'status', label: '状态', render: fmtRenderStatus },
    { prop: 'created_at', label: '创建时间', width: '160px' },
    { slot: 'operation', label: '操作' },
  ]

  /**
   * 格式化性别
   */
  function fmtGender(row) {
    return ['', '男', '女'][row.gender]
  }

  /**
   * rendder函数渲染组件格式化字段
   */
  function fmtRenderStatus(h, { row }) {
    const status = ['禁用', '启用']
    const types = ['danger', 'success']
    // eslint-disable-next-line jsdoc/require-jsdoc
    return h(ElTag, { type: types[row.status] }, { default: () => status[row.status] })
  }

  return {
    columns,
    requestApi,
  }
}
