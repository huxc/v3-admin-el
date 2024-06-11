// 弃用  2024-6-11
// import { basename, extname } from 'node:path'
// import { globSync } from 'glob'

// /**
//  * 
//  */
// export function getApiKeys() {
//   const modules = {
//     '@/api/helper/index': ['useRequest'],
//     '@/hooks/useDialog': ['useDialog'],
//     '@/hooks/useDrawer': ['useDrawer'],
//     '@/hooks/useHandleData': ['useHandleData'],
//     '@/hooks/useEcharts': ['useEcharts'],
//   }
//   const files = globSync('./src/api/modules/*.js')
//   files.forEach((file) => {
//     const fileName = basename(file, extname(file))
//     const key = `@/api/modules/${fileName}`
//     const fns = require(`../src/api/modules/${fileName}.js`)
//     modules[key] = Object.keys(fns).reduce((pre, cur) => {
//       return pre.push([cur, `api_${fileName}_${cur}`]), pre
//     }, [])
//   })
//   return modules
// }

import fs from "fs";
import {basename,extname} from "path";
import { globSync } from "glob";
import { Parser} from "acorn";
import { simple } from 'acorn-walk';

export function getApiKeys() {
  const modules = {
    '@/api/helper/index': ['useRequest'],
    '@/hooks/useDialog': ['useDialog'],
    '@/hooks/useDrawer': ['useDrawer'],
    '@/hooks/useHandleData': ['useHandleData'],
    '@/hooks/useEcharts': ['useEcharts'],
  }
  // 使用 glob 查找所有 .js 文件
  const files = globSync('./src/api/modules/*.js');

  // 解析每个文件并提取函数名称
  files.forEach((file) => {
    const fileName = basename(file, extname(file))
    const attrName = `@/api/modules/${fileName}`
    const code = fs.readFileSync(file, "utf-8");
    const ast = Parser.parse(code,{ ecmaVersion: 'latest', sourceType: 'module' });

    modules[attrName] = [];

    simple(ast, {
        FunctionDeclaration(node) {
          modules[attrName].push([node.id.name,`api_${fileName}_${node.id.name}`]);
        },
        VariableDeclaration(node) {
          node.declarations.forEach((declaration) => {
            if (
              declaration.init &&
              declaration.init.type === "FunctionExpression"
            ) {
              modules[attrName].push([declaration.id.name,`api_${fileName}_${declaration.id.name}`]);
            }
          });
        },
        // 支持箭头函数
        VariableDeclarator(node) {
          if (node.init && node.init.type === "ArrowFunctionExpression") {
            modules[attrName].push([node.id.name,`api_${fileName}_${node.id.name}`]);
          }
        },
      });
  });
  return modules
}
