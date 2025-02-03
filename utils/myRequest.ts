import { notifications } from "@mantine/notifications";
import axios, { Axios, AxiosResponse } from "axios";
import { MyResponseInterface } from "./useServerTool";

class useRequest {
  axios: Axios;
  constructor() {
    this.axios = axios.create({
      baseURL: process.env.NEXT_PUBLIC_BASE_URL,
      timeout: 10000,
    });

    // 请求拦截器
    this.axios.interceptors.request.use(
      // 请求之前做一些什么
      (config) => {
        return config;
      },
      // 请求错误做一些什么
      (error) => {
        return Promise.reject(error);
      }
    );

    // 响应拦截器
    this.axios.interceptors.response.use(
      // 响应数据
      (response) => {
        return response;
      },
      // 响应错误
      (error) => {
        if (typeof window !== "undefined") {
          notifications.show({
            title: "请求错误",
            message: error.response.data.message,
            autoClose: 5000,
            color: "red",
            position: "bottom-center",
          });
        }

        if(error.response.status === 401) {
          window.location.href = "/login";
        }

        return Promise.reject(error);
      }
    );
  }

  // 用于格式化响应数据为 MyResponseInterface 类型的方法
  private formatResponse(response: AxiosResponse): MyResponseInterface {
    const data = response.data as MyResponseInterface;
    return data;
  }

  async get(url: string, params?: Record<string, any>): Promise<MyResponseInterface> {
    const response = await this.axios.get(url, { params });
    return this.formatResponse(response);
  }
  
  async post(url: string, data?: Record<string, any>): Promise<MyResponseInterface> {
    const response = await this.axios.post(url, data);
    return this.formatResponse(response);
  }
}

export default new useRequest();
