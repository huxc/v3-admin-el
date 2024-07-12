// 用于存储进行中的请求的唯一标识
export const ongoingRequests = new Map()

/**
 * 生成请求的唯一标识
 */
export function generateRequestKey(config) {
  const { method, url, data } = config
  return `${method} ${url} ${JSON.stringify(data || '')}`
}
