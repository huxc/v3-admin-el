const modules = {}

const files = import.meta.glob('./modules/*.js', { eager: true })

Object.keys(files).forEach((key) => {
  modules[key.replace(/(\.\/modules\/|\.js)/g, '')] = files[key].default
})

export default modules
