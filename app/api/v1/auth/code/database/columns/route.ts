import { NextRequest } from "next/server";
import { useServerTool } from "~@/utils/useServerTool";
import prisma from "~@/utils/usePrisma";

export async function GET(request: NextRequest) {
  try {
    useServerTool.setRequest(request)

    const body = useServerTool.getParams()
    const user = await useServerTool.useAuth()

    if(!user) {
      return useServerTool.responseError({
        message: "未登录",
        status: 401
      })
    }

    const tablename = body.name

    const databseName = process.env.DATABASE_NAME

    // 查询表字段
    const columns = await prisma.$queryRaw`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns
      WHERE table_schema = ${databseName}
      AND table_name = ${tablename}
    `

    return useServerTool.responseSuccess({
      data: columns
    })

  } catch (error) {
    useServerTool.responseError({
      message: "系统错误"
    })
  }
}
