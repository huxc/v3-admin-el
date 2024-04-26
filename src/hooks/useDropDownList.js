import { useArrayFind } from '@vueuse/core'
import { enumContent, enumProvinceStageName, enumStandard } from './useEnum'

export function findTreeItem(tree, key) {
  return useArrayFind(
    tree,
    treeItem => treeItem.attrs && treeItem.attrs.key === key,
  )
}
// 标准
export const standard = [
  {
    label: '江苏省民用建筑碳排放计算导则',
    value: enumStandard.EN_PROVINCE, // 2
  },
  {
    label: '《建筑碳排放计算标准》GB/T 51366-2019',
    value: enumStandard.EN_STANDARD, // 1
  },
]

// 江苏省导则阶段
export const provinceStage = [
  {
    label: '可研',
    stage: enumProvinceStageName.EN_PROVINCE_STUDY, // 'study'
    value: 1,
  },
  {
    label: '施工图设计',
    stage: enumProvinceStageName.EN_PROVINCE_DRAWER, // 'drawer'
    value: 2,
  },
  {
    label: '验收',
    stage: enumProvinceStageName.EN_PROVINCE_CHECK, // 'check'
    value: 3,
  },
  {
    label: '运维',
    stage: enumProvinceStageName.EN_PROVINCE_OPERATION, // 'operation'
    value: 4,
  },
]

// 计算
export const calcList = [
  {
    title: '总碳排放量',
    unit: 'tCO₂e',
    value: 0,
    flex: 1,
  },
  {
    title: '平均每年碳排放强度',
    unit: 'kgCO₂e/a',
    value: 0,
    flex: 1.5,
  },
  {
    title: '单位面积碳排放强度',
    unit: 'kgCO₂e/㎡',
    value: 0,
    flex: 1.5,
  },
  {
    title: '单位面积/平均每年碳排放强度',
    unit: 'kgCO₂e/(㎡·a)',
    value: 0,
    flex: 1.5,
  },
]

// 列表显示
export const showContent = [
  {
    label: 'table',
    value: enumContent.EN_TABLE, // 1
  },
  {
    label: 'form',
    value: enumContent.EN_FORM, // 2
  },
]

// 建筑状态
export const arcStates = [
  { label: '新建建筑', value: 1 },
  { label: '既有建筑', value: 2 },
]

// 项目阶段
export const projectStages = [
  { label: '可行性研究', value: 1 },
  { label: '初步设计', value: 2 },
  { label: '施工图设计', value: 3 },
  { label: '建造阶段', value: 4 },
  { label: '运行阶段', value: 5 },
  { label: '拆除阶段', value: 6 },
  { label: '再开发阶段', value: 7 },
]

// 结构类型
export const structures = [
  { label: '砖混结构', value: 1 },
  { label: '混凝土剪力墙', value: 2 },
  { label: '钢结构', value: 3 },
  { label: '木结构', value: 4 },
  { label: '玻璃幕墙', value: 5 },
  { label: '其他', value: 6 },
]

// 可研-运行-选择计算方式
export const studyOperationCalcMode = [
  { label: '根据额定指标计算', value: 1 }, // 默认
  { label: '根据各用能系统计算', value: 2 },
]

// 施工图设计-拆除-选择计算方式
export const drawDemolishCalcMode = [
  { label: '按比例系数计算', value: 1 }, // 默认
  { label: '按实际拆除机械工程量计算', value: 2 },
]

// 施工图设计-碳汇-选择计算方式
// 验收-碳汇-选择计算方式
// 运维-碳汇-选择计算方式
export const carbonCalcMode = [
  { label: '按种植方式计算', value: 1 }, // 默认
  { label: '按植物类型计算', value: 2 },
]

// 验收-建造-选择计算方式
export const checkBuildCalcMode = [
  { label: '按总能源用量计算', value: 1 }, // 默认
  { label: '根据施工机械和临时设施计算', value: 2 },
]

// 运维-建造-选择计算方式
export const operationBuildCalcMode = [
  { label: '按总能源用量计算', value: 1 }, // 默认
  {
    label: '根据施工机械和临时设施计算',
    value: 4,
  },
]

// 运维-运行-选择计算方式
export const operationCalcMode = [
  { label: '根据实际能源用量计算', value: 1 }, // 默认
  { label: '根据各用能系统计算', value: 2 },
]

// 运维-运行-插座用电能耗-选择计算方式
export const electricityCalcMode = [
  { label: '按单位面积电器设备功率密度计算', value: 1 }, // 默认
  { label: '按电器设备运行参数计算', value: 2 },
]

// 江苏省导则步骤
export const provinceStagesList = [
  { path: '/project/province/production', name: '建材生产', label: 'production', value: 1 },
  { path: '/project/province/transport', name: '建材运输', label: 'transport', value: 2 },
  { path: '/project/province/building', name: '建造阶段', label: 'building', value: 3 },
  { path: '/project/province/demolish', name: '拆除阶段', label: 'demolish', value: 5 },
  { path: '/project/province/operation', name: '运行阶段', label: 'operation', value: 4 },
  { path: '/project/province/waste', name: '废弃物处置', label: 'waste', value: 6 },
  { path: '/project/province/carbon', name: '碳汇', label: 'carbon', value: 7 },
]

// 51366步骤
export const stages51366List = [
  { path: '/project/51366/production', name: '建材生产', value: 1 },
  { path: '/project/51366/transport', name: '建材运输', value: 2 },
  { path: '/project/51366/building', name: '建造阶段', value: 3 },
  { path: '/project/51366/operation', name: '运行阶段', value: 4 },
  { path: '/project/51366/demolition', name: '拆除阶段', value: 5 },
]

export const consumptionUnit = [
  { label: 'kg柴油', value: 1 },
  { label: 'kg汽油', value: 2 },
  { label: 'kWh电', value: 3 },
]

// 自定义因子来源
export const customFactorSource = [
  { name: '实测数据', value: 1 }, // 默认
  { name: '研究数据', value: 2 },
]

export const wasteType = [
  { label: '混凝土', value: 1 },
  { label: '砖和砌块', value: 2 },
  { label: '金属', value: 4 },
  { label: '玻璃', value: 5 },
]

// 用水计算单位数（生活热水）
export const livingUnit = [
  { label: '人', value: 1 }, // 默认
  { label: '面积㎡', value: 2 },
]

// 热水能源形式
export const livingEnergy = [
  { label: '电力', value: 1 }, // 默认
  { label: '燃气', value: 2, disabled: true },
]

// 电器种类
export const electricityType = [
  { label: '冰箱', value: 1 },
  { label: '电脑', value: 2 },
  { label: '打印机', value: 3 },
  { label: '电视', value: 4 },
  { label: '洗衣机', value: 5 },
  { label: '其他', value: 6 },
]

export function defaultRes(result, isMinus) {
  return [
    {
      title: isMinus ? '总减碳量' : '总碳排放量',
      unit: 'tCO₂e',
      value: result?.carbonSum,
      flex: 1,
    },
    {
      title: isMinus ? '平均每年减碳强度' : '平均每年碳排放强度',
      unit: 'kgCO₂e/a',
      value: result?.carbonAvgYear,
      flex: 1.5,
    },
    {
      title: isMinus ? '单位面积减碳强度' : '单位面积碳排放强度',
      unit: 'kgCO₂e/㎡',
      value: result?.carbonUnitArea,
      flex: 1.5,
    },
    {
      title: isMinus ? '单位面积/平均每年减碳强度' : '单位面积/平均每年碳排放强度',
      unit: 'kgCO₂e/(㎡·a)',
      value: result?.carbon,
      flex: 1.5,
    },
  ]
}

// 用水单位数（日常用水）
export const waterUseUnit = [
  { label: '人', value: 1 },
  { label: '床位', value: 2 },
  { label: '㎡', value: 3 },
]

// 数据权限
export const dataPermissions = [
  { label: '全部数据', value: 1 },
  { label: '仅本人数据', value: 0 },
]
