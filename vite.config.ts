import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import { wrapperEnv } from './build/utils'
import { resolve } from 'node:path'

function pathResolver(dir: string) {
  return resolve(__dirname, '.', dir)
}

export default defineConfig(({ command, mode }) => {
  const root = process.cwd()

  const env = loadEnv(mode, root)

  const viteEnv = wrapperEnv(env)

  const { VITE_PORT, VITE_PROXY, VITE_LEGACY, VITE_PUBLIC_PATH, VITE_DROP_CONSOLE } = viteEnv

  const isBuild = command === 'build' // TODO

  console.log('import.meta.url', viteEnv)

  return {
    base: VITE_PUBLIC_PATH,
    plugins: [vue(), vueJsx()], // vite的支持的插件都需要在这里注册
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)), // 引用别名,fileURLToPath为了保证转码不会乱码
      },
      // alias: [
      //   {
      //     // /@/xx => src
      //     find: /^\/@\//,
      //     // replacement: pathResolver('src') + '/',
      //   },
      // ],
    },
    server: {
      port: 4000,
      proxy: {
        // 字符串写法
        foo: 'bar',
        // 配置选项写法
        '/api': {
          // TODO: ssl证书 https://www.kaspersky.com.cn/resource-center/definitions/what-is-a-ssl-certificate
          target: '111', // 实际请求的地址
          changeOrigin: true, // 保证头是一样
          rewrite: (path: string) => path.replace(/^\/api/, ''), // 需要将api和后端对接
        },
      },
    },
  }
})
