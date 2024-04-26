const hosts = {
//   development: 'https://mock.apifox.com/m1/3709999-0-default',
  development: 'http://172.16.164.172:9301', // 开发环境地址
  test: 'http://10.100.2.231/carbon-building-gateway', // 测试环境地址
  production: 'http://10.100.2.197/carbon-building-gateway', // 生产环境地址 运行 pnpm run prod
}
const host = hosts[import.meta.env.MODE]

// apifox测试使用
// export const domain_list = {
//   business: 'http://192.168.65.128:9305',
//   foundation: 'http://192.168.65.128:9303',
// }

// 测试生产环境使用
export const domain_list = {
  business: `${host}/business`,
  foundation: `${host}/foundation`,
  account: `${host}/account`,
  calculate: `${host}/calculate`,
}

// mock以及本地环境使用
// export const domain_list = {
//   system: `${host}`,
//   account: `${host}`,
// }

// 文件上传
export const file_upload_url = `${domain_list.foundation}/template/update`

// 基础元素信息导入
export const basic_element_Import_url = `${domain_list.account}/element/import`
