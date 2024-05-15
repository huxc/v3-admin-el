/**
 * 去空格
 */
const trim = function (string) {
  return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '')
}

/**
 * 查询class是否存在
 */
export function hasClass(el, cls) {
  if (!el || !cls)
    return false
  if (cls.includes(' '))
    throw new Error('className不应该包含空格')
  if (el.classList)
    return el.classList.contains(cls)
  else
    return (` ${el.className} `).includes(` ${cls} `)
};

/**
 * 添加class
 */
export function addClass(el, cls) {
  if (!el)
    return
  let curClass = el.className
  const classes = (cls || '').split(' ')

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i]
    if (!clsName)
      continue

    if (el.classList)
      el.classList.add(clsName)
    else if (!hasClass(el, clsName))
      curClass += ` ${clsName}`
  }
  if (!el.classList)
    el.setAttribute('class', curClass)
};

/**
 * 删除class
 */
export function removeClass(el, cls) {
  if (!el || !cls)
    return
  const classes = cls.split(' ')
  let curClass = ` ${el.className} `

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i]
    if (!clsName)
      continue

    if (el.classList)
      el.classList.remove(clsName)
    else if (hasClass(el, clsName))
      curClass = curClass.replace(` ${clsName} `, ' ')
  }
  if (!el.classList)
    el.setAttribute('class', trim(curClass))
};
