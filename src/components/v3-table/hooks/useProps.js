/**
 * 事件
 * {rowClick} 单机事件回调
 * {rowDblclick} 双击事件回调
 * {callBack} table数据源变化后回调
 */
export const cusEmits = ['rowClick', 'rowDblclick', 'callBack']

// 传参
export const cusProps = {
  // 定义列
  columns: {
    type: Array,
    default: () => [],
 },
  // 列表数据接口
  requestApi: {
    type: [Function, null],
    default: null 
  },
  // 是否多选
  isMultiple: {
    type: Boolean,
    default: true,
 },
  // 是否显示序号
  indexVisible: {
    type: Boolean,
    default: true,
 },
  // 是否显示分页
  isPagination: {
    type: Boolean,
    default: true 
  },
  // 只有一页的时候是否显示分页
  isOnePage: {
    type: Boolean,
    default: false 
  },
  // 获取数据初始化参数
  initParam: {
    type: Boolean,
    default: () => ({}) 
  },
  // 格式化列表数据
  formatRequest: {
    type: Function,
    required: false 
  },
  // 页码与每页条数
  pageRequest: {
    type: [Object],
    default: () => ({ page: 1, pageSize: 10 })
  },
  // 每页显示个数选择器的选项设置
  pageSizes: {
    type: [Array],
    default: [10, 20, 50, 100, 200, 500] //参数见下-search_props_default
  },
  searchProps: {
    type: [Object, null],
    default: null //参数见下-search_props_default
  }
}

// searchProps的默认值
export const search_props_default = reactive({
  submitMsg: '查询', // 查询按钮名称
  resetMsg: '重置', // 重置按钮名称
  searchItems: [], // 查询表单
  formatQuery: null, // 格式化查询数据-需定义为方法
})
