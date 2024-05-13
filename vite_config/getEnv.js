/* eslint-disable node/prefer-global/process */
import { resolve } from 'node:path'

/**
 *
 */
export function isDevFn(mode) {
  return mode === 'development'
}

/**
 *
 */
export function isProdFn(mode) {
  return mode === 'production'
}

/**
 *
 */
export function isTestFn(mode) {
  return mode === 'test'
}

/**
 *
 */
export function isReportMode() {
  return process.env.VITE_REPORT === 'true'
}

// 读取所有环境变量配置文件到 process.env
/**
 *
 */
export function wrapperEnv(envConf) {
  const ret = {}

  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, '\n')
    realName = realName === 'true' ? true : realName === 'false' ? false : realName
    if (envName === 'VITE_PORT')
      realName = Number(realName)
    ret[envName] = realName
  }
  return ret
}

/**
 *
 */
export function getRootPath(...dir) {
  return resolve(process.cwd(), ...dir)
}
