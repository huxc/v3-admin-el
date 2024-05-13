/**
 *   表格多选数据操作
 */
export function useSelection() {
  // 是否选中数据
  const isSelected = ref(false)

  // 选中的数据列表
  const selectedList = ref([])

  // 当前选中的所有ids(数组)
  const selectedListIds = computed(() => {
    return selectedList.value.map(i => i.id)
  })

  /**
   *获取行数据的 Key,用来优化 Table 的渲染;在使用跨页多选时,该属性是必填的
   */
  const getRowKeys = row => row.id || row.uuid

  /**
   *   多选操作
   * @param {Array} rowArr 当前选择的所有数据
   * @return void
   */
  const selectionChange = (rowArr) => {
    rowArr.length === 0 ? (isSelected.value = false) : (isSelected.value = true)
    selectedList.value = rowArr
  }

  return {
    isSelected,
    selectedList,
    selectedListIds,
    selectionChange,
    getRowKeys,
  }
}
