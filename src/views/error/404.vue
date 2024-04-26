<template>
  <div class="errPage-container">
    <el-row>
      <el-col :span="12">
        <h2> 404 没有找到对应的页面</h2>
        <h6 style="margin: 20px 0;">
          请检查网址是否正确
        </h6>
        <router-link v-if="state.type" :to="state.type === 1 ? '/home' : '/guest/home'" style="text-decoration: none;">
          <el-button type="primary" class="pan-back-btn" @click="back">
            返回首页
          </el-button>
        </router-link>
      </el-col>
      <el-col :span="12">
        <!-- <img src="/images/401.gif" width="313" height="428" alt="Girl has dropped her ice cream."> -->
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import appStore from '@/store'

const { state } = storeToRefs(appStore.userStore)
</script>

<style lang="scss" scoped>
.errPage-container {
    width: 800px;
    max-width: 100%;
    margin: 100px auto;

    .pan-back-btn {
        color: #fff;
        border: none !important;
        text-align: center;
    }

    .pan-gif {
        margin: 0 auto;
        display: block;
    }

    .pan-img {
        display: block;
        margin: 0 auto;
        width: 100%;
    }

    .text-jumbo {
        font-size: 60px;
        font-weight: 700;
        color: #484848;
    }

    .list-unstyled {
        font-size: 14px;

        li {
            padding-bottom: 5px;
        }

        a {
            color: #008489;
            text-decoration: none;

            &:hover {
                text-decoration: underline;
            }
        }
    }
}
</style>
