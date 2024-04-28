<template>
  <div class="tb-container">
    <!-- 列表顶部的操作按钮 -->
    <div class="header-buttons">
      <slot name="headLeft" :rows="selectedList" :ids="selectedListIds" :is-selected="isSelected" />
      <slot name="headRight" :rows="selectedList" :ids="selectedListIds" :is-selected="isSelected" />
    </div>

    <!-- 列表数据 -->
    <el-table
      v-bind="$attrs" ref="tableRoot" v-loading="listLoading" row-class-name="cus-eltable"
      highlight-current-row style="width: 100%" :data="tableData" :row-key="getRowKeys"
      :header-cell-style="headerCellStyle" :cell-style="cellStyle" @selection-change="selectionChange"
      @row-click="onClick" @row-dblclick="onDblclick"
    >
      <el-table-column v-if="selectVisible" type="selection" width="45" align="center" />
      <el-table-column v-if="indexVisible" type="index" :index="indexMethod" width="60px" label="序号" align="center" />
      <template v-for="(column, index) in columns">
        <el-table-column v-if="column.render" :key="`render-${column.prop}`" :width="column.width" :label="column.label">
          <template #default="{ row }">
            <Render :row="row" :index="index" :render="column.render" />
          </template>
        </el-table-column>
        <slot v-else-if="column.slot" :key="column.prop" :name="column.slot" />
        <el-table-column v-else-if="column.isImg" :key="`img-${column.prop}`" v-bind="setAttrs(column)">
          <template #default="{ row }">
            <el-image
              class="srm-table_img" :style="{
                width: column.width || '120px',
                height: column.height || 'auto',
              }" :src="`${row[column.prop]}`" :preview-src-list="[row[column.prop]]"
            />
          </template>
        </el-table-column>
        <el-table-column v-else :key="`other-${column.prop}`" show-overflow-tooltip v-bind="setAttrs(column)" />
      </template>
    </el-table>

    <!-- 分页栏 -->
    <div v-if="isPagination && onePage" class="toolbar">
      <el-pagination
        v-show="isPagination" v-model:current-page="listQuery.pageNum" :page-sizes="pagingSizes"
        class="pagination" background :layout="layout" :total="totalCount" :page-size="listQuery.pageSize"
        @current-change="onPageChange" @size-change="onSizeChange"
      />
    </div>
  </div>
</template>

<script setup name="CusElTable">
import Render from './hooks/useRender'
import { useTableStyle } from './hooks/useStyle'
import { cusProps } from './hooks/useProps'
import { useTable } from '@/hooks/useTable'
import { useSelection } from '@/hooks/useSelection'

const props = defineProps(cusProps)

const emit = defineEmits(['rowClick', 'rowDblclick', 'refBack', 'callBack', 'sendData'])

const tableRoot = ref(null)

const { layout, headerCellStyle, cellStyle } = useTableStyle()

// 表格多选 Hooks
const { selectionChange, getRowKeys, selectedList, selectedListIds, isSelected } = useSelection()

// 表格操作 Hooks
const { refresh, getList, tableData, totalCount, listLoading, listQuery, searchForm, onSizeChange, onPageChange, pagingSizes, tbExport } = useTable(props)

const onePage = computed(() => {
  if (props.isOnePage)
    return totalCount > 1

  return true
})

// table数据源变化 滚动条滑到顶部
watch(tableData, () => {
  scrollTo(0, 0)
  setTimeout(() => {
    isCheckRow()
  }, 200)
})

// 绑定属性
function setAttrs(params) {
  const { slot, ...options } = params
  if (!options.align)
    options.align = 'center'

  return { ...options }
}

// 判断是否存在选择行，如存在即清除
function isCheckRow() {
  if (props.isCallBack)
    emit('callBack')

  if (!props.selectVisible)
    return

  if (tableData.value) {
    tableData.value.forEach((currentItem) => {
      if (currentItem.checkType)
        tableRoot.value.toggleRowSelection(currentItem, true)
    })
  }
}
// 双击
function onDblclick(row) {
  emit('rowDblclick', row)
}

// 单击
function onClick(row) {
  if (props.selectVisible)
    tableRoot.value.toggleRowSelection(row)

  emit('rowClick', row)
}

// 重置选择
function resetSelections() {
  tableRoot.value.clearSelection()
}

// 配置序号
function indexMethod(index) {
  const { pageNum, pageSize } = listQuery.value
  return (pageNum - 1) * pageSize + index + 1
}

// 暴露给父组件的参数和方法
defineExpose({ refresh, getList, tableData, searchForm, selectedList, tbExport, resetSelections })
</script>
