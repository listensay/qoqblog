import React, { memo } from 'react'
import Render from './_components/render'
import { Button } from '@mantine/core'
import Link from 'next/link'

const page = memo(() => {
  return (
    <div>
      <Link href={'./post/0'}>
        <Button className="mb-4">写文章</Button>
      </Link>
      <Render />
    </div>
  )
})

page.displayName = 'AuthPosts'

export default page
