import { get } from 'lodash-es'
import { useArrayFind } from '@vueuse/core'

export function findTreeItem(tree, key) {
  return useArrayFind(
    tree,
    treeItem => treeItem.attrs && treeItem.attrs.key === key,
  )
}

export function setAttribute(tree, key, data, attrName = 'options') {
  const finditem = findTreeItem(tree, key)
  if (finditem)
    finditem.value.attrs[attrName] = data
}

// 获取建筑类型
export function getBuildType(tree, key) {
  const httpApi = api.buildTypeData.getDataBuildTypeDataTree
  getApiDropList(httpApi, tree, key)
}

// 获取建材数据库一级分类
export function getStandardTree(tree, key) {
  const httpApi = api.standardProductData.getStandardTree
  getApiDropList(httpApi, tree, key)
}

// 运输方式
export function getTransportTree(tree, key) {
  const httpApi = api.standardTransportData.getDataStandardTransportDataTree
  getApiDropList(httpApi, tree, key)
}

// 设置下拉列表值的通用方法
async function getApiDropList(httpApi, tree, key, okey = 'data', param = {}) {
  try {
    const res = await httpApi(param, { isLoading: false })
    const item = tree.find(i => i.attrs && i.attrs.key === key)
    if (item)
      item.attrs.options = get(res, okey)
  }
  catch (error) {
    ElMessage.error(`${error.msg || '错误'}`)
  }
}

// 建材数据库-查询tree
export function getDataGuideProductDataTree(tree, key) {
  const httpApi = api.guideProductData.getDataGuideProductDataTree
  getApiDropList(httpApi, tree, key)
}

// 建材数据库-查询单个
export function getProductData(tree, key, id) {
  const httpApi = api.guideProductData.getProductData
  getApiDropList(httpApi, tree, key, 'data.list', {
    id,
  })
}

// 运输阶段数据库-查询tree
export function getDataGuideTransportDataTree(tree, key) {
  const httpApi = api.guideTransportData.getDataGuideTransportDataTree
  getApiDropList(httpApi, tree, key)
}

// 建造阶段数据库
export function getDataGuideCreatList(tree, key, cityId) {
  const httpApi = api.guideCreat.getDataGuideCreatList
  getApiDropList(httpApi, tree, key, 'data', { cityId })
}

// 碳汇数据库
export function getDataGuideCarbonSinkList(tree, key, type) {
  const httpApi = api.guideCarbonSink.getDataGuideCarbonSinkList
  getApiDropList(httpApi, tree, key, 'data', {
    type,
  })
}

// 电梯
export function getDataGuideRunningElevatorList(tree, key) {
  const httpApi = api.guideRunningElevator.getDataGuideRunningElevatorList
  getApiDropList(httpApi, tree, key)
}

// 角色
export function getRoleList(tree, key, determine) {
  const httpApi = api.role.getRoleList
  getApiDropList(httpApi, tree, key, 'data.list', {
    pageNum: 1,
    pageSize: 999,
    code: 'BUTTON_NEW_4',
    determine,
  })
}
