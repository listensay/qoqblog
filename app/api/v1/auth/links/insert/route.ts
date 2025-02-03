import { NextRequest } from "next/server";
import { useServerTool } from "~@/utils/useServerTool";
import prisma from "~@/utils/usePrisma";

export async function POST(request: NextRequest) {
  useServerTool.setRequest(request)

  try {
    const user = await useServerTool.useAuth()

    if(!user) {
      return useServerTool.responseError({
        message: "未登录",
        status: 401
      })
    }

    const body = <any> await useServerTool.getBody()

    if(Object.keys(body).length === 0) {
      return useServerTool.responseError({
        message: "参数错误"
      })
    }

    const link = await prisma.links.create({
      data: {
        name: body.name,
        url: body.url,
        description: body.description,
        cover: body.cover,
      }
    })

    if(!link) {
      return useServerTool.responseError({
        message: "创建失败"
      })
    }

    return useServerTool.responseSuccess({
      message: "创建成功"
    })
  } catch (error) {
    return useServerTool.responseError({
      message: "系统错误",
      status: 500
    })
  }
}