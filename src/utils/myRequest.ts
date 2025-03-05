import { notifications } from '@mantine/notifications'
import axios, { Axios, AxiosResponse } from 'axios'
import { MyResponseInterface } from './useServerTool'

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'http://127.0.0.1:3000'

class useRequest {
  axios: Axios
  constructor() {
    this.axios = axios.create({
      baseURL,
      timeout: 10000
    })

    // 请求拦截器
    this.axios.interceptors.request.use(
      config => config,
      error => Promise.reject(error)
    )

    // 响应拦截器
    this.axios.interceptors.response.use(
      response => response,
      error => {
        // 判断 error.response 是否存在再处理错误信息
        if (typeof window !== 'undefined' && error.response) {
          notifications.show({
            title: '请求错误',
            message: error.response.data?.message || '未知错误',
            autoClose: 5000,
            color: 'red',
            position: 'bottom-center'
          })
        }

        // 如果响应状态为 401，则跳转登录页（先判断 error.response 是否存在）
        if (error.response && error.response.status === 401) {
          if (typeof window !== 'undefined') {
            window.location.href = '/login'
          }
        }
        return Promise.reject(error)
      }
    )
  }

  // 格式化响应为 MyResponseInterface 类型
  private formatResponse(response: AxiosResponse): MyResponseInterface {
    return response.data as MyResponseInterface
  }

  async get(
    url: string,
    params?: Record<string, any>
  ): Promise<MyResponseInterface> {
    const response = await this.axios.get(url, { params })
    return this.formatResponse(response)
  }

  async post(
    url: string,
    data?: Record<string, any>
  ): Promise<MyResponseInterface> {
    const response = await this.axios.post(url, data)
    return this.formatResponse(response)
  }

  async put(
    url: string,
    data?: Record<string, any>
  ): Promise<MyResponseInterface> {
    const response = await this.axios.put(url, data)
    return this.formatResponse(response)
  }

  async delete(
    url: string,
    data?: Record<string, any>
  ): Promise<MyResponseInterface> {
    const response = await this.axios.delete(url, { data })
    return this.formatResponse(response)
  }
}

export default new useRequest()
