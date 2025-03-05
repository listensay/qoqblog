import { NextRequest } from 'next/server'
import { useServerTool } from '~/utils/useServerTool'

export async function GET(request: NextRequest) {
  useServerTool.setRequest(request)

  const user = await useServerTool.useAuth()
  if (!user) {
    return useServerTool.responseError({
      message: '未登录',
      status: 401
    })
  }

  const body = useServerTool.getParams()
  const url = `https://kagi.com/stream_fastgpt?query=文章标题：${body.title}，请把这篇文章当做是你自己写的，用第一人称来描述这篇文章，用文艺一点的风格，80字左右 描述不要让人感觉是AI生成的。 ${body.content}`

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Cookie:
        'kagi_session=1wCARSwbdgc.0kAUerCqtPFDtNGHgbEtuUsQziLr_G2m_Pp9dZGtics;'
    }
  })

  if (!response.body) {
    return useServerTool.responseError({
      message: 'No response body',
      success: false,
      status: 500
    })
  }

  const reader = response.body.getReader()
  const decoder = new TextDecoder('utf-8')
  let result = '' // 用于存储最终的完整结果

  while (true) {
    const { done, value } = await reader.read()
    if (done) break

    const chunk = decoder.decode(value, { stream: true })
    result += chunk
  }

  if (result.includes('[ERROR]')) {
    return useServerTool.responseError({
      message: '生成失败'
    })
  }

  // 提取所有 "data: " 后的内容
  const matches = result.match(/data: "(.*?)"/g)
  let cleanedText

  // 找到最后一个有效的 HTML 段落
  if (matches) {
    const lastMatch = matches[matches.length - 2] // 倒数第二个是最终的内容，最后一个是 [DONE]
    const finalContent = lastMatch.replace(/data: "/, '').replace(/"$/, '') // 去掉 data: " 和结尾的 "
    cleanedText = finalContent.replace(/<\/?[^>]+(>|$)/g, '')
  } else {
    return useServerTool.responseError({
      message: '生成失败'
    })
  }

  return useServerTool.responseSuccess({
    data: {
      message: cleanedText // 返回最终的纯文本结果
    }
  })
}
