import myRequest from '~/utils/myRequest'

export const getComments = async (
  postId: number,
  page: number,
  limit: number
) => {
  const comments = await myRequest.get('/v1/comments', {
    postId,
    page,
    limit
  })
  return comments
}

export const createComment = async (comment: Comment) => {
  const comments = await myRequest.post('/v1/comment', comment)
  return comments
}
