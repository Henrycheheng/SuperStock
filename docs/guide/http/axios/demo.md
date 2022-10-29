# Axios 封装

##

## AxiosRequestConfig

```ts
export interface AxiosRequestConfig<D = any> {
  url?: string // 地址
  method?: Method | string // 请求方法
  baseURL?: string // 基础地址
  transformRequest?: AxiosRequestTransformer | AxiosRequestTransformer[]
  transformResponse?: AxiosResponseTransformer | AxiosResponseTransformer[]
  headers?: RawAxiosRequestHeaders // 请求头
  params?: any // 请求参数是any,但是不希望是any,所以需要封装
  paramsSerializer?: ParamsSerializerOptions
  data?: D // 返回值的数据也是any
  timeout?: Milliseconds // 超时时间
  timeoutErrorMessage?: string // 超时时间的报错 TODO
  adapter?: AxiosAdapter
  auth?: AxiosBasicCredentials
  responseType?: ResponseType // 返回值的类型
  responseEncoding?: responseEncoding | string // 返回值的解码
  xsrfCookieName?: string // 是 xsrf token 的值，被用作 cookie 的名称
  xsrfHeaderName?: string
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
  onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void
  maxContentLength?: number
  validateStatus?: ((status: number) => boolean) | null
  maxBodyLength?: number
  maxRedirects?: number
  maxRate?: number | [MaxUploadRate, MaxDownloadRate]
  beforeRedirect?: (
    options: Record<string, any>,
    responseDetails: { headers: Record<string, string> }
  ) => void
  socketPath?: string | null
  httpAgent?: any
  httpsAgent?: any
  proxy?: AxiosProxyConfig | false
  cancelToken?: CancelToken
  decompress?: boolean
  transitional?: TransitionalOptions
  signal?: GenericAbortSignal
  insecureHTTPParser?: boolean
  env?: {
    FormData?: new (...args: any[]) => object
  }
  formSerializer?: FormSerializerOptions
}
```

## RawAxiosHeaders

```ts
type AxiosHeaderValue = AxiosHeaders | string | string[] | number | boolean | null
type RawAxiosHeaders = Record<string, AxiosHeaderValue>
```

- type RawAxiosHeaders 就是以`string`为索引签名的，值类型是`AxiosHeaderValue`的对象

## 拦截器

```ts
export class Axios {
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>
    response: AxiosInterceptorManager<AxiosResponse>
  }
}

export interface AxiosInterceptorManager<V> {
  use(
    onFulfilled?: (value: V) => V | Promise<V>,
    onRejected?: (error: any) => any,
    options?: AxiosInterceptorOptions
  ): number
}

export interface AxiosInterceptorOptions {
  synchronous?: boolean // 是否同步
  runWhen?: (config: AxiosRequestConfig) => boolean
}
```

## 拦截器配置

```ts
axios.interceptors.request.use(
  (config): AxiosRequestConfig<any> => {
    const token = window.sessionStorage.getItem('token')

    if (token) {
      //@ts-ignore
      config.headers.token = token
    }
    return config
  },
  (error: any) => {
    return error
  }
)

axios.interceptors.response.use((res) => {
  if (res.data.code === 200) {
    sessionStorage.setItem('token', '')
    // token过期操作
  }
  return res.data
})
```

## 模块常用方法

## login.d.ts

### 1.ILoginParams 规定参数类型

```ts
export interface ILoginParams {
  [propname: string | number | symbol]: any
  userName: string
  passWord: string | number
}
```

### 2.规定接口的类型

```ts
export interface ILoginApi {
  login: (params: ILoginParams) => Promise<unknown>
}
```

- T 就是 ILoginParams
- import type \* as T from './login' 是可以导入当前模块的 d.ts 里面的所有导出类型
- login: () => Promise<unknown> 类型文件中的箭头代表此函数的返回的值类型

## 3.login.ts,定义接口

```ts
import http from '@/service/http'
import type * as T from './login'

export const loginApi: T.TloginApi = {
  login(params) {
    return http.post('./login', params)
  },
}
```

## pinia 中使用接口

## vue 文件中调用接口
