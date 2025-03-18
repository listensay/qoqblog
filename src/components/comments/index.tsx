'use client'
import { Avatar, Button, Textarea, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
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

const Comments = memo(() => {
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

  const submit = (values: any) => {
    setLoading(true)
    console.log(values)
    setTimeout(() => {
      setLoading(false)
    }, 10000)
  }

  const fetchGetComments = async () => {
    const res = await getComments(18, 1, 10)
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
      <div className="mt-4">
        {comments.map(comment => (
          <div key={comment.id} className="flex gap-2">
            <div>
              <Avatar src={comment.avatar} />
            </div>
            <div>
              <div>{comment.username}</div>
              <div>{comment.content}</div>
              <div>{comment.createdAt}</div>
              <div>{comment.url}</div>
              <div>{comment.parentCommentId}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
})

export default Comments
