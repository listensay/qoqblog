import HeaderLayout from '@/components/HeaderLayout'
import React, { memo } from 'react'

const page = memo(() => {
  return (
    <div>
      <HeaderLayout>
        page
      </HeaderLayout>
    </div>
  )
})

page.displayName = 'About'

export default page