'use client'

import React, { memo } from 'react'
import Link from 'next/link'
import {
  IconBrandBilibili,
  IconBrandGithub,
  IconBrandXFilled,
  IconHome,
  IconDashboard,
  IconBallBowling
} from '@tabler/icons-react'
import { usePathname } from 'next/navigation'

const menu = memo(() => {
  const menus = [
    {
      name: '首页',
      icon: <IconHome color="pink" size={18} />,
      path: '/'
    },
    {
      name: '关于',
      icon: <IconBallBowling color="#00b5ad" size={18} />,
      path: '/about'
    },
    {
      name: '登录',
      icon: <IconDashboard color="#f59e0b" size={18} />,
      path: '/login'
    }
  ]

  const currentNav = usePathname()

  return (
    <div className="w-full h-full">
      <div className="flex justify-between w-full h-full px-6 max-md:px-4 max-sm:text-sm">
        <nav>
          <ul className="flex h-full">
            {menus.map(item => {
              return (
                <Link
                  href={item.path}
                  className={`flex items-center h-full text-md relative px-4 max-md:px-2 ${item.path === currentNav ? 'text-pink-300' : ''}`}
                  key={item.path}
                >
                  <div
                    className={`${item.path === currentNav ? 'absolute left-0 bottom-0 h-[4px] w-full bg-pink-300' : ''}`}
                  ></div>
                  {item.icon} <span className="ml-2">{item.name}</span>
                </Link>
              )
            })}
          </ul>
        </nav>
        <div>
          <ul className="flex items-center h-full gap-2">
            <li>
              <Link
                href={`https://space.bilibili.com/344928233`}
                target="_blank"
              >
                <IconBrandBilibili color="pink" />
              </Link>
            </li>
            <li>
              <Link href={`https://github.com/listensay`} target="_blank">
                <IconBrandGithub color="black" />
              </Link>
            </li>
            <li>
              <Link href={`https://x.com/yimeng2002`} target="_blank">
                <IconBrandXFilled />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
})

menu.displayName = 'HeaderMenu'

export default menu
