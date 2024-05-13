/**
 * 合并路径
 */
export function resolve(...paths) {
  let resolvePath = ''
  let isAbsolutePath = false
  for (let i = paths.length - 1; i > -1; i--) {
    const path = paths[i]
    if (isAbsolutePath)
      break

    if (!path)
      continue

    resolvePath = `${path}/${resolvePath}`
    isAbsolutePath = path.charCodeAt(0) === 47
  }
  if (/^\/+$/.test(resolvePath)) {
    resolvePath = resolvePath.replace(/(\/+)/, '/')
  }
  else {
    resolvePath = resolvePath.replace(/(?!^)\w+\/+\.{2}\//g, '')
      .replace(/(?!^)\.\//g, '')
      .replace(/\/+$/, '')
  }
  return resolvePath
}
