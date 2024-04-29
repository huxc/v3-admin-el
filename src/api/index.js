const modules = {}

const files = import.meta.glob('./modules/*.js', { eager: true })

// Object.keys(files).forEach((key) => {
//   const fileName = key.replace(/(\.\/modules\/|\.js)/g, '')
//   const fileObject = files[key].default
//   Object.keys(fileObject).forEach((itemKey) => {
//     const attrName = `${fileName}_${itemKey}`
//     modules[attrName] = fileObject[itemKey]
//   })
// })

Object.keys(files).forEach((key) => {
  modules[key.replace(/(\.\/modules\/|\.js)/g, '')] = files[key].default
})

export default modules
