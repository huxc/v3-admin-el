const hosts = {
  mock: 'https://mock.apifox.com/m1/854051-1975280-default',
  development: '', // 开发环境地址
  test: '', // 测试环境地址
  production: '', // 生产环境地址 运行 pnpm run prod
}
const host = hosts[import.meta.env.MODE]

// 测试生产环境使用
// export const domain_list = {
//   business: `${host}/business`,
//   foundation: `${host}/foundation`,
//   account: `${host}/account`,
//   calculate: `${host}/calculate`,
// }

// mock以及本地环境使用
export const domain_list = {
  system: `${host}`,
  account: `${host}`,
}
