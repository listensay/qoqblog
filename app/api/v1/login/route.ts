import { useServerTool } from '~/utils/useServerTool'
import { NextRequest } from 'next/server'
import bcrypt from 'bcryptjs'
import prisma from '~/utils/usePrisma'
const { compare } = bcrypt
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    useServerTool.setRequest(request)

    const body = await useServerTool.getBody()

    const user = await prisma.user.findFirst({
      where: {
        username: body.username
      }
    })

    if (!user) {
      return useServerTool.responseError({
        message: '用户名不存在'
      })
    }

    const isTheSame = await compare(body.password, user.password)
    if (!isTheSame) {
      return useServerTool.responseError({
        message: '密码错误'
      })
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: '24h'
      }
    )

    const cookieStore = await cookies()
    cookieStore.set('token', token, {
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
      maxAge: 60 * 60 * 24
    })

    return useServerTool.responseSuccess({
      data: {
        token
      }
    })
  } catch (error) {
    console.log(error)
  }
}
