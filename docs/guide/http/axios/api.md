# api 接口参数和接口的封装

## login.d.ts

- ILoginParams 规定参数类型 规定接口的类型

```ts
export interface ILoginParams {
  userName: string
  passWord: string | number
}

export interface ILoginApi {
  login: (params: ILoginParams) => Promise<unknown>
}
```

> - T 就是 ILoginParams
> - import type \* as T from './login' 是可以导入当前模块的 d.ts 里面的所有导出类型
> - `login: () => Promise<unknown>` 类型文件中的箭头代表此函数的返回的值类型

## login.ts,定义接口

```ts
import http from '@/service/http'
import type * as T from './login'

export const loginApi: T.TloginApi = {
  login(params) {
    return http.post('./login', params)
  },
}
```
