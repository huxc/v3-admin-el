import { basename, extname } from 'node:path'
import { globSync } from 'glob'

export function getApiKeys() {
  const modules = {
    '@/api/helper/index': ['useRequest'],
    '@/hooks/useDialog': ['useDialog'],
    '@/hooks/useDrawer': ['useDrawer'],
    '@/hooks/useHandleData': ['useHandleData'],
    '@/hooks/useEcharts': ['useEcharts'],
    }
  const files = globSync('./src/api/modules/*.js')
  files.forEach((file) => {
    const fileName = basename(file, extname(file))
    const key = `@/api/modules/${fileName}`
    const fns = require(`../src/api/modules/${fileName}.js`)
    modules[key] = Object.keys(fns).reduce((pre, cur) => {
      return pre.push([cur, `api_${fileName}_${cur}`]), pre
    }, [])
  })
  return modules
}
