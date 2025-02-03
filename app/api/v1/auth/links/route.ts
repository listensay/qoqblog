import { NextRequest } from "next/server";
import { useServerTool } from "~@/utils/useServerTool";
import prisma from "~@/utils/usePrisma";

export async function GET(request: NextRequest) {
  useServerTool.setRequest(request)

  try {
    const user = await useServerTool.useAuth()

    if(!user) {
      return useServerTool.responseError({
        message: "未登录"
      })
    }

    const body = useServerTool.getParams()

    if(Object.keys(body).length === 0) {
      return useServerTool.responseError({
        message: "参数错误"
      })
    }

    if(!body.page || !body.pageSize) {
      return useServerTool.responseError({
        message: "参数错误"
      })
    }

    const links = await prisma.links.findMany({
      skip: (Number(body.page) - 1) * Number(body.pageSize),
      take: Number(body.pageSize),
      orderBy: {
        id: 'desc'
      },
      where: {
        isDeleted: false
      }
    })

    if(!links) {
      return useServerTool.responseError({
        message: "链接不存在"
      })
    }

    const total = await prisma.links.count()

    return useServerTool.responseSuccess({
      data: {
        links,
        total
      }
    })
  } catch (error) {
    return useServerTool.responseError({
      message: "系统错误"
    })
  }
}