<template>
  <div class="table-box">
    <!-- 列表数据 -->
    <v3-table ref="tableRef" :search-props :columns :request-api>
      <template #headLeft>
        <el-button class="btn" type="primary" @click="handleEdit()">
          <v3-icon class="table-ico" icon="ep:circle-plus" />新增客户
        </el-button>
      </template>
      <template #operation>
        <el-table-column label="操作" width="120px" align="center">
          <template #default="{ row }">
            <el-button type="primary" link @click="handleEdit(row)">
              <v3-icon class="table-ico" icon="ep:edit-pen" />编辑
            </el-button>
          </template>
        </el-table-column>
      </template>
    </v3-table>
  </div>
</template>

<script setup name="example-table">
import { useSearch } from '../hooks/useSearch'
import { useTable } from '../hooks/useTable'
import Form from './components/form/index.vue'

const tableRef = ref()
const { searchItems } = useSearch()

// 查询条件props
const searchProps = {
  searchItems, // 查询条件表单
  collapse: true, // 是否开启折叠功能
  defaultOver: true, // 默认展开
}
const { columns, requestApi } = useTable()

/**
 * 弹窗编辑
 */
function handleEdit(rows = {}) {
  // 对实时数据要求较高的项目 此处应根据id读取row
  const title = rows.id ? '编辑客户' : '新增客户'
  useDialog({
    attrs: { title },
    props: { oldForm: rows },
    componentEl: Form,
    /**
     *编辑成功后回调
     */
    afterClose: () => {
      // 刷新列表
      tableRef.value.refresh()
    },
  })
}
</script>
