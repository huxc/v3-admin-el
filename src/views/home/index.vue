<template>
  <div style="margin-top: 50px;">
    <v3-form :model="form" :form-items="searchItems" inline footer />
  </div>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="Approved by">
        <el-input v-model="formInline.user" placeholder="Approved by" clearable />
      </el-form-item>
      <el-form-item label="Activity zone">
        <el-select
          v-model="formInline.region"
          placeholder="Activity zone"
          clearable
        >
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="Activity time">
        <el-date-picker
          v-model="formInline.date"
          type="date"
          placeholder="Pick a date"
          clearable
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary">
          Query
        </el-button>
      </el-form-item>
    </el-form>
  </div>
  <span>
    <el-select
      v-model="formInline.region"
      placeholder="Activity zone"
      clearable
    >
      <el-option label="Zone one" value="shanghai" />
      <el-option label="Zone two" value="beijing" />
    </el-select>

    <el-date-picker
      v-model="formInline.date"
      type="date"
      placeholder="Pick a date"
      clearable
    />
    <el-input v-model="formInline.user" placeholder="Approved by" clearable />
  </span>
</template>

<script setup>
import { useSearch } from '../table/hooks/useSearch.js'

const form = reactive({})
const { searchItems } = useSearch()
const formInline = reactive({
  user: '',
  region: '',
  date: '',
})
</script>

<style lang='scss' scoped>
  .title {
  font-size: 300px;
  color: antiquewhite;
}
</style>
