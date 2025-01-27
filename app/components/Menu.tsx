import React, { memo } from 'react'
import Link from 'next/link'

const menu = memo(() => {
  return (
    <div>
      <div className='h-20'></div>
      <div className="fixed w-full h-20 top-0">
        <div className="flex justify-between p-4 px-6 m-2 bg-red-50 rounded-md">
          <div>
            <Link href="/">
              <h1>背影如正面</h1>
            </Link>
          </div>
          <div className="flex-shrink-0">
            <ul className="flex gap-4">
              <li><Link href="/">Home</Link></li>
            </ul>
          </div>
          <div><Link href="/login">Login</Link></div>
        </div>
      </div>
    </div>
  )
})

export default menu