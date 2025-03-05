export const dynamic = 'force-dynamic'

import { Suspense } from 'react'
import BlogList from '~/components/BlogList'
import HeaderLayout from '~/components/HeaderLayout'
import { fetchGetPosts } from '~/services/posts'

export interface BlogListPost {
  id: number
  title: string
  content: string
  createdAt: string
  description: string
  cover: string
}

const getData = async (): Promise<BlogListPost[]> => {
  const page = 1
  const pageSize = 10
  try {
    const responent = await fetchGetPosts(page, pageSize)
    if (!responent?.data || !responent.data.posts) {
      return []
    }
    return responent.data.posts
  } catch (error) {
    console.error('获取 posts 数据失败：', error)
    return []
  }
}

export default async function Home() {
  const list = await getData()

  return (
    <div>
      <HeaderLayout>
        <Suspense fallback={<p>Loading feed...</p>}>
          <BlogList list={list} />
        </Suspense>
      </HeaderLayout>
    </div>
  )
}
