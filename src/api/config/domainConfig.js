const hosts = {
  // development: 'https://mock.apifox.com/m1/4483965-4130611-default', // 开发环境地址
  development: 'http://139.224.36.172:3000', // 开发环境地址 //'172.16.164.29:3000', //
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
  user: `${host}`,
  account: `${host}`,
}
