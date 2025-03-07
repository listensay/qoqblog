import React, { memo } from 'react'
import Menu from '~/components/HeaderMenu'
import Image from 'next/image'

const Header = memo(() => {
  return (
    <div className="relative">
      <div
        className="w-full h-72 max-md:h-52"
        style={{
          backgroundImage: 'url("/bg.jpg")',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }}
      ></div>
      <div className="absolute w-full h-72 top-0 bg-gradient-to-b from-[#ffffff00] to-[#747474ab] max-md:h-52">
        <div className="absolute bottom-4 left-4 flex items-center">
          <div>
            <Image
              src="/avatar.png"
              width={100}
              height={100}
              className="w-16 h-16 rounded-full border-2 border-white"
              alt="avatar"
            />
          </div>
          <div className="ml-3">
            <div className="text-xl text-white font-bold mb">背影如正面</div>
            <div className="text-sm text-white">不要倒在黎明前的黑夜里</div>
          </div>
        </div>
      </div>
      <div className="bg-white h-12 flex items-center">
        <Menu />
      </div>
    </div>
  )
})

Header.displayName = 'Header'

export default Header
