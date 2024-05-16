<template>
  <!-- 搜索条件 -->
  <!-- <v3-form
    v-if="searchProps" ref="formRef" inline footer :reset-msg :submit-msg :model="searchForm"
    :form-items="searchItems" @submit="refresh"
  /> -->

  <!-- <v3-search
    v-bind="searchProps" inline footer :reset-msg :submit-msg :model="searchForm"
    :form-items="searchItems" @submit="refresh"
  /> -->
  <div class="card table-main">
    <!-- 列表顶部的操作按钮 -->
    <div class="header-buttons">
      <slot name="headLeft" :rows="selectedList" :ids="selectedListIds" :is-selected="isSelected" />
      <slot name="headRight" :rows="selectedList" :ids="selectedListIds" :is-selected="isSelected" />
    </div>

    <!-- 列表数据 -->
    <div class="card table-main">
      <el-table
        v-bind="$attrs" ref="tableRoot" v-loading="listLoading"
        highlight-current-row style="width: 100%" :data="tableData" :row-key="getRowKeys"
        :header-cell-style="headerCellStyle" :cell-style="cellStyle" @selection-change="selectionChange"
        @row-click="onClick" @row-dblclick="onDblclick"
      >
        <template v-for="(column, index) in columns">
          <el-table-column v-if="column?.type === 'index'" :key="`index-${column.prop}`" :index="indexMethod" v-bind="setAttrs(column)" />
          <el-table-column v-else-if="column.render" :key="column.prop" :width="column.width" :label="column.label">
            <template #default="{ row }">
              <Render :row="row" :index="index" :render="column.render" />
            </template>
          </el-table-column>
          <!-- <el-table-column v-else-if="column.render" :key="column.prop" v-bind="setAttrs(column)">
        <template #default="{ row }">
          <component :is="column.render" v-bind="row" />
        </template>
      </el-table-column> -->
          <slot v-else-if="column.slot" :key="`slot-${column.prop}`" :name="column.slot" />
          <el-table-column v-else-if="column.isImg" :key="`img-${column.prop}`" v-bind="setAttrs(column)">
            <template #default="{ row }">
              <el-image
                class="srm-table_img" :style="{
                  width: column.width || '60px',
                  height: column.height || 'auto',
                }" :src="`${row[column.prop]}`" :preview-src-list="[row[column.prop]]"
              />
            </template>
          </el-table-column>
          <el-table-column v-else :key="`other-${column.prop}`" show-overflow-tooltip v-bind="setAttrs(column)" />
        </template>
      </el-table>
      <!-- 分页栏 -->
      <div v-if="isPagination" class="toolbar">
        <el-pagination
          v-model:current-page="listQuery.pageNum"
          class="pagination"
          background
          :page-sizes="pageSizes"
          :total="totalCount"
          layout="total, sizes, prev, pager, next, jumper"
          :page-size="listQuery.pageSize"
          :hide-on-single-page="onePage"
          @current-change="onPageChange" @size-change="onSizeChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup name="V3Table">
import Render from '../v3-table/hooks/useRender'
import { useTableStyle } from './hooks/useStyle'
import { cusEmits, cusProps, search_props_default } from './hooks/useProps'
import { useTable } from '@/hooks/useTable'
import { useSelection } from '@/hooks/useSelection'

const props = defineProps(cusProps)

const emit = defineEmits(cusEmits)

const formRef = ref(null)
const tableRoot = ref(null)

// 是否可多选
const isMultiple = props.columns.some(i => i?.type === 'selection')

// 合并props.searchProps
Object.assign(search_props_default, props.searchProps || {})

// const { searchItems, submitMsg, resetMsg } = toRefs(search_props_default)

const { headerCellStyle, cellStyle } = useTableStyle()

// 表格多选 Hooks
const { selectionChange, getRowKeys, selectedList, selectedListIds, isSelected } = useSelection()

// 表格操作 Hooks
const { refresh, getList, tableData, totalCount, listLoading, listQuery, searchForm, onSizeChange, onPageChange } = useTable(props)

Object.assign(searchForm, props.initParam)

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

/**
 * 绑定属性
 */
function setAttrs(params) {
  const { slot, ...options } = params
  if (!options.align)
    options.align = 'center'

  return { ...options }
}

/**
 *  判断是否存在选择行，如存在即清除
 */
function isCheckRow() {
  emit('callBack')

  if (!isMultiple)
    return

  if (tableData.value) {
    tableData.value.forEach((currentItem) => {
      if (currentItem.checkType)
        tableRoot.value.toggleRowSelection(currentItem, true)
    })
  }
}

/**
 * 双击
 */
function onDblclick(row) {
  emit('rowDblclick', row)
}

/**
 * 单击
 */
function onClick(row) {
  if (isMultiple) {
    tableRoot.value.clearSelection()
    tableRoot.value.toggleRowSelection(row)
  }
  emit('rowClick', row)
}

/**
 * 重置表单
 */
function searchReset() {
  formRef.value.handleReset()
}

/**
 * 重置选择
 */
function resetSelections() {
  tableRoot.value.clearSelection()
}

/**
 * 配置序号
 */
function indexMethod(index) {
  const { pageNum, pageSize } = listQuery.value
  return (pageNum - 1) * pageSize + index + 1
}

/**
 * 手动设置表单数据源
 */
function setTableData(tabelList) {
  tableData.value = tabelList
}

/**
 * 传值查询
 */
function handleSearch(form) {
  Object.assign(searchForm, form)
  getList()
}
// 暴露给父组件的参数和方法
defineExpose({ refresh, getList, tableData, searchReset, resetSelections, setTableData, handleSearch })
</script>

<style>
.header-buttons {
  margin-bottom: 10px;
}
</style>
