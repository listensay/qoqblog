// 修改数据 POST
import { NextRequest } from "next/server";
import { useServerTool } from "~@/utils/useServerTool";
import prisma from "~@/utils/usePrisma";
import { cookies } from 'next/headers';

export async function PUT(request: NextRequest) {
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

    const post = await prisma.post.update({
      where: {
        id: Number(body.id),
      },
      data: {
        title: String(body.title),
        content: String(body.content),
        description: String(body.description),
        categoryId: Number(body.categoryId),
        cover: String(body.cover),
      },
    });

    if (!post) {
      return useServerTool.responseError({
        message: "修改失败",
      });
    }

    return useServerTool.responseSuccess({
      message: "修改成功",
    });
  } catch {
    return useServerTool.responseError({
      message: "系统错误",
      status: 500,
    });
  }
}