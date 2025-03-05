import React, { memo } from 'react'
import Header from './Header'

const HeaderLayout = memo(({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div>
        <div className="mx-auto w-[900px] max-lg:p-4 max-md:p-0 max-lg:w-full">
          <div className="shadow-md rounded-md overflow-hidden my-4 max-md:my-0 max-md:shadow-none max-md:rounded-none bg-white">
            <header className="border-b">
              <Header />
            </header>
            <main className="flex-1 max-md:p-4 max-sm:p-0">
              <div className="bg-white p-5">{children}</div>
            </main>
            <footer className="border-t">
              <div className="text-center my-6 text-gray-500 text-sm">
                © 2025 by{' '}
                <a href="https://github.com/listensay/">背影如正面</a>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  )
})

HeaderLayout.displayName = 'HeaderLayout'

export default HeaderLayout
