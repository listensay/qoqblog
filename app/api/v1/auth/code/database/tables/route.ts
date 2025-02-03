import { NextRequest } from "next/server";
import { useServerTool } from "~@/utils/useServerTool";
import prisma from "~@/utils/usePrisma";

export async function GET(request: NextRequest) {
  try {
    useServerTool.setRequest(request)

    const user = await useServerTool.useAuth()

    if(!user) {
      return useServerTool.responseError({
        message: "未登录",
        status: 401
      })
    }

    const databseName = process.env.DATABASE_NAME

    // 查询数据库所有表内容
    const allTables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = ${databseName}
    `

    return useServerTool.responseSuccess({
      data: allTables
    })


  } catch (error) {
    useServerTool.responseError({
      message: "系统错误"
    })
  }
}