# Axios 封装

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
// AxiosHeaderValue
type AxiosHeaderValue = AxiosHeaders | string | string[] | number | boolean | null
type RawAxiosHeaders = Record<string, AxiosHeaderValue>
```

- type RawAxiosHeaders 就是以`string`为索引签名的，值类型是`AxiosHeaderValue`的对象
