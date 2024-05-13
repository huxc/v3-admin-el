/* eslint-disable jsdoc/require-description */
import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { dynamicRouter } from '@/routers/helper/dynamicRouter'
import { filterAsyncRoutes, splitPageAndBtn } from '@/utils/auth'

// 使用setup模式定义
/**
 *
 */
function storeSetup() {
  const authCodes = ref(null) // 所有权限code
  const asyncRoutes = ref(null) // 根据权限code过滤后的动态路由

  const state = reactive({
    access_token: '',
  })

  const getToken = computed(() => `${state.token_type} ${state.access_token}`)

  /**
   *
   */
  const refToken = (data) => {
    Object.assign(state, data)
  }

  // 清空登录信息state
  /**
   *
   */
  const clearState = () => {
    Object.keys(state).forEach((key) => {
      delete state[key]
    })
  }

  /**
   *
   */
  const clearAll = () => {
    state.access_token = null
    authCodes.value = null
    asyncRoutes.value = null
  }

  // 登录
  /**
   *
   */
  const logIn = (loginForm) => {
    return new Promise((resolve, reject) => {
      api.login.postSystemOauthToken(loginForm)
        .then(({ data }) => {
          refToken(data)
          resolve(data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  // 登出
  /**
   *
   */
  const loginOut = () => {
    clearState()
    api.login.loginOut().then()
  }

  // 获取权限code 过滤动态路由
  /**
   *
   */
  const generateRoutes = () => {
    return new Promise((resolve, reject) => {
      // 如果是管理员应用所有权限
    //   if (state.username === 'admin') {
      if (true) {
        asyncRoutes.value = dynamicRouter
        resolve(asyncRoutes.value)
      }
      else {
        api.resource
          .getLoginUser()
          .then((res) => {
            // 根据接口 获取所有按钮权限 和 页面权限
            const { btnAuths, pageAuths } = splitPageAndBtn(res.data)
            authCodes.value = btnAuths
            // 根据页面权限code 动态获取过滤路由集合
            asyncRoutes.value = filterAsyncRoutes(dynamicRouter, pageAuths)
            resolve(asyncRoutes.value)
          }, (err) => {
            reject(err)
          })
      }
    })
  }

  return {
    logIn,
    state,
    authCodes,
    asyncRoutes,
    getToken,
    refToken,
    loginOut,
    clearState,
    clearAll,
    generateRoutes,
  }
}

export const useUserStore = defineStore('userStore', storeSetup, {
  persist: {
    storage: sessionStorage,
    paths: ['state'],
  },
})
