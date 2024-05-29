<template>
  <div class="table-box">
    <!-- 列表数据 -->
    <v3-table ref="tableRef" :columns :request-api>
      <template #headLeft="{ ids, isSelected }">
        <el-button class="btn" auto-insert-space type="primary" @click="handleEdit()">
          <v3-icon class="table-ico" icon="ep:circle-plus" />新增客户
        </el-button>
        <el-button type="danger" auto-insert-space plain :disabled="!isSelected" @click="handleDel(ids)">
          <v3-icon class="table-ico" icon="ep:delete" />批量删除客户
        </el-button>
      </template>
      <template #operation>
        <el-table-column label="操作" width="150px" align="center">
          <template #default="{ row }">
            <el-button type="primary" link @click="handleEdit(row)">
              <v3-icon class="table-ico" icon="ep:edit-pen" />编辑
            </el-button>
            <el-button type="primary" link @click="handleDel([row.id])">
              <v3-icon class="table-ico" icon="ep:delete" />删除
            </el-button>
          </template>
        </el-table-column>
      </template>
    </v3-table>
  </div>
</template>

<script setup name="example-table">
import { usePageList } from '../hooks/usePageList'
import Form from '../components/form/index.vue'

const tableRef = ref()

const { columns, requestApi } = usePageList()

/**
 * 批量删除
 */
function handleDel(ids) {
  useHandleData(api_user_deleteCustomers, ids, '确认删除？').then(() => {
    tableRef.value.refresh()
  })
}
/**
 *弹窗编辑
 */
function handleEdit(row) {
  row = row ?? {} //   对实时数据要求较高的项目 此处应根据id读取row
  useDrawer({
    attrs: { title: '表单' },
    props: { oldForm: row },
    componentEl: Form,
    /**
     * 刷新列表
     */
    beforeClose: (done) => {
      tableRef.value.refresh()
      done()
    },
  })
}
</script>
