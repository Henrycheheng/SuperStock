export interface IViteEnv {
  VITE_PORT: number
  VITE_GLOB_APP_TITLE: string
  VITE_GLOB_APP_SHORT_NAME: string

  VITE_USE_MOCK: boolean
  VITE_PUBLIC_PATH: string
  VITE_DROP_CONSOLE: boolean
  VITE_BUILD_COMPRESS: string

  VITE_GLOB_API_URL: string
  VITE_GLOB_UPLOAD_URL: string

  VITE_USE_IMAGEMIN: boolean
  VITE_USE_PWA: boolean
  VITE_LEGACY: boolean

  VITE_PROXY: Array<string>[]
}

export function wrapperEnv(envConfig: Recordable): IViteEnv {
  const ret: any = {}

  for (const envName of Object.keys(envConfig)) {
    let realName = envConfig[envName].replace(/\\n/g, '\n') // TODO

    realName = realName === 'true' ? true : realName === 'false' ? false : realName // true or false or realName

    if (envName === 'VITE_PORT') {
      realName = Number(realName)
    }
    if (envName === 'VITE_PROXY') {
      try {
        realName = JSON.parse(realName)
      } catch (error) {
        console.warn(error)
      }
    }
    ret[envName] = realName
    process.env[envName] = realName
  }
  return ret
}
