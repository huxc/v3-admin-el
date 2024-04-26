const files = import.meta.glob('./modules/*.js')
const modules = {}

Object.keys(files).forEach((key) => {
  modules[key.replace(/(\.\/modules\/|\.js)/g, '')] = files[key].default
})
export default modules
