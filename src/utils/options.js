import { get } from 'lodash-es'

export function findTreeItem(tree, key) {
  return tree.find(item => item.attrs && item.attrs.key === key)
}

/**
 * @description 设置表单Option值的通用方法.
 * @param {Array} tree - 要设置的formItem数组.
 * @param {string} key - 要设置的formItem的某个对象key.
 * @param {Array} data - 赋给option的值.
 * @param {attrName} param - 赋值的属性默认是option.
 */
export function setAttribute(tree, key, data, attrName = 'options') {
  const finditem = findTreeItem(tree, key)
  if (finditem)
    finditem.attrs[attrName] = data
}

/**
 * @description 设置表单Option值的通用方法.
 * @param {number} getOptions - 请求接口函数.
 * @param {number} tree - 要设置的formItem数组.
 * @param {number} key - 要设置的formItem的某个对象key.
 * @param {number} okey - 接口返回的值(okey:可以是路径)赋值给option.
 * @param {number} param - 请求参数.
 */
export async function getOptions({ getOptions, tree, key, okey = 'data', param = {}, attrName = 'options' }) {
  try {
    const res = await getOptions(param, { isLoading: false })
    const data = get(res, okey)
    setAttribute(tree, key, data, attrName)
  }
  catch (error) {
    ElMessage.error(`${error.msg || '错误'}`)
  }
}
