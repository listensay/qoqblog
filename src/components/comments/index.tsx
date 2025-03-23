'use client'
import { Avatar } from '@mantine/core'
import dayjs from 'dayjs'
import React, { memo, useEffect, useState } from 'react'
import { getComments } from '~/services/comment'
import Comment from './comment'

interface Comment {
  id: number
  email: string
  username: string
  url: string
  content: string
  createdAt: string
  avatar: string
  parentCommentId: number
  replies?: Comment[]
}

const MAX_REPLY_DEPTH = 2 // 设置最大回复层级

const CommentItem = ({
  comment,
  postId,
  onReply,
  replyingTo,
  refreshComments,
  level = 0
}: {
  comment: Comment
  postId: number
  onReply: (comment: Comment) => void
  replyingTo: number | null
  refreshComments: () => Promise<void>
  level?: number
}) => {
  return (
    <div
      className={`py-6 ${level > 0 ? 'ml-8 border-l-2 border-gray-100 pl-4' : ''}`}
    >
      <div className="flex gap-4 items-center">
        <div>
          <Avatar
            size="md"
            radius="xl"
            src={comment.avatar}
            className="cursor-pointer hover:opacity-80 transition-opacity duration-300"
          />
        </div>
        <div>
          <div className="text-sm">{comment.username}</div>
          <div className="text-sm text-gray-500">
            {dayjs(comment.createdAt).format('YYYY-MM-DD')}
          </div>
        </div>
      </div>
      <div className="py-4">
        <div>{comment.content}</div>

        {replyingTo === comment.id && (
          <div className="mt-4 mb-2">
            <Comment
              id={postId}
              replyComment={comment}
              setShowReply={() => onReply(comment)}
              refreshComments={async () => {
                await refreshComments()
                onReply({ ...comment, id: -1 })
              }}
            />
          </div>
        )}

        {/* 只在允许的层级内显示回复按钮 */}
        {level < MAX_REPLY_DEPTH && (
          <div
            className="text-sm text-gray-500 mt-4 flex items-center gap-2 cursor-pointer hover:text-gray-700"
            onClick={() => onReply(comment)}
          >
            Reply
          </div>
        )}
      </div>

      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-4">
          {comment.replies.map(reply => (
            <CommentItem
              key={reply.id}
              comment={reply}
              postId={postId}
              onReply={onReply}
              replyingTo={replyingTo}
              refreshComments={refreshComments}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  )
}

const Comments = memo(({ id }: { id: number }) => {
  const [comments, setComments] = useState<Comment[]>([])
  const [replyingTo, setReplyingTo] = useState<number | null>(null)

  const fetchGetComments = async () => {
    const res = await getComments(id, 1, 10)
    setComments(res.data)
  }

  useEffect(() => {
    fetchGetComments()
  })

  const handleReply = (comment: Comment) => {
    setReplyingTo(replyingTo === comment.id ? null : comment.id)
  }

  return (
    <div className="my-8 mt-16">
      <div className="text-2xl font-bold">Comments</div>
      <div className="mt-4">
        <Comment
          id={id}
          refreshComments={fetchGetComments}
          replyComment={null}
          setShowReply={() => {}}
        />
      </div>
      <div className="mt-10">
        {comments.length > 0 &&
          comments.map(comment => (
            <CommentItem
              key={comment.id}
              comment={comment}
              postId={id}
              onReply={handleReply}
              replyingTo={replyingTo}
              refreshComments={fetchGetComments}
            />
          ))}
        {comments.length === 0 && (
          <div className="flex justify-center items-center h-full py-16 text-gray-500">
            暂无评论
          </div>
        )}
      </div>
    </div>
  )
})

Comments.displayName = 'Comments'

export default Comments
