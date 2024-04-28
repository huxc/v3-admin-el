<template>
  <div class="hello">
    <v3-table-pro
      ref="tableRef"
      select-visible :columns="columns" :request-api="requestApi" :query-columns="searchItems"
      :refresh-state="refresh"
    >
      <template #headLeft="{ rows, ids, isSelected }">
        <el-button class="btn" type="primary" @click="handelCreate(rows, ids, isSelected)">
          新建
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
    </v3-table-pro>
  </div>
</template>

<script setup name="example-table">
import { useSearch } from './hooks/useSearch'
import { usePageList } from './hooks/usePageList'
import Form from './components/form/index.vue'
import { useDialog } from '@/hooks/useDialog'

const tableRef = ref()
const { searchItems } = useSearch()
const { columns, requestApi } = usePageList()

function handelCreate(rows, ids, isSelected) {
  console.warn('🚀 ~ handelCreate ~ rows, ids, isSelected:', rows, ids, isSelected)
  useDialog({
    attrs: { title: '表单编辑' },
    props: { oldForm: { name: 8888 } },
    componentEl: Form,
    beforeClose: () => {
      tableRef.value.refresh()
    }
  })
}
</script>
