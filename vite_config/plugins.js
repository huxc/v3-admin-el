import { createHtmlPlugin } from 'vite-plugin-html'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import viteCompression from 'vite-plugin-compression'
import AutoImport from 'unplugin-auto-import/vite'
import ElementPlus from 'unplugin-element-plus/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export function createVitePlugins(viteEnv) {
  const { VITE_GLOB_APP_TITLE } = viteEnv
  return [
    vue(),
    // vue 可以使用 jsx/tsx 语法
    vueJsx(),
    // 为 Element Plus 按需引入样式
    ElementPlus(),
    AutoImport({
      imports: ['vue', 'vue-router'],
      dirs: ['./src/api'],
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
