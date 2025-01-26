import { notifications } from "@mantine/notifications";
import axios, { Axios, AxiosError, InternalAxiosRequestConfig, AxiosResponse } from "axios";
import { getCookie } from "cookies-next";
import { MyResponseInterface } from "./useServerTool"; // 规范类型命名

// 定义增强的错误类型
interface CustomAxiosError<T = any> extends AxiosError<T> {
  isHandled?: boolean;
}

class RequestClient {
  private axiosInstance: Axios;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // 请求拦截器
    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        if (typeof window !== 'undefined') { // 确保在客户端执行
          const token = getCookie('token')?.toString() || '';
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        return config;
      },
      (error: AxiosError) => Promise.reject(error)
    );

    // 响应拦截器
    this.axiosInstance.interceptors.response.use(
      (response): AxiosResponse<any> | Promise<AxiosResponse<any>> => {
        const data = response.data as MyResponseInterface;

        // 处理业务逻辑错误（假设接口返回 success 字段）
        if (!data.success) {
          this.handleError({
            response: {
              data: {
                message: data.message || '业务逻辑错误',
              },
            },
            isHandled: true,
          } as CustomAxiosError);
          return Promise.reject(data);
        }

        return response;
      },
      (error: CustomAxiosError) => {
        if (!error.isHandled) {
          this.handleError(error);
        }
        return Promise.reject(error);
      }
    );
  }

  private handleError(error: CustomAxiosError) {
    if (typeof window === 'undefined') return;

    const errorMessage = error.response?.data?.message 
      || error.message 
      || '未知请求错误';

    notifications.show({
      title: "请求错误",
      message: errorMessage,
      autoClose: 5000,
      color: "red",
      position: "bottom-center",
    });

    error.isHandled = true; // 标记已处理
  }

  // 添加泛型类型支持
  get<T = MyResponseInterface>(url: string, params?: Record<string, any>) {
    return this.axiosInstance.get<T>(url, { params });
  }

  post<T = MyResponseInterface>(url: string, data?: Record<string, any>) {
    return this.axiosInstance.post<T>(url, data);
  }
}

export default new RequestClient();
