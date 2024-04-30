<template>
  <div class="hello">
    <v3-table
      ref="tableRef" :search-props :columns :request-api
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
    </v3-table>
  </div>
</template>

<script setup name="example-table">
import { onMounted } from 'vue'
import { useSearch } from './hooks/useSearch'
import { usePageList } from './hooks/usePageList'
import Form from './components/form/index.vue'
import { useDialog } from '@/hooks/useDialog'

const tableRef = ref()

const searchProps = useSearch()

const { columns, requestApi } = usePageList()
onMounted(() => {
  setTimeout(() => {
    requestApi.value = api.account.getUserPage
  }, 3000)
})

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
