// 新增数据 POST
import { NextRequest } from "next/server";
import { useServerTool } from "~@/utils/useServerTool";
import prisma from "~@/utils/usePrisma";
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  useServerTool.setRequest(request);

  const cookieStore = await cookies();

  try {

    const user = await useServerTool.useAuth();

    if (!user) {
      cookieStore.delete('token');
      return useServerTool.responseError({
        message: "未登录",
        status: 401,
      });
    }
  

    const body = <any>await useServerTool.getBody();

    if (Object.keys(body).length === 0) {
      return useServerTool.responseError({
        message: "参数错误",
      });
    }

    const post = await prisma.post.create({
      data: {
        title: String(body.title),
        content: String(body.content),
        description: String(body.description),
        categoryId: Number(body.categoryId),
        cover: String(body.cover),
        authorId: user.id
      },
    });

    if (!post) {
      return useServerTool.responseError({
        message: "创建失败",
      });
    }

    return useServerTool.responseSuccess({
      message: "创建成功",
    });
  } catch (error) {
    return useServerTool.responseError({
      message: "系统错误",
      status: 500,
    });
  }
}