<template>
  <div>
    <el-descriptions
      title="客户详情"
      direction="vertical"
      :column="4"
      size="Default"
      border
    >
      <el-descriptions-item label="头像">
        <el-image
          style="width: 50px;height: 50px;"
          class="el-upload-list__item-thumbnail" :src="row.avatar" :zoom-rate="1.2"
          :max-scale="7"
          :min-scale="0.2"
          :preview-src-list="[row.avatar]"
          fit="cover"
        />
      </el-descriptions-item>
      <el-descriptions-item label="姓名">
        {{ row.name }}
      </el-descriptions-item>
      <el-descriptions-item label="性别">
        {{ row.gender === 1 ? '女' : '男' }}
      </el-descriptions-item>
      <el-descriptions-item label="年龄">
        {{ row.age }}
      </el-descriptions-item>
      <el-descriptions-item label="身份证">
        {{ row.id_card }}
      </el-descriptions-item>
      <el-descriptions-item label="邮箱">
        {{ row.email }}
      </el-descriptions-item>
      <el-descriptions-item label="状态">
        <el-tag :type="row.status === 1 ? 'success' : 'danger'">
          {{ row.status === 1 ? '启用' : '禁用' }}
        </el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="创建时间">
        {{ row.created_at }}
      </el-descriptions-item>
      <el-descriptions-item label="地址">
        {{ row.address }}
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script setup>
defineProps({
  row: Object,
})
</script>

<style scoped lang="scss"></style>
