# 拦截器

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
