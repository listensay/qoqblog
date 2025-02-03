import { Pagination } from '@mantine/core';
import React, { memo } from 'react'
import Render from './_components/render'
import { Button } from '@mantine/core'
import Link from 'next/link'  

const page = memo(() => {
  return (
    <div>
      <Link href={ './post/new_post' }>
        <Button className='mb-4'>写文章</Button>
      </Link>
      <Render />
      <Pagination total={10} className='mt-4' />
    </div>
  )
})

export default page