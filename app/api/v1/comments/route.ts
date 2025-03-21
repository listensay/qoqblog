import { NextRequest, NextResponse } from 'next/server'
import prisma from '~/utils/usePrisma'
import { useServerTool } from '~/utils/useServerTool'
import joi from 'joi'
import md5 from 'md5'

export async function GET(request: NextRequest) {
  try {
    useServerTool.setRequest(request)

    const body = useServerTool.getParams()

    const schema = joi.object({
      postId: joi.number().required(),
      page: joi.number().required(),
      limit: joi.number().required()
    })

    const { error } = schema.validate(body)

    if (error) {
      return useServerTool.responseError({
        message: error.message
      })
    }

    const commentFace = {
      id: true,
      username: true,
      email: true,
      url: true,
      content: true,
      createdAt: true
    }

    const comments = await prisma.comments.findMany({
      where: {
        postId: Number(body.postId),
        isDeleted: false,
        parentCommentId: null // 只查询顶级评论
      },
      orderBy: {
        createdAt: 'desc'
      },
      skip: (Number(body.page) - 1) * Number(body.limit),
      take: Number(body.limit),
      select: {
        ...commentFace,
        parentCommentId: true,
        replies: {
          where: { isDeleted: false },
          select: {
            ...commentFace,
            parentCommentId: true,
            replies: {
              where: { isDeleted: false },
              select: {
                ...commentFace,
                parentCommentId: true
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    })

    // 递归处理评论数据
    const processComment = (comment: any) => {
      const { email, replies, ...rest } = comment
      return {
        ...rest,
        avatar: `https://cravatar.cn/avatar/${md5(email || '')}?d=mp`,
        replies: replies ? replies.map(processComment) : []
      }
    }

    const responseComments = comments.map(processComment)

    return useServerTool.responseSuccess({
      data: responseComments
    })
  } catch (error) {
    return useServerTool.responseError({
      message: '服务器错误'
    })
  }
}
