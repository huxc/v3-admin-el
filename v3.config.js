const template = null // api模版配置
export default {
  entry: 'http://10.100.2.197:9303/v2/api-docs', // [swagger-url]
  domain: 'system', // 微服务的网关名称
  template, // 配置模版
  output: { path: './src/api/auto-api' }, // 输出文件路径（生成的api）
  router: {
    path: './src/routers/modules', // router所在的文件夹
    ignore: ['**/notFound.js'], // 可忽略掉某些文件
    outPath: './src/views', // 生成的views路径
  },
}
