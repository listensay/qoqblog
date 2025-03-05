import React, { memo } from 'react'

const BlogItem = memo(({ title, color, cover } : { title: string, color?: string, cover: string }) => {
  if (cover) {
    return (
      <div>
        <div
          className={`w-full h-full aspect-video mb-4 rounded-lg overflow-hidden text-white font-bold text-2xl max-md:text-lg bg-cover bg-no-repeat bg-center relative`}
          style={{ backgroundImage: `url(${cover})` }}
        >
          <div className="absolute inset-0 flex items-center justify-center z-10">{title}</div>
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div
        className={`h-64 max-md:h-52 w-full flex items-center justify-center ${color} mb-4 rounded-lg text-white font-bold text-2xl max-md:text-lg`}
      >
        {title}
      </div>
    </div>
  )
})

BlogItem.displayName = 'BlogItem'

export default BlogItem