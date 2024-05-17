/* eslint-disable jsdoc/require-jsdoc */
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
    /**
     * 定义列
     */
    default: () => [],
  },
  // 列表数据接口
  requestApi: {
    type: [Function, null],
    default: null,
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
    default: true,
  },
  // 只有一页的时候是否隐藏分页
  isOnePage: {
    type: Boolean,
    default: false,
  },
  // 格式化列表数据
  formatRequest: {
    type: Function,
    required: false,
  },
  pageRequest: {
    type: Object,
    default: () => ({ page: 1, pageSize: 10 }),
  },
  // 每页显示个数选择器的选项设置
  pageSizes: {
    type: Array,
    default: () => [10, 20, 50, 100, 200, 500],
  },
  searchProps: {
    type: [Object, null],
    default: null, // 参数见下-search_props_default
  },
  initParam: {
    type: Object,
    /**
     *查询列表默认参数
     */
    default: () => ({}),
  },
}

// searchProps的默认值
export const search_props_default = reactive({
  collapse: false, // 是否可折叠搜索栏
  collapseHeight: 70, // 折叠后的高度
  defaultOver: false, // 当collapse为true时生效，搜索栏默认展开/折叠（true/false）
  formItems: [], // 查询表单（数组json）
  formatQuery: null, // 格式化查询数据-需定义为方法
})
