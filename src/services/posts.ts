import myRequest from "~/utils/myRequest"

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

// 添加文章
export const fetchInsertPost = async (data: any) => {
  try {
    const result = myRequest.post('/v1/auth/post/insert', data)
    return result
  } catch (error) {
    console.log(error)
  }
}

// 更新文章
export const fetchUpdatePost = async (data: any) => {
  try {
    const result = myRequest.put('/v1/auth/post/update', data)
    return result
  } catch (error) {
    console.log(error)
  }
}

// 后台获取文章列表
export const fetchGetAuthPosts = async (params: any) => {
  try {
    const result = myRequest.get('/v1/auth/post', params)
    return result
  } catch (error) {
    console.log(error)
  }
}

// 删除文章
export const fetchDeletePost = async (id: number) => {
  try {
    const result = myRequest.delete(`/v1/auth/post/delete`, { id })
    return result
  } catch (error) {
    console.log(error)
  }
}