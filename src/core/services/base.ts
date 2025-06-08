import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios'
import { get_token_storage, KEY_LOCALSTORAGE, auth_store } from '#/stores/auth_store'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
})

instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.data) {
      return Promise.reject(error.response.data)
    }
    return Promise.reject(error)
  }
);

// Đính kèm token vào mọi request
instance.interceptors.request.use(config => {
  const token = get_token_storage(KEY_LOCALSTORAGE.access_token);
  if (token) {
    config.headers.Authorization = token;
  }
  return config
})

// Biến tránh vòng lặp refresh nhiều lần
let isRefreshing = false
let failedQueue: any[] = []

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (token) {
      prom.resolve(token)
    } else {
      prom.reject(error)
    }
  })
  failedQueue = []
}

// Response interceptor để bắt lỗi 401
instance.interceptors.response.use(
  res => res,
  async error => {
    const originalRequest = error.config

    // Nếu bị 401 và chưa refresh thì thử refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers.Authorization = token
              resolve(instance(originalRequest))
            },
            reject: (err: any) => reject(err)
          })
        })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const refreshToken = get_token_storage(KEY_LOCALSTORAGE.refresh_token)
        const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/refresh-token`, {
          refresh_token: refreshToken
        })

        const accessToken = res.data.access_token
        const newRefreshToken = res.data.refresh_token
        auth_store.value.access_token = accessToken;
        auth_store.value.refresh_token = newRefreshToken;
        instance.defaults.headers.common.Authorization = auth_store.value.access_token
        processQueue(null, accessToken)
        return instance(originalRequest)
      } catch (err) {
        processQueue(err, null)
        return Promise.reject(err)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)

const get = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  const res: AxiosResponse<T> = await instance.get(url, config)
  return res.data
}

const post = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
  const res: AxiosResponse<T> = await instance.post(url, data, config)
  return res.data
}

const put = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
  const res: AxiosResponse<T> = await instance.put(url, data, config)
  return res.data
}

const patch = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
  const res: AxiosResponse<T> = await instance.patch(url, data, config)
  return res.data
}

const del = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  const res: AxiosResponse<T> = await instance.delete(url, config)
  return res.data
}


export const http = {
  get,
  post,
  put,
  patch,
  delete: del,
  instance
}


export const publicInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
})


publicInstance.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response && error.response.data) {
      return Promise.reject(error.response.data)
    }
    return Promise.reject(error)
  }
);

export const authHttp = publicInstance
