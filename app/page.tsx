export const dynamic = 'force-dynamic'

import { Suspense } from 'react'
import BlogList from '~/components/BlogList'
import HeaderLayout from '~/components/HeaderLayout'

export default async function Home() {
  return (
    <div>
      <HeaderLayout>
        <Suspense fallback={<p>Loading feed...</p>}>
          <BlogList page={1} pageSize={10} />
        </Suspense>
      </HeaderLayout>
    </div>
  )
}
