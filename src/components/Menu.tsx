import React, { memo, useEffect, useState, useMemo } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
interface IMenu {
  name: string
  icon: string
  path: string
}

const Page = memo(() => {
  const [active, setActive] = useState('')

  const menu = useMemo<IMenu[]>(
    () => [
      {
        name: '仪表盘',
        icon: 'home',
        path: '/'
      },
      {
        name: '文章',
        icon: 'post',
        path: '/post'
      },
      {
        name: '代码生成',
        icon: 'code',
        path: '/code'
      }
    ],
    []
  )

  const pathname = usePathname()

  useEffect(() => {
    menu.forEach(item => {
      if (pathname.includes(item.path)) {
        setActive(item.path)
      }
    })
  }, [pathname, menu])

  const handleSetActive = (path: string) => {
    setActive(path)
  }

  return (
    <div>
      <ul>
        {menu.map(item => {
          return (
            <li key={item.path}>
              <Link
                href={'/dashboard' + item.path}
                className={`block p-4 cursor-pointer relative transition-all duration-300 ease-in-out hover:bg-gray-50 ${
                  active === item.path ? 'text-rose-500 font-medium' : ''
                }`}
                onClick={() => handleSetActive(item.path)}
              >
                {active === item.path && (
                  <div className="absolute right-0 top-0 h-full w-1 bg-rose-300 transition-all duration-300 ease-in-out" />
                )}
                {item.name}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
})

Page.displayName = 'Menu'

export default Page
