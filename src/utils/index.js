function typeOf(obj) {
  const toString = Object.prototype.toString
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object',
  }
  return map[toString.call(obj)]
}
export { typeOf }

// 判断空对象
function isObjEmpty(obj) {
  return obj?.constructor === Object && Reflect.ownKeys(obj).length === 0
}
export { isObjEmpty }

// deepCopy
function deepCopy(data) {
  const t = typeOf(data)
  let o

  if (t === 'array')
    o = []
  else if (t === 'object')
    o = {}
  else
    return data

  if (t === 'array') {
    for (let i = 0; i < data.length; i++)
      o.push(deepCopy(data[i]))
  }
  else if (t === 'object') {
    for (const i in data)
      o[i] = deepCopy(data[i])
  }
  return o
}
export { deepCopy }

export function filterEmptyValue(...rest) {
  const query = Object.assign({}, ...rest)
  for (const key in query) {
    if (!query[key] && query[key] !== 0 && typeof query[key] !== 'boolean')
      delete query[key]
  }
  return query
}

export function findItem(formItems, key) {
  return formItems.find(
    formItem => formItem.attrs && formItem.attrs.key === key,
  )
}

// blob文件流生成本地地址并打开
export function openDoc(blobStream) {
  const localUrl = URL.createObjectURL(blobStream)
  window.open(localUrl)
}

// base64字符转blob
export function base64ToBlob(base64, mime = '') {
  let byteChars // 解码base64后的字符串
  const sliceSize = 1024 // 切割文件按1G循环处理
  const byteArrays = []
  const base64s = base64.split(',')

  const fileType = base64s[0].match(/:(.*?);/)

  if (fileType && fileType.length > 1) {
    mime = fileType[1]
    byteChars = window.atob(base64s[1])
  }
  else {
    byteChars = window.atob(base64)
  }

  for (let offset = 0; offset < byteChars.length; offset += sliceSize) {
    const slice = byteChars.slice(offset, offset + sliceSize)
    const byteNumbers = new ArrayBuffer(slice.length)
    const byteArray = new Uint8Array(byteNumbers)
    for (let i = 0; i < slice.length; i++)
      byteArray[i] = slice.charCodeAt(i)

    byteArrays.push(byteNumbers)
  }

  return new Blob(byteArrays, { type: mime })
}

// 生成唯一标识
export function uuid() {
  const temp_url = URL.createObjectURL(new Blob())
  const uuid = temp_url.toString()
  URL.revokeObjectURL(temp_url)
  return uuid.substring(uuid.length - 36)
}

// 生成随机码
export function randomid() {
  let abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'g', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
  const [max, min] = [Math.floor(Math.random() * (10 - 7 + 1) + 1), Math.floor(Math.random() * (17 - 10 + 1) + 17)]
  abc = abc.sort(() => 0.4 - Math.random()).slice(max, min).slice(0, 8).join('')
  return (abc + new Date().getTime())
}

// 扁平数据结构转Tree
export function arrayToTree(items) {
  if (items && items.length <= 1)
    return items || []

  const result = [] // 存放结果集
  const itemMap = {} //
  for (const item of items) {
    const id = item.id
    const pid = item.parentId

    if (!itemMap[id]) {
      itemMap[id] = {
        children: [],
      }
    }

    itemMap[id] = {
      ...item,
      children: itemMap[id].children,
    }

    const treeItem = itemMap[id]

    if (pid === 0) {
      result.push(treeItem)
    }
    else {
      if (!itemMap[pid]) {
        itemMap[pid] = {
          children: [],
        }
      }
      itemMap[pid].children.push(treeItem)
    }
  }
  return result
}

// 根据字符串、字号计算在html中占用的宽度
export function measureText(txt, fontSize) {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  context.font = `${fontSize}px arial`
  const { width } = context.measureText(txt)
  return width
}
