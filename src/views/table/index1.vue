<template>
  <div class="table-box" style="position:relative">
    <v3-table
      ref="tableRef" :search-props :init-param :columns :request-api
    >
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
    <v3-dialog v-model="visible">
      <span style="font-size:30px">弹框内容</span>
    </v3-dialog>
  </div>
</template>

<script setup name="example-table">
import { useSearch } from './hooks/useSearch'
import { usePageList } from './hooks/usePageList'
import Form from './components/form/index.vue'

const tableRef = ref()
const visible = ref(false)
const initParam = { roleName: 888, hobby: '2', depid: 5 }
const searchProps = useSearch()

const { columns, requestApi } = usePageList()

onMounted(() => {
  setTimeout(() => {
    // requestApi.value = api.account.getUserPage
  }, 3000)
})

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
