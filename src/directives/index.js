// import directives
import auth from './modules/auth'
import debounce from './modules/debounce'
import throttle from './modules/throttle'

const directivesList = {
  auth,
  debounce,
  throttle,
}

const directives = {
  /**
   * 注册自定义指令
   */
  install(app) {
    Object.keys(directivesList).forEach((key) => {
      app.directive(key, directivesList[key])
    })
  },
}

export default directives
