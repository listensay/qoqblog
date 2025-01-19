import { useServerTool } from "@/utils/useServerTool";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    useServerTool.setRequest(request)

    const body = await useServerTool.getBody()
  
    return useServerTool.responseSuccess({
      data: {
        body
      }
    })
  } catch (error) {
    console.log(error)
  }
}
