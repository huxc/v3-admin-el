import { getOptions } from '@/utils/options'

export function getDepOptions(tree, key) {
  getOptions({
    tree,
    key,
    getOptions: api_account_gettDepartments,
  })
}
