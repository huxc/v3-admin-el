<template>
  <div class="table-box" style="position: relative;">
    <!-- 列表数据 -->
    <v3-table ref="tableRef" :search-props :init-param :columns :request-api>
      <template #operation>
        <el-table-column label="操作" width="120px" align="center">
          <template #default="{ row }">
            <el-button link type="primary" @click="handleDlg(row)">
              <v3-icon class="table-ico" icon="ep:view" />详情
            </el-button>
          </template>
        </el-table-column>
      </template>
    </v3-table>
    <v3-dialog v-model="visible">
      <Detail :key="selectRow?.id" :row="selectRow" />
    </v3-dialog>
  </div>
</template>

<script setup name="example-table">
import { useTable } from '../hooks/useTable'
import { useQuery } from './hooks/useQuery'
import Detail from './components/detail.vue'

const tableRef = ref()
const selectRow = ref()
const visible = ref(false)

// 初始化查询参数默认值
const initParam = { gender: 2 }
const searchProps = useQuery()

const { columns, requestApi } = useTable()

/**
 * 查看详情
 */
function handleDlg(row) {
  selectRow.value = row
  visible.value = true
}
</script>
