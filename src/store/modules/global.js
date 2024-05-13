import { reactive, toRefs } from 'vue'
import { defineStore } from 'pinia'
import piniaPersistConfig from '../persist'

/**
 * 使用setup模式定义
 */
function store() {
  const globalConfig = reactive({
    // element组件大小
    assemblySize: 'default', // small default
    // 控制菜单隐藏显示
    isCollapse: false,
    // 语言
    language: 'zh',
    bgColor: 'red',
  })

  /**
   * 设置Element组件大小
   */
  const setAssemblySizeSize = (assemblySize) => {
    globalConfig.assemblySize = assemblySize
  }

  /**
   * 设置语言
   */
  const updateLanguage = (language) => {
    globalConfig.language = language
  }

  /**
   * 设置菜单是否显示
   */
  const setCollapse = () => {
    globalConfig.isCollapse = !globalConfig.isCollapse
  }

  return { ...toRefs(globalConfig), setAssemblySizeSize, updateLanguage, setCollapse }
}

export const useGlobalStore = defineStore('globalState', store, { persist: piniaPersistConfig('globalState') })
