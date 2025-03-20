import HeaderLayout from '~/components/HeaderLayout'
import React, { memo } from 'react'
import dayjs from 'dayjs'
import prisma from '~/utils/usePrisma'
import { metadata } from '@/layout'
import type { Metadata } from 'next'
import Comments from '~/components/comments'

interface Post {
  id: number
  title: string
  content: string | null
  views: number
  createdAt: Date
  description: string | null
}

type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params

  const blog = await getPost(id)

  return {
    title: blog?.title,
    description: blog?.description
  }
}

const getPost = async (id: string): Promise<Post | null> => {
  const post = await prisma.post.findUnique({
    where: {
      id: Number(id)
    }
  })

  if (!post) {
    return null
  }

  await prisma.post.update({
    where: {
      id: Number(id)
    },
    data: {
      views: {
        increment: 1
      }
    }
  })

  // SEO
  metadata.title = post.title
  metadata.description = post.description

  return post
}

const page = memo(async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id
  const post = await getPost(id)

  if (!post) {
    return <div>文章不存在</div>
  }

  return (
    <div>
      <HeaderLayout>
        <div>
          <div className="prose max-sm:prose-sm max-w-full mx-auto mb-8">
            <h1>{post.title}</h1>
            <div>
              阅读 {post.views} · 发布时间{' '}
              {dayjs(post.createdAt).format('YYYY年MM月DD日 hh:ss')}
            </div>
          </div>
          <div
            className="prose max-w-full mx-auto"
            dangerouslySetInnerHTML={{ __html: post.content || '' }}
          ></div>
          <Comments id={post.id} />
        </div>
      </HeaderLayout>
    </div>
  )
})

page.displayName = 'PostDetail'

export default page
