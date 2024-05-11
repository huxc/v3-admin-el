# 介绍

::: info 简介
v3-admin-el 一款基于 Vue3.4、Vite5、Pinia、Element-Plus 后台管理框架模版，使用目前最新技术栈开发。对表格、表单进行了可 json 配置封装，同时加入常用`useTable.js`，大幅提升后台管理系统的效率和质量。另外本项目还封装了一些常用 axios、 Hooks、指令、动态路由、按钮级别权限控制、自动部署等功能。
:::

# 快速上手

::: info 规范

项目需遵循 Open-Close 原则，对模版中无法满足需求的组件或函数，应该扩展而非修改

:::

## Node 版本

::: danger 兼容性注意

项目需要 Node.js 版本 18+，20+。当你的包管理器发出警告时，请注意升级你的 Node 版本。
:::

## 项目 gitLab 地址

```js
git clone http://192.168.1.223/huxiaochuan/v3-admin-el.git
cd v3-admin-el
code .

pnpm install
pnpm run dev
```

## 包管理

::: danger 提示

项目强制使用 pnpm 包管理工具。如果未安装请全局安装

:::

## 业务接口地址

在路径`src/api/config/domainConfig.js`中 需根据业务接口地址进行相应的修改，支持后端微服务

```js
const hosts = {
  mock: 'https://mock.apifox.com/m1/854051-1975280-default',
  development: '', // 开发环境地址
  test: '', // 测试环境地址
  production: '' // 生产环境地址 运行 pnpm run prod
}
const host = hosts[import.meta.env.MODE]

// 测试生产环境使用
export const domain_list = {
  business: `${host}/business`,
  foundation: `${host}/foundation`,
  account: `${host}/account`,
  calculate: `${host}/calculate`
}
```

## 接口请求配置

在使用 `v3-table` 组件时，需要根据接口返回值修改`src/hooks/useTable.js`中的返回值代码，更改需要赋值的返回字段

```js
/** getList函数中 */

// 基于接口统一处理 根据业务接口自行调整
nextTick(() => {
  if (typeOf(response.data) === 'array') {
    state.tableData = response.data
  }
  else {
    state.tableData = response.data?.list || []
    state.totalCount = response.data?.total || 0
  }
})
```

## 格式化配置

::: info

项目格式化使用 ESLint 插件格式化，需要 vscode 插件 ESLint(版本 3+)。项目配置已放在`.vscode/settings.json`中, 如果配置未能生效，请先逐步注释掉 vscode 设置中的 settings.json 的配置，查找出影响格式化的配置
:::

```json
{
  // 启用ESlint的eslint.config.js配置支持
  "eslint.experimental.useFlatConfig": true,

  // 禁用默认格式化器，使用eslint代替
  "prettier.enable": false,
  "editor.formatOnSave": false,

  // 使用vscode插件eslint格式化
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "never"
  },

  "eslint.rules.customizations": [
    { "rule": "style/*", "severity": "off" },
    { "rule": "format/*", "severity": "off" },
    { "rule": "*-indent", "severity": "off" },
    { "rule": "*-spacing", "severity": "off" },
    { "rule": "*-spaces", "severity": "off" },
    { "rule": "*-order", "severity": "off" },
    { "rule": "*-dangle", "severity": "off" },
    { "rule": "*-newline", "severity": "off" },
    { "rule": "*quotes", "severity": "off" },
    { "rule": "*semi", "severity": "off" }
  ],

  // 配置所需文件支持eslint格式化
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "vue",
    "html",
    "css",
    "scss",
    "markdown",
    "json",
    "jsonc",
    "yaml",
    "toml",
    "astro"
  ]
}
```
