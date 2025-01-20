import prisma from "@/utils/usePrisma";
import { useServerTool } from "@/utils/useServerTool";
import { NextRequest } from "next/server";
import bcrypt from 'bcryptjs'
const { hashSync } = bcrypt

export async function POST(request: NextRequest) {
  try {
    useServerTool.setRequest(request)

    const body = await useServerTool.getBody()

    // 检测用户名
    const user = await prisma.user.findFirst({
      where: {
        username: body.username
      }
    })

    if(user) {
      return useServerTool.responseError({
        message: "用户名已存在"
      })
    }

    // 检测邮箱
    const email = await prisma.user.findFirst({
      where: {
        email: body.email
      }
    })

    if(email) {
      return useServerTool.responseError({
        message: "邮箱已存在"
      })
    }

    const saltRounds = 10
    const password = await hashSync(body.password, saltRounds)

    // 开始注册
    try {
      await prisma.user.create({
        data: {
          username: body.username,
          email: body.email,
          password: password
        }
      })
      return useServerTool.responseSuccess({
        message: "注册成功"
      })
    } catch (error) {
      return useServerTool.responseError({
        message: "注册失败"
      })
    }
  } catch (error) {
    return useServerTool.responseError({
      message: "系统错误",
      status: 400
    })
  }
}