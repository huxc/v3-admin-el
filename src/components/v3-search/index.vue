<template>
  <DefineTemplate v-slot="{ handleName, icon, visible }">
    <el-button class="footer-btn" type="primary" @click="onSearch">
      <v3-icon class="btn-icon" icon="ep:search" />搜索
    </el-button>
    <el-button class="footer-btn" type="info" @click="onReset">
      <v3-icon class="btn-icon" icon="system-uicons:reset-alt" />重置
    </el-button>
    <el-button v-if="collapse" text type="primary" @click="onCollapse(visible)">
      {{ handleName }}<v3-icon class="btn-icon-reset" :icon />
    </el-button>
  </DefineTemplate>

  <v3-collapse-transition ref="collapseRef" :is-over-btn="false" :collapse-height="70">
    <div class="search-x card">
      <div class="form-x">
        <v3-form ref="formRef" :model="searchForm" :form-items inline footer :submit-msg="false" :reset-msg="false">
          <template #before-btns>
            <ReuseTemplate handle-name="合并" :visible="true" icon="ep:arrow-up-bold" />
          </template>
        </v3-form>
      </div>
      <template v-if="collapse">
        <Transition name="fade" mode="out-in">
          <div v-show="isOver" class="btn-x">
            <ReuseTemplate :visible="false" handle-name="展开" icon="ep:arrow-down-bold" />
          </div>
        </Transition>
      </template>
    </div>
  </v3-collapse-transition>
</template>

<script setup>
import { onMounted } from 'vue'

const props = defineProps({
  // 是否开启折叠功能
  collapse: {
    type: Boolean,
    default: false,
  },
  // 默认是否折叠
  isOver: {
    type: Boolean,
    default: false,
  },

  initParam: {
    type: Object,
    /**
     *默认的查询条件
     */
    default: () => ({}),
  },

  formItems: {
    type: Array,
    /**
     * 表单json
     */
    default: () => [],
  },
})

const emit = defineEmits(['onSearch', 'afterReset'])

const formRef = ref()
const collapseRef = ref()
const isOver = ref(props.isOver)
const searchForm = reactive({})

const [DefineTemplate, ReuseTemplate] = createReusableTemplate()

onMounted(() => {
  Object.assign(searchForm, props.initParam)
})

/**
 * 查询
 */
function onSearch() {
  formRef.value.promiseSubmit().then(() => {
    emit('onSearch', searchForm)
  })
}
/**
 * 重置
 */
function onReset() {
  formRef.value.handleReset()
  emit('afterReset')
}

/**
 * 折叠合并事件
 */
function onCollapse(visible) {
  isOver.value = collapseRef.value.handleCollapse(visible)
}
</script>

<style>
.search-x {
  display: flex;
}
.form-x {
  flex: 1;
}
.btn-x {
  width: 270px;
}
.btn-icon {
  color: #ffffff;
  margin-right: 6px;
}
.btn-icon-reset {
  color: var(--el-color-primary);
  margin-left: 6px;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s;
}
.fade-enter-from {
  opacity: 0;
  transition: all 0.4s;
}
.fade-leave-to {
  opacity: 0;
  transition: all 0.26s;
}
</style>
