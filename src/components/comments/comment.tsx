import React, { memo, useState } from 'react'
import { useForm } from '@mantine/form'
import { createComment } from '~/services/comment'
import { Button, Textarea, TextInput } from '@mantine/core'

const comment = memo(
  ({
    id,
    replyComment,
    setShowReply,
    refreshComments
  }: {
    id: number
    replyComment: any
    setShowReply: (showReply: boolean) => void
    refreshComments: () => void
  }) => {
    const [loading, setLoading] = useState(false)

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
          postId: id,
          parentCommentId: replyComment?.id
        }

        await createComment(data)
        refreshComments()
      } catch (error) {
        console.log(error)
      }
    }

    return (
      <div>
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
            <div className="flex gap-2">
              <Button type="submit" loading={loading}>
                Submit
              </Button>
              {replyComment && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowReply(false)}
                >
                  Cancel Reply
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    )
  }
)

comment.displayName = 'Comment'

export default comment
