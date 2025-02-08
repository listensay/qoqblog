import React, { memo } from 'react'

const ui = memo((props: { data?: string | any }) => {
  console.log(props)

  return (
    <div>ui</div>
  )
})

ui.displayName = 'Ui'

export default ui