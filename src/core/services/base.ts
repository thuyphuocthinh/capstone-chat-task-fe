import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
})

// Hàm lưu & lấy token (có thể đổi sang cookie hoặc storage tuỳ cách bạn làm)
function getAccessToken() {
  return localStorage.getItem('access_token')
}

function getRefreshToken() {
  return localStorage.getItem('refresh_token')
}

function setRefreshToken(token: string) {
  localStorage.setItem('refresh_token', token)
}

function setAccessToken(token: string) {
  localStorage.setItem('access_token', token)
}

// Đính kèm token vào mọi request
instance.interceptors.request.use(config => {
  const token = getAccessToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
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
              originalRequest.headers.Authorization = 'Bearer ' + token
              resolve(instance(originalRequest))
            },
            reject: (err: any) => reject(err)
          })
        })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const refreshToken = getRefreshToken()
        const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/refresh-token`, {
          refresh_token: refreshToken
        })

        const accessToken = res.data.access_token
        const newRefreshToken = res.data.refresh_token
        setAccessToken(accessToken)
        setRefreshToken(newRefreshToken)
        instance.defaults.headers.common.Authorization = 'Bearer ' + accessToken
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
  const res: AxiosResponse<T> = await http.get(url, config)
  return res.data
}

const post = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
  const res: AxiosResponse<T> = await http.post(url, data, config)
  return res.data
}

const put = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
  const res: AxiosResponse<T> = await http.put(url, data, config)
  return res.data
}

const patch = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
  const res: AxiosResponse<T> = await http.patch(url, data, config)
  return res.data
}

const del = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  const res: AxiosResponse<T> = await http.delete(url, config)
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
