import { useServerTool } from '~@/utils/useServerTool';
import { NextRequest } from "next/server";
import { cookies } from 'next/headers';

export async function GET(request: NextRequest){
  const cookieStore = await cookies()

  try {
    useServerTool.setRequest(request)
    let user = await useServerTool.useAuth()

    if (!user) {
      cookieStore.delete('token')
      return useServerTool.responseError({
        message: '未登录',
        status: 401
      })
    }

    return useServerTool.responseSuccess({
      data: {
        profile: user
      }
    })
  } catch (error) {
    return useServerTool.responseError({
      message: 'Error'
    })
  }
}