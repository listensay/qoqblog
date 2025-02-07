// 查询数据 GET
import { NextRequest } from "next/server";
import { useServerTool } from "~@/utils/useServerTool";
import prisma from "~@/utils/usePrisma";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  useServerTool.setRequest(request)

  try {
    const id = (await params).id
    const post = await prisma.post.findFirst({
      where: {
        id: Number(id),
        isDeleted: false
      }
    })

    if(!post) {
      return useServerTool.responseError({
        message: "没有内容"
      })
    }

    await prisma.post.update({
      where: {
        id: Number(id)
      },
      data: {
        views: {
          increment: 1
        }
      }
    })

    return useServerTool.responseSuccess({
      data: {
        post
      }
    })
  } catch (error) {
    return useServerTool.responseError({
      message: "系统错误",
      status: 500
    })
  }
}