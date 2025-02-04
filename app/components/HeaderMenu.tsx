import React, { memo } from 'react'
import Link from 'next/link'
import { IconBrandBilibili, IconBrandGithub, IconBrandXFilled } from '@tabler/icons-react'

const menu = memo(() => {
  return (
    <div className='w-full'>
        <div className="flex justify-between w-full px-6">
          <nav>
            <ul className="flex gap-4">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About</Link></li>
            </ul>
          </nav>
          <div>
            <ul className='flex gap-2'>
              <li>
                <Link href={`https://space.bilibili.com/344928233`} target="_blank">
                  <IconBrandBilibili color='pink' />
                </Link>
              </li>
              <li>
                <Link href={`https://github.com/listensay`}>
                  <IconBrandGithub color='black' />
                </Link>
              </li>
              <li>
                <Link href={`https://x.com/yimeng2002`}>
                  <IconBrandXFilled />
                </Link>
              </li>
            </ul>
          </div>
        </div>
    </div>
  )
})

export default menu