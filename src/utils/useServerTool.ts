import { NextRequest } from "next/server";

export interface MyResponseInterface {
  message?: string;
  success?: boolean;
  data?: any;
  status?: number;
}

class ServerTool {
  private request: NextRequest | null;

  constructor() {
    this.request = null;
  }
  responseSuccess(option: MyResponseInterface) {
    return Response.json({
      message: option.message || 'OK',
      success: option.success || true,
      status: option.status || 200,
      data: option.data
    }, {
      status: 200
    })
  }
  responseError(option: MyResponseInterface) {
    return Response.json({
      message: option.message || 'Error',
      success: option.success || false,
      status: option.status || 400,
      data: option.data || null
    }, {
      status: option.status || 400
    })
  }
  /**
   * 获取URL地址参数
   * @param name Key
   * @returns Value
   */
  getParams(){
    if (this.request === null) {
      return {}
    }

    return Object.fromEntries(this.request.nextUrl.searchParams.entries())
  }

  async getBody() {
    if (this.request === null) {
      return {}
    }

    console.log(this.request)

    return await this.request.json()
  }

  setRequest(request: NextRequest) {
    this.request = request;
  }
}

export const useServerTool = new ServerTool()