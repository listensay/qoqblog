import React, { memo } from 'react'

const fronend = memo((props: { data?: string | any }) => {
  console.log(props)

  return <div>fronend</div>
})

fronend.displayName = 'fronend'

export default fronend
