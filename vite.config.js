import { resolve } from 'node:path'
import dayjs from 'dayjs'
import { defineConfig, loadEnv } from 'vite'
import pkg from './package.json'
import { wrapperEnv } from './vite_config/getEnv'
import { createVitePlugins } from './vite_config/plugins'

const { dependencies, devDependencies, name, version } = pkg
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // eslint-disable-next-line node/prefer-global/process
  const env = loadEnv(mode, process.cwd())

  // 取所有变量，包含数值转换
  const viteEnv = wrapperEnv(env)

  return {
    base: viteEnv.VITE_PUBLIC_PATH,
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
        '/icons': resolve(__dirname, './src/assets/icons'),
        '/images': resolve(__dirname, './src/assets/images'),
      },
    },
    plugins: createVitePlugins(viteEnv),

    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/el-var.scss" as *;`,
        },
      },
    },

    esbuild: {
      drop: viteEnv.VITE_DROP_CONSOLE ? ['console', 'debugger'] : [],
    },
    build: {
      outDir: viteEnv.VITE_OUTPUT_DIR,
      sourcemap: false,
      // 禁用 gzip 压缩大小报告，可略微减少打包时间
      reportCompressedSize: false,
      // 规定触发警告的 chunk 大小
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        output: {
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
          assetFileNames: '[ext]/[name]-[hash].[ext]',
        },
      },
    },
    server: {
      host: '0.0.0.0',
      port: viteEnv.VITE_PORT,
      open: viteEnv.VITE_OPEN,
      cors: true,
    },
  }
})
