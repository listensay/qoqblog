import { Loader } from '@mantine/core'
import React, { memo } from 'react'

const loading = memo(() => {
  return (
    <div className='flex justify-center items-center h-screen bg-white'>
      <Loader color="rgba(255, 130, 130, 1)" />
    </div>
  )
})

loading.displayName = 'loading'

export default loading