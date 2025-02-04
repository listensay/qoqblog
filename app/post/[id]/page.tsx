import Header from '@/components/Header'
import HeaderLayout from '@/components/HeaderLayout'
import { fetchGetPost } from '@/service/posts'
import React, { memo } from 'react'

const page = memo(async ({ params }: { params: Promise<{ id: string }>}) => {
  const id = (await params).id
  const result = await fetchGetPost(Number(id))
  const post = result?.data.post
  console.log(post)

  return (
    <div>
      <HeaderLayout>
        <div className='bg-white p-8 rounded-lg shadow-md'>
          <div className='prose max-w-full mx-auto mb-8'>
            <h1>{ post.title }</h1>
            <div>发布时间 { post.createdAt } · 阅读 { post.views }</div>
          </div>
          <div className="prose max-w-full mx-auto" dangerouslySetInnerHTML={{ __html: post.content }}></div>
        </div>
      </HeaderLayout>
    </div>
  )
})

export default page