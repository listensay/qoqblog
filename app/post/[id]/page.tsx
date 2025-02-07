import HeaderLayout from '@/components/HeaderLayout'
import { fetchGetPost } from '@/service/posts'
import React, { memo } from 'react'
import dayjs from 'dayjs'

const page = memo(async ({ params }: { params: Promise<{ id: string }>}) => {
  const id = (await params).id
  const result = await fetchGetPost(Number(id))
  const post = result?.data.post

  return (
    <div>
      <HeaderLayout>
        <div className='bg-white p-8 rounded-lg shadow-md'>
          <div className='prose max-w-full mx-auto mb-8'>
            <h1>{ post.title }</h1>
            <div>阅读 {post.views} · 发布时间 { dayjs( post.createdAt).format('YYYY年MM月DD日 hh:ss') }</div>
          </div>
          <div className="prose max-w-full mx-auto" dangerouslySetInnerHTML={{ __html: post.content }}></div>
        </div>
      </HeaderLayout>
    </div>
  )
})

export default page