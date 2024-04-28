<template>
  <!-- 列显隐设置 -->
  <el-drawer v-model="drawerVisible" title="列设置" size="400" :close-on-click-modal="false">
    <div class="table-box">
      <el-table :data="colSetting" :border="true">
        <el-table-column prop="label" label="列名" width="180" />
        <el-table-column v-slot="scope" prop="name" label="显示" width="180">
          <el-switch v-model="scope.row.isShow" @change="switchShow" />
        </el-table-column>
        <template #empty>
          <div class="table-empty">
            <img src="/images/notData.png" alt="notData">
            <div>暂无数据</div>
          </div>
        </template>
      </el-table>
    </div>
  </el-drawer>
</template>

<script setup name="colSetting">
const props = defineProps({
  tableRef: { type: Object },
  colSetting: {
    type: Array,
    default: () => []
  }
})

const drawerVisible = ref(false)

// 打开列设置
function openColSetting() {
  drawerVisible.value = true
}

// 列显隐时重新布局 table
function switchShow() {
  nextTick(() => {
    props.tableRef.doLayout()
  })
}

defineExpose({
  openColSetting,
})
</script>
