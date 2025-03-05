import HeaderLayout from '~/components/HeaderLayout'
import React, { memo } from 'react'

const page = memo(() => {
  return (
    <div>
      <HeaderLayout>
        <div className='prose max-sm:prose-sm'>
          <h1>🧑‍💻 关于我</h1>
          <ul>
            <li>我是，背影如正面。</li>
            <li>我来自广西，是一个零零后，是一个大专人，是一个前端开发工程师。</li>
            <li>我的兴趣爱好十分广泛，喜欢看小说、写代码、画画。</li>
            <li>INFP-T</li>
          </ul>
          <h2>现状</h2>
          <ul>
            <li>Node全栈开发者：Vue.js，React.js，Nuxtjs，Nextjs，Prisma，Mysql</li>
            <li>卑微寻求工作中...</li>
          </ul>
        </div>
      </HeaderLayout>
    </div>
  )
})

page.displayName = 'About'

export default page