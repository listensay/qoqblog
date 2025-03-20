'use client'
import { Avatar, Button, Textarea, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import dayjs from 'dayjs'
import React, { memo, useEffect, useState } from 'react'
import { getComments, createComment } from '~/services/comment'

interface Comment {
  id: number
  email: string
  username: string
  url: string
  content: string
  createdAt: string
  avatar: string
  parentCommentId: number
}

const Comments = memo(({ id }: { id: number }) => {
  const [loading, setLoading] = useState(false)
  const [comments, setComments] = useState<Comment[]>([])
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      username: '',
      url: '',
      content: ''
    },

    validate: {
      username: value => (value.length > 0 ? null : '用户名不能为空'),
      email: value => (/^\S+@\S+$/.test(value) ? null : '邮箱格式不正确'),
      content: value => (value.length > 0 ? null : '内容不能为空')
    }
  })

  const submit = async (values: any) => {
    setLoading(true)
    await handleSubmit(values)
    setLoading(false)
  }

  const handleSubmit = async (values: any) => {
    try {
      const data = {
        ...values,
        postId: id
      }

      await createComment(data)
      await fetchGetComments()
    } catch (error) {
      console.log(error)
    }
  }

  const fetchGetComments = async () => {
    const res = await getComments(id, 1, 10)
    setComments(res.data)
  }

  useEffect(() => {
    fetchGetComments()
  }, [])

  return (
    <div className="my-8 mt-16">
      <div className="text-2xl font-bold">Comments</div>
      <div className="mt-4">
        <form onSubmit={form.onSubmit(values => submit(values))}>
          <div className="flex gap-2 justify-between mb-4">
            <TextInput
              placeholder="Name"
              {...form.getInputProps('username')}
              className="w-1/3"
            />
            <TextInput
              placeholder="Email"
              {...form.getInputProps('email')}
              className="w-1/3"
            />
            <TextInput
              placeholder="Website"
              {...form.getInputProps('url')}
              className="w-1/3"
            />
          </div>
          <Textarea
            placeholder="Leave a comment"
            {...form.getInputProps('content')}
            minRows={5}
            autosize
            className="mb-4"
          />
          <Button type="submit" loading={loading}>
            Submit
          </Button>
        </form>
      </div>
      <div className="mt-10">
        {comments.length > 0 &&
          comments.map(comment => (
            <div key={comment.id} className="pb-4 mb-4">
              <div className="flex gap-4 items-center">
                <div>
                  <Avatar size="md" radius="xl" src={comment.avatar} />
                </div>
                <div>
                  <div className="text-lg">{comment.username}</div>
                  <div className="text-sm text-gray-500">
                    {dayjs(comment.createdAt).format('YYYY-MM-DD')}
                  </div>
                </div>
              </div>
              <div className="py-4">{comment.content}</div>
            </div>
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

export default Comments
