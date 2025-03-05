// 删除数据 POST
import { NextRequest } from "next/server";
import { useServerTool } from "~/utils/useServerTool";
import prisma from "~/utils/usePrisma";
import { cookies } from 'next/headers';

export async function DELETE(request: NextRequest) {
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
        isDeleted: true,
      }
    });

    if (!post) {
      return useServerTool.responseError({
        message: "删除失败",
      });
    }

    return useServerTool.responseSuccess({
      message: "删除成功",
    });
  } catch {
    return useServerTool.responseError({
      message: "系统错误",
      status: 500,
    });
  }
}