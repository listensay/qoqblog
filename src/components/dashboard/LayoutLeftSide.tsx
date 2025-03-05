import React, { memo } from 'react'
import Link from 'next/link'

interface IMenu {
  name: string,
  icon: string,
  path: string,
}

const Page = memo(() => {

  const menu: IMenu[] = [
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
  ]

  return (
    <div>
      <ul>
        {
          menu.map(item => {
            return (
              <li key={item.path}>
                <Link href={ '/dashboard' + item.path }>{ item.name }</Link>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
})

Page.displayName = 'LayoutLeftSide'

export default Page
