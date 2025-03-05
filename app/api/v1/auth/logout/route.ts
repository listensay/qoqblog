import { NextRequest } from 'next/server'
import { useServerTool } from '~/utils/useServerTool'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    useServerTool.setRequest(request)

    const user = await useServerTool.useAuth()

    if (!user) {
      return useServerTool.responseError({
        message: '未登录',
        status: 401
      })
    }

    const cookieStore = await cookies()
    cookieStore.delete('token')

    return useServerTool.responseSuccess({
      message: '退出成功'
    })
  } catch {
    useServerTool.responseError({
      message: '系统错误'
    })
  }
}
