/**
 * .env.devlopment文件的代理配置
 */

// 需要提取proxy对象至函数,而配置需要满足httpProxyOptions的配置接口,所以需要引入这个类型
import type { ProxyOptions } from 'vite'

// 第一个string被代理的路径,第二个是代理至的路径
type ProxyItem = [string, string]

// 方法接收的参数
type ProxyList = ProxyItem[]

// vite的proxy对象,也就是函数的返回值
type ProxyTargetList = Record<string, ProxyOptions>

// https类型的路径的匹配规则的类型
const httpsRe = /^https:\/\//

export function createProxy(list: ProxyList = []) {
  const ret: ProxyTargetList = {}

  for (const [prefix, target] of list) {
    const isHttps = httpsRe.test(target)

    ret[prefix] = {
      target,
      changeOrigin: true,
      ws: true,
      rewrite: (path: string) => path.replace(new RegExp(/^\/api/), ''),
      ...(isHttps ? { secure: false } : {}),
    }
  }
  return ret
}
