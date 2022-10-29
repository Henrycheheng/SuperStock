import http from '@/service/http'
import type * as T from './login'

export const loginApi: T.ILoginApi = {
  login(params) {
    return http.post('./login', params)
  },
}

// login<T.ILoginApi>()
