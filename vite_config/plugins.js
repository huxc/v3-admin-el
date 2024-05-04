/* eslint-disable node/prefer-global/process */
import { basename, extname, resolve } from 'node:path'
import { globSync } from 'glob'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import ElementPlus from 'unplugin-element-plus/vite'
import Components from 'unplugin-vue-components/vite'
import viteCompression from 'vite-plugin-compression'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import vueSetupExtend from 'unplugin-vue-setup-extend-plus/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export function createVitePlugins(viteEnv) {
  const { VITE_GLOB_APP_TITLE } = viteEnv
  return [
    vue(),
    // vue 可以使用 jsx/tsx 语法
    vueJsx(),
    // name 可以写在 script 标签上
    vueSetupExtend({}),
    // 为 Element Plus 按需引入样式
    ElementPlus(),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        '@vueuse/core',
        getApiKeys()
      ],
      // dirs: ['./src/api'],
      resolvers: [
        ElementPlusResolver(),
      ],
      eslintrc: {
        enabled: true,
      },
    }),
    Components({
      dirs: ['src/components/'],
      extensions: ['vue'],
      resolvers: [
        ElementPlusResolver(),
      ],
    }),
    // 创建打包压缩配置
    createCompression(viteEnv),

    // 注入变量到 html 文件
    createHtmlPlugin({
      minify: true,
      inject: {
        data: { title: VITE_GLOB_APP_TITLE },
      },
    }),

    // 使用 svg 图标
    createSvgIconsPlugin({
      iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
      symbolId: 'icon-[dir]-[name]',
    }),
  ]
}

/**
 * @description 根据 compress 配置，生成不同的压缩规则
 * @param viteEnv
 */
function createCompression(viteEnv) {
  const { VITE_BUILD_COMPRESS = 'none', VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE } = viteEnv
  const plugins = []
  const compressList = VITE_BUILD_COMPRESS.split(',')
  if (compressList.includes('gzip')) {
    plugins.push(
      viteCompression({
        ext: '.gz',
        algorithm: 'gzip',
        deleteOriginFile: VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE,
      }),
    )
  }
  if (compressList.includes('brotli')) {
    plugins.push(
      viteCompression({
        ext: '.br',
        algorithm: 'brotliCompress',
        deleteOriginFile: VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE,
      }),
    )
  }
  return plugins
};

function getApiKeys() {
  const modules = {
    '../helper/index': ['useRequest']
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
