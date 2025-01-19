import prisma from "@/utils/usePrisma";
import { useServerTool } from "@/utils/useServerTool";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    useServerTool.setRequest(request)

    const body = await useServerTool.getBody()
    
    const user = await prisma.user.create({
      data: {
        username: body.username,
        email: body.email,
        password: body.password
      }
    })
  
    if (!user) {
      return useServerTool.responseError({
        message: "注册失败"
      })
    }
  
    return useServerTool.responseSuccess({
      message: "注册成功"
    })
  } catch (error) {
    console.log(error)
    return useServerTool.responseError({
      message: "注册失败",
      status: 400
    })
  }
}