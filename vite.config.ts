import { fileURLToPath, URL } from "node:url";

import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

import { wrapperEnv } from "./build/utils"
import { resolve } from 'node:path';

function pathResolver(dir: string) {
  return resolve(__dirname, '.', dir)
}

export default defineConfig(({ command, mode }) => {

  const root = process.cwd();

  const env = loadEnv(mode, root)

  const viteEnv = wrapperEnv(env)

  const { VITE_PORT, VITE_PROXY, VITE_LEGACY, VITE_PUBLIC_PATH, VITE_DROP_CONSOLE } = viteEnv

  const isBuild = command === 'build' // TODO command是否只有2种

  return {
    plugins: [vue(), vueJsx()], // vite的支持的插件都需要在这里注册
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)), // 引用别名
      },
    }
  }
});
