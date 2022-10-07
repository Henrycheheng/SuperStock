/* eslint-disable camelcase */
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'node:path'

import { createProxy } from './build/vite/proxy'
import { wrapperEnv } from './build/utils'
import { OUTPUT_DIR } from './build/constant'

function pathResolver(dir: string) {
  return resolve(__dirname, '.', dir)
}

export default defineConfig(({ command, mode }) => {
  const root = process.cwd()

  const env = loadEnv(mode, root)

  const viteEnv = wrapperEnv(env)

  const { VITE_PORT, VITE_PROXY, VITE_LEGACY, VITE_PUBLIC_PATH, VITE_DROP_CONSOLE } = viteEnv

  const isBuild = command === 'build' // TODO

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
      proxy: createProxy(VITE_PROXY),
      hmr: {
        overlay: true,
      },
    },
    build: {
      outDir: OUTPUT_DIR,
      // reportCompressedSize: true,
      rollupOptions: {
        external: [
          pathResolver('src/views/render.html'),
          pathResolver('src/typescript/*.ts'),
          pathResolver('src/less/*.less'),
        ],
      },
      chunkSizeWarningLimit: 500,
      reportCompressedSize: true, // 压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能。
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            // 用于全局的导入，以避免需要单独导入每个样式文件
            // reference 避免重复引用的问题
            hack: `true; @import (reference)"${resolve('src/design//config.less')}"`,
          },
        },
      },
    },
  }
})
