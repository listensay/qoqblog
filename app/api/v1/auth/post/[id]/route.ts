// 查询数据 GET
import { NextRequest } from 'next/server'
import { useServerTool } from '~/utils/useServerTool'
import prisma from '~/utils/usePrisma'
import { cookies } from 'next/headers'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  useServerTool.setRequest(request)

  const user = await useServerTool.useAuth()

  const cookieStore = await cookies()

  if (!user) {
    cookieStore.delete('token')
    return useServerTool.responseError({
      message: '未登录',
      status: 401
    })
  }


  try {
    const id = (await params).id
    const post = await prisma.post.findFirst({
      where: {
        id: Number(id),
        isDeleted: false
      }
    })

    if (!post) {
      return useServerTool.responseError({
        message: '没有内容'
      })
    }

    return useServerTool.responseSuccess({
      data: {
        post
      }
    })
  } catch {
    return useServerTool.responseError({
      message: '系统错误',
      status: 500
    })
  }
}
