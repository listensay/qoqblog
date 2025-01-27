import { useServerTool } from '../../../../../utils/useServerTool';
import { NextRequest } from "next/server";

export async function GET(request: NextRequest){
  try {
    useServerTool.setRequest(request)
    let user = await useServerTool.useAuth()

    if (!user) {
      return useServerTool.responseError({
        message: 'Unauthorized',
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