import { getOptions } from '@/utils/options'

/**
 * 获取下拉值
 */
export function getDepOptions(tree, key) {
  getOptions({
    tree,
    key,
    getOptions: api_account_gettDepartments,
  })
}
