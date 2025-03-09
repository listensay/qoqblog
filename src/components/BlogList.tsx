import React from 'react'
import Navigateto from '~/components/Navigato'
import BlogItem from './BlogItem'
import prisma from '~/utils/usePrisma'

export default async function BlogList({
  page = 1,
  pageSize = 10
}: {
  page: number
  pageSize: number
}) {
  const list = await prisma.post.findMany({
    skip: (Number(page) - 1) * Number(pageSize),
    take: Number(pageSize),
    orderBy: {
      id: 'desc'
    },
    where: {
      isDeleted: false
    }
  })

  const colors = [
    'bg-red-300',
    'bg-blue-300',
    'bg-green-300',
    'bg-yellow-400',
    'bg-orange-300',
    'bg-purple-300',
    'bg-pink-300'
  ]
  const randomColor = () => colors[Math.floor(Math.random() * colors.length)]

  return (
    <div>
      {list.map(item => (
        <div key={item.id} className="mb-6">
          <Navigateto href={`/${item.id}`}>
            <BlogItem
              title={item.title}
              color={randomColor()}
              cover={item.cover}
            />
          </Navigateto>
          <div className="text-gray-500 text-sm">{item.description}</div>
        </div>
      ))}
      <div>{/* 可放分页控件 */}</div>
    </div>
  )
}
