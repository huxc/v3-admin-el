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
import { useTable } from '../hooks/useTable.js'
import Form from './components/form/index.vue'
import { useSearch } from './hooks/useSearch'

const tableRef = ref()

const { searchItems } = useSearch()

const searchProps = {
  searchItems,
  collapse: false,
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
    footer: { okText: '提交' },
    props: { oldForm: rows },
    componentEl: Form,
    // eslint-disable-next-line jsdoc/require-jsdoc
    beforeClose: (done) => {
      done()
    },
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

<style>

</style>
