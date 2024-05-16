<template>
  <div class="table-box">
    <!-- 查询 -->
    <v3-search collapse :init-param :form-items="searchItems" @on-search="handleSearch" />

    <!-- 列表数据 -->
    <v3-table ref="tableRef" style="margin-top: 20px;" :init-param :columns :request-api>
      <template #headLeft="{ rows, ids, isSelected }">
        <el-button class="btn" type="primary" @click="onDrawer(rows, ids, isSelected)">
          新建[useDrawer]
        </el-button>
        <el-button class="btn" type="primary" @click="onDialog(rows, ids, isSelected)">
          新建[useDialog]
        </el-button>
        <el-button class="btn" type="primary" @click="visible = true">
          局部弹框v3-ialog
        </el-button>
      </template>
      <template #operation>
        <el-table-column label="操作" width="120px" align="center">
          <template #default="{ row }">
            <el-button type="primary" @click="handleM(row)">
              编辑
            </el-button>
          </template>
        </el-table-column>
      </template>
    </v3-table>
  </div>
</template>

<script setup name="example-table">
import { useSearch } from './hooks/useSearch'
import { usePageList } from './hooks/usePageList'
import Form from './components/form/index.vue'

const tableRef = ref()
const visible = ref(false)
const initParam = { roleName: 888, hobby: '2', depid: 125 }
const { searchItems } = useSearch()

const { columns, requestApi } = usePageList()

onMounted(() => {
  setTimeout(() => {
    // requestApi.value = api.account.getUserPage
  }, 3000)
})

/**
 * 查询
 */
function handleSearch(form) {
  tableRef.value.handleSearch(form)
}

/**
 * 弹窗编辑
 */
function onDialog(rows) {
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

/**
 *弹窗编辑
 */
function onDrawer(rows) {
  useDrawer({
    attrs: { title: '表单编辑' },
    props: { oldForm: rows },
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

<style>

</style>
