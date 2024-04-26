import { createApp } from 'vue'
import { Icon } from '@iconify/vue'
import App from './App.vue'
import pinia from '@/store'

import directives from '@/directives' // 自定义指令
import router from '@/routers'

import 'virtual:svg-icons-register' // svg

import '@/styles/reset.scss'
import '@/styles/element.scss'
import '@/styles/common.scss'
import 'animate.css'

const app = createApp(App)

app.use(router).use(directives).use(pinia)

app.component('Icon', Icon)

app.mount('#app')

window.vm = app
