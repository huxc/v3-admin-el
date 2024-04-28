import { defineStore } from 'pinia'
import piniaPersistConfig from '../persist'
import router from '@/routers/index.js'
import { HOME_URL, TABS_BLACK_LIST } from '@/config/globalVariables.js'

function tabs() {
  const tabsState = reactive({
    tabsMenuValue: '/home',
    tabsMenuList: [
      { title: '工作台', path: '/home', fullPath: '/home', icon: 'home-filled', close: false },
    ],
  })

  // 替换首页
  const replaceTabsFirst = (tabFirst) => {
    tabsState.tabsMenuList.splice(0, 1, tabFirst)
  }

  const addTabs = (tabItem) => {
    if (TABS_BLACK_LIST.includes(tabItem.path))
      return
    const tabInfo = {
      title: tabItem.title,
      path: tabItem.path,
      fullPath: tabItem.fullPath,
      close: tabItem.close,
    }
    if (tabsState.tabsMenuList.every(item => item.path !== tabItem.path))
      tabsState.tabsMenuList.push(tabInfo)

    setTabsMenuValue(tabItem.path)
    router.push(tabItem.fullPath)
  }

  const removeAllTabs = () => {
    tabsState.tabsMenuList = [
      { title: '工作台', path: '/home', fullPath: '/home', icon: 'home-filled', close: false },
    ]
  }

  const removeTabs = (tabPath) => {
    let tabsMenuValue = tabsState.tabsMenuValue
    const tabsMenuList = tabsState.tabsMenuList
    if (tabsMenuValue === tabPath) {
      tabsMenuList.forEach((item, index) => {
        if (item.path !== tabPath)
          return
        const nextTab = tabsMenuList[index + 1] || tabsMenuList[index - 1]
        if (!nextTab)
          return
        tabsMenuValue = nextTab.path
        router.push(nextTab.fullPath)
      })
    }
    tabsState.tabsMenuValue = tabsMenuValue
    tabsState.tabsMenuList = tabsMenuList.filter(
      item => item.path !== tabPath,
    )
  }

  // 根据path修改title
  const modifyTabsTitle = (path, title) => {
    const tab = tabsState.tabsMenuList.find(i => i.path === path)
    if (tab)
      tab.title = title
  }

  const changeTabs = (tabItem) => {
    tabsState.tabsMenuList.forEach((item) => {
      if (item.title === tabItem.label)
        router.push(item.fullPath)
    })
  }

  const setTabsMenuValue = (tabsMenuValue) => {
    tabsState.tabsMenuValue = tabsMenuValue
  }

  const setTabsMenuList = (tabsMenuList) => {
    tabsState.tabsMenuList = tabsMenuList
  }

  // 关闭多个tabs
  const closeMultipleTab = (tabsMenuValue) => {
    tabsState.tabsMenuList = tabsState.tabsMenuList.filter((item) => {
      return item.path === tabsMenuValue || item.path === HOME_URL
    })
  }
  // 首页
  const goHome = () => {
    router.push(HOME_URL)
    tabsState.tabsMenuValue = HOME_URL
  }

  return {
    addTabs,
    goHome,
    removeTabs,
    changeTabs,
    closeMultipleTab,
    setTabsMenuList,
    setTabsMenuValue,
    replaceTabsFirst,
    modifyTabsTitle,
    removeAllTabs,
    ...toRefs(tabsState),
  }
}
export const tabsStore = defineStore('tabsStore', tabs, { persist: piniaPersistConfig('tabsStore') })
