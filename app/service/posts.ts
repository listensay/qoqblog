import myRequest from "~@/utils/myRequest"

// 获取文章列表
export const fetchGetPosts = async (page: number = 1, pageSize: number = 10) => {
  try {
    const result = myRequest.get('/v1/posts', {
      page,
      pageSize
    })
    return result
  } catch (error) {
    console.log(error)
  }
}

// 获取文章内容
export const fetchGetPost = async (id: number) => {
  try {
    const result = myRequest.get(`/v1/posts/${id}`)
    return result
  } catch (error) {
    console.log(error)
  }
}