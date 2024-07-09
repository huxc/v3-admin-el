/// <reference types="vite/client" />
interface ImportMetaEnv {
  // Auto generate by env-parse
  /**
   * title
   */
  readonly VITE_GLOB_APP_TITLE: string
  /**
   * 公共基础路径
   */
  readonly VITE_PUBLIC_PATH: string
  /**
   * 打包输入的文件夹
   */
  readonly VITE_OUTPUT_DIR: string
  /**
   * 是否启用微服务域名
   */
  readonly VITE_IS_MICRO_SERVICE: boolean
  /**
   * 本地运行端口号
   */
  readonly VITE_PORT: number
  /**
   * 启动时自动打开浏览器
   */
  readonly VITE_OPEN: boolean
  /**
   * 打包后是否生成包分析文件
   */
  readonly VITE_REPORT: boolean
  /**
   * 打包时是否删除 console
   */
  readonly VITE_DROP_CONSOLE: boolean
  /**
   * 打包压缩后是否删除源文件
   */
  readonly VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean
  /**
   * 是否启用 gzip 或 brotli 压缩打包，如果需要多个压缩规则，可以使用 “,” 分隔
   * Optional: gzip | brotli | none
   */
  readonly VITE_BUILD_COMPRESS: string
  /**
   * 接口请求的 BaseUrl
   */
  readonly VITE_API_BASE_URL: string
  /**
   * 微服务的 BaseUrl（多服务配置）
   */
  readonly VITE_API_DOMAIN_JSON: Record<string, any>
}