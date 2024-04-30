import { invoke, until } from '@vueuse/core'
import { filterEmptyValue, typeOf } from '@/utils'

/**
 * @description table 页面操作方法封装
 * @param {requestApi} 获取表格数据 请求接口Api(必传)
 * @function formatRequest 请求后格式化表格数据函数(非必传)
 * @param {searchProps.initParam} 获取数据初始化参数(不必传，默认为{})
 * @function searchProps.formatQuery 请求前格式化查询参数函数(非必传)
 */

export function useTable(props) {
  const requestApi = toRef(props, 'requestApi')
  const { formatRequest, searchProps } = props
  const initParam = searchProps?.initParam || {}

  const state = reactive({
    // 页码及每页条数
    listQuery: {
      pageNum: 1,
      pageSize: 10,
    },
    // 总条数
    totalCount: 0,
    // 获取数据
    tableData: [],
    // 筛选条件
    searchForm: {},
    // 是否加载中
    listLoading: false,
  })

  // 页码
  const pagingSizes = [10, 20, 50, 100, 200, 500]

  /**
   * 页码切换
   */
  const onPageChange = (page) => {
    state.listQuery.pageNum = page
  }
  /**
   *  条数切换
   */
  const onSizeChange = (size) => {
    state.listQuery.pageSize = size
  }

  /**
   * 获取列表数据
   */
  const getList = () => {
    if (typeOf(requestApi.value) !== 'function')
      return

    state.listLoading = true
    const query = filterEmptyValue(state.listQuery, initParam, state.searchForm)

    // 格式化查询参数
    if (typeOf(searchProps.formatQuery) === 'function')
      searchProps.formatQuery(query)

    // 接口请求数据
    requestApi.value(query).then((response) => {
      // 格式化列表返回数据
      if (formatRequest && typeof formatRequest === 'function')
        formatRequest(response)

      // 解决默认选中第一个行的问题
      state.tableData = []

      // 基于接口统一处理
      nextTick(() => {
        if (typeOf(response.data) === 'array') {
          state.tableData = response.data
        }
        else {
          state.tableData = response.data?.list || []
          state.totalCount = response.data?.total || 0
        }
      })
    }).finally(() => {
      state.listLoading = false
    })
  }

  /**
   * 刷新table
   */
  const refresh = () => {
    nextTick(() => {
      getList()
    })
  }

  // 监听-当页码或条数发生改变重新请求接口数据
  watch(
    () => state.listQuery,
    () => {
      nextTick(() => {
        getList()
      })
    },
    { deep: true },
  )

  invoke(async () => {
    await until(requestApi).toMatch(v => !!v)
    getList()
  })

  return {
    getList,
    refresh,
    pagingSizes,
    onPageChange,
    onSizeChange,
    ...toRefs(state),
  }
}
