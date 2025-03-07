// 查询数据 GET
import { NextRequest } from 'next/server'
import { useServerTool } from '~/utils/useServerTool'
import prisma from '~/utils/usePrisma'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
  useServerTool.setRequest(request)

  const cookieStore = await cookies()

  try {
    const user = await useServerTool.useAuth()

    if (!user) {
      cookieStore.delete('token')
      return useServerTool.responseError({
        message: '未登录',
        status: 401
      })
    }

    const body = useServerTool.getParams()

    if (Object.keys(body).length === 0) {
      return useServerTool.responseError({
        message: '参数错误'
      })
    }

    if (!body.page || !body.pageSize) {
      return useServerTool.responseError({
        message: '参数错误'
      })
    }

    const posts = await prisma.post.findMany({
      skip: (Number(body.page) - 1) * Number(body.pageSize),
      take: Number(body.pageSize),
      orderBy: {
        id: 'desc'
      },
      where: {
        isDeleted: false
      },
      include: {
        category: {
          select: {
            name: true,
            description: true,
            cover: true
          }
        },
        author: {
          select: {
            nickname: true,
            avatar: true
          }
        }
      }
    })

    if (!posts) {
      return useServerTool.responseError({
        message: '没有内容'
      })
    }

    const total = await prisma.post.count()

    return useServerTool.responseSuccess({
      data: {
        posts,
        total
      }
    })
  } catch {
    return useServerTool.responseError({
      message: '系统错误',
      status: 500
    })
  }
}
