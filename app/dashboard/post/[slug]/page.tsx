import React, { memo } from 'react'

const page = memo(async ({
  params,
}: {
  params: Promise<{ slug: string }>
}) => {

  const slug = (await params).slug

  console.log(slug)

  return (
    <div>page</div>
  )
})

export default page