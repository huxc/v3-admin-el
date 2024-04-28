export const cusProps = {
  submitMsg: { type: String, default: '查询' }, // 是否启用查询
  resetMsg: { type: String, default: '重置' }, // 是否启用重置
  isSearch: { type: Boolean, default: false }, // 是否启用查询
  isCallBack: { type: Boolean, default: false }, // 刷新后是否要回调
  selectVisible: { type: Boolean, default: false }, // 是否多选
  indexVisible: { type: Boolean, default: true }, // 是否显示序号
  queryColumns: { type: Array, default: () => [] }, // 查询表单
  columns: { type: Array, default: () => [] }, // 定义列
  initParam: { type: Object, default: () => {} }, // 筛选默认值
  requestApi: { type: [Function, null], default: () => null }, // 列表数据接口
  isPagination: { type: Boolean, default: true }, // 是否显示分页
  formatRequest: { type: Function, required: false }, // 格式化列表数据
  formatQuery: { type: Function, required: false }, // 格式化查询数据
  isOnePage: { type: Boolean, default: false }, // 只有一页的时候是否显示分页
}
