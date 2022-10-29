# 更少的必要 TS 封装

## 新建 http.ts

```ts
import axios, { AxiosRequestConfig } from 'axios'
import NProgress from 'nprogress'

// 设置请求头和请求路径

axios.defaults.baseURL = '/api'
axios.defaults.timeout = 10000
// headers只能是对象
axios.defaults.headers.post['Content-Type'] = 'application/json;charset-UTF-8'

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

interface ResType<T> {
  code: number
  msg: string
  data?: T
  err?: string
}

interface Http {
  get<T>(url: string, params?: unknown): Promise<ResType<T>>
  put<T>(url: string, params?: unknown): Promise<ResType<T>>
  post<T>(url: string, params?: unknown): Promise<ResType<T>>
  upload<T>(url: string, params: unknown): Promise<ResType<T>>
  download(url: string): void
}

const http: Http = {
  get(url, params) {
    return new Promise((resolve, reject) => {
      NProgress.start()
      axios
        .get(url, { params })
        .then((res) => {
          NProgress.done()
          resolve(res.data)
        })
        .catch((err: { data: any }) => {
          NProgress.done()
          reject(err.data)
        })
    })
  },
  post(url, params) {
    return new Promise((resolve, reject) => {
      NProgress.start()
      axios
        .post(url, JSON.stringify(params))
        .then((res) => {
          NProgress.done()
          resolve(res.data)
        })
        .catch((err: { data: any }) => {
          NProgress.done()
          reject(err.data)
        })
    })
  },
  upload(url, file) {
    return new Promise((resolve, reject) => {
      NProgress.start()
      axios
        .post(url, file, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((res) => {
          NProgress.done()
          resolve(res.data)
        })
        .catch((err: { data: any }) => {
          NProgress.done()
          reject(err.data)
        })
    })
  },
  download(url) {
    const iframe = document.createElement('iframe')
    iframe.style.display = 'none'
    iframe.src = url
    iframe.onload = function () {
      document.body.removeChild(iframe)
    }
    document.body.appendChild(iframe)
  },
  put(url, params) {
    return new Promise((resolve, reject) => {
      NProgress.start()
      axios
        .put(url, JSON.stringify(params))
        .then((res) => {
          NProgress.done()
          resolve(res.data)
        })
        .catch((err: { data: any }) => {
          NProgress.done()
          reject(err.data)
        })
    })
  },
}
export default http
```
