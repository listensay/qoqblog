import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'
import prisma from './usePrisma'

export interface MyResponseInterface {
  message?: string
  success?: boolean
  data?: any
  status?: number
}

class ServerTool {
  private request: NextRequest | null

  constructor() {
    this.request = null
  }
  responseSuccess(option: MyResponseInterface) {
    return Response.json(
      {
        message: option.message || 'OK',
        success: option.success || true,
        status: option.status || 200,
        data: option.data
      },
      {
        status: 200
      }
    )
  }
  responseError(option: MyResponseInterface) {
    return Response.json(
      {
        message: option.message || 'Error',
        success: option.success || false,
        status: option.status || 400,
        data: option.data || null
      },
      {
        status: option.status || 400
      }
    )
  }
  /**
   * 获取URL地址参数
   * @param name Key
   * @returns Value
   */
  getParams() {
    if (this.request === null) {
      return {}
    }

    return Object.fromEntries(this.request.nextUrl.searchParams.entries())
  }

  async getBody() {
    if (this.request === null) {
      return {}
    }

    return await this.request.json()
  }
  setRequest(request: NextRequest) {
    this.request = request
  }
  async useAuth() {
    const cookieStore = await cookies()
    const token =
      cookieStore.get('token')?.value ||
      this.request!.headers.get('authorization')
    let user

    if (!token) {
      return false
    }

    try {
      // // 获取密钥
      const secret = process.env.JWT_SECRET as string
      const decoded = <any>jwt.verify(token, secret)

      user = await prisma.user.findFirst({
        where: {
          id: decoded.id
        },
        select: {
          username: true,
          description: true,
          nickname: true,
          email: true,
          avatar: true,
          createdAt: true,
          updatedAt: true,
          id: true
        }
      })
    } catch (error) {
      return false
    }

    return user
  }
}

export const useServerTool = new ServerTool()
