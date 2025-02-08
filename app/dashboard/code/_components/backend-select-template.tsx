import React, { memo } from 'react'
import { CodeHighlight } from '@mantine/code-highlight';

const BackendTemplate = memo((props: { data: any, useAuth: boolean }) => {

  const { data, useAuth } = props
  
  const name = data.templateName.toLowerCase()

  const exampleCode = `
import { NextRequest } from "next/server";
import { useServerTool } from "~@/utils/useServerTool";
import prisma from "~@/utils/usePrisma";
${
useAuth ? `import { cookies } from 'next/headers';`: ''
}

export async function GET(request: NextRequest) {
  useServerTool.setRequest(request)
${
  useAuth ? `
  const cookieStore = await cookies()`: ''
}

  try {
${
  useAuth ? `
    const user = await useServerTool.useAuth()

    if(!user) {
      cookieStore.delete('token')
      return useServerTool.responseError({
        message: "未登录",
        status: 401
      })
    }
  `: ``
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

    const ${name}s = await prisma.${name}.findMany({
      skip: (Number(body.page) - 1) * Number(body.pageSize),
      take: Number(body.pageSize),
      orderBy: {
        id: 'desc'
      },
      where: {
        isDeleted: false
      }
    })

    if(!${name}s) {
      return useServerTool.responseError({
        message: "没有内容"
      })
    }

    const total = await prisma.${name}.count()

    return useServerTool.responseSuccess({
      data: {
        ${name}s,
        total
      }
    })
  } catch (error) {
    return useServerTool.responseError({
      message: "系统错误",
      status: 500
    })
  }
}
`;

  return (
    <div>
      <CodeHighlight
        code={`// 查询数据 GET${exampleCode}`}
        language="tsx"
        copyLabel="Copy button code"
        copiedLabel="Copied!"
        className='flex-1'
      />
    </div>
  )
})

BackendTemplate.displayName = 'BackendTemplate'

export default BackendTemplate