import React, { memo } from 'react'
import { CodeHighlight } from '@mantine/code-highlight';

const BackendTemplate = memo((props: { data: any, useAuth: boolean }) => {

  const { data, useAuth } = props

  console.log(data)

  const exampleCode = `
import { NextRequest } from "next/server";
import { useServerTool } from "~@/utils/useServerTool";
import prisma from "~@/utils/usePrisma";

export async function POST(request: NextRequest) {
  useServerTool.setRequest(request)

  try {
${
  useAuth ? `
    const user = await useServerTool.useAuth()

    if(!user) {
      return useServerTool.responseError({
        message: "未登录"
      })
    }
  `: ``
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
`;

  return (
    <div>
      <CodeHighlight
        code={`// 新增数据 POST${exampleCode}`}
        language="tsx"
        copyLabel="Copy button code"
        copiedLabel="Copied!"
        className='flex-1'
      />
    </div>
  )
})

export default BackendTemplate