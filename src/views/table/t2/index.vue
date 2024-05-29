<template>
  <div class="table-box">
    <!-- 列表数据 -->
    <v3-table ref="tableRef" :search-props :init-param :columns :request-api>
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
import { usePageList } from '../hooks/usePageList'
import Form from '../components/form/index.vue'
import { useSearch } from './hooks/useSearch'

const tableRef = ref()
const initParam = { roleName: 888, hobby: '2', depid: 125 }

const { searchItems } = useSearch()

const searchProps = {
  searchItems,
  collapse: false,
}
const { columns, requestApi } = usePageList()

onMounted(() => {
  setTimeout(() => {
    // requestApi.value = api.account.getUserPage
  }, 3000)
})

/**
 * 弹窗编辑
 */
function handleEdit(rows) {
  useDialog({
    attrs: { title: '表单编辑' },
    footer: { okText: '提交' },
    props: { oldForm: rows },
    componentEl: Form,
    /**
     * 刷新列表
     */
    afterClose: () => {
    },
  })
}
</script>

<style>

</style>
