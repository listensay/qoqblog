import { NextRequest } from 'next/server'
import prisma from '~/utils/usePrisma'
import { useServerTool } from '~/utils/useServerTool'
import joi from 'joi'

export async function POST(request: NextRequest) {
  try {
    useServerTool.setRequest(request)

    const body = await useServerTool.getBody()

    const schema = joi.object({
      username: joi.string().required().trim(),
      email: joi.string().email().required().trim(),
      content: joi.string().required().trim(),
      postId: joi.number().required(),
      url: joi.string().trim().empty('')
    })

    const { error } = schema.validate(body)

    if (error) {
      return useServerTool.responseError({
        message: error.message
      })
    }

    // 安全过滤 content
    const content = body.content
    const filteredContent = content.replace(/<[^>]*>/g, '')

    const comment = await prisma.comments.create({
      data: {
        ...body,
        content: filteredContent
      }
    })

    return useServerTool.responseSuccess({
      data: comment
    })
  } catch (error) {
    return useServerTool.responseError({
      message: '服务器错误'
    })
  }
}
