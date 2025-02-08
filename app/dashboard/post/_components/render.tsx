'use client'

import React, { memo, useEffect, useState } from 'react'
import { Button, LoadingOverlay, Pagination, Table } from '@mantine/core';
import { fetchDeletePost, fetchGetAuthPosts } from '@/service/posts';
import dayjs from 'dayjs';
import Link from 'next/link';
import { notifications } from '@mantine/notifications';

const list = memo(() => {
  const [loading, setLoading] = useState(false)
  const [list, setList] = useState([])


  const getLists = async () => {
    setLoading(true)
    const result = await fetchGetAuthPosts({ page: 1, pageSize: 10 })
    setList(result?.data.posts)
    setLoading(false)
  }

  useEffect(() => {
    getLists()
  }, [])

  const deleteHandle = async (id: number) => {
    const result = await fetchDeletePost(id)
    if (result?.success) {
      await getLists()
      notifications.show({
        title: "删除成功",
        message: "删除成功",
      })
    }
  }
  
  const rows = list?.map((item: any) => (
    <Table.Tr key={item.id}>
      <Table.Td align='center'>
        <Link href={`/dashboard/post/${item.id}`} className='mr-2 text-blue-500'>
          {item.title}
        </Link>
      </Table.Td>
      <Table.Td>{item.views}</Table.Td>
      <Table.Td>{item.likes}</Table.Td>
      <Table.Td>{item.category.name}</Table.Td>
      <Table.Td align='center'>{dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss')}</Table.Td>
      <Table.Td width={ '150'} align='center'>
        <Button
          variant="light"
          color="red"
          size="xs"
          onClick={() => {
            deleteHandle(item.id);
          }}
        >
          删除
        </Button>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <div>
      <LoadingOverlay visible={loading} />
      <div className='border rounded-md'>
        <Table striped highlightOnHover withColumnBorders>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>标题</Table.Th>
              <Table.Th>阅读</Table.Th>
              <Table.Th>喜欢</Table.Th>
              <Table.Th>分类</Table.Th>
              <Table.Th>发布时间</Table.Th>
              <Table.Th>操作</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {rows}
          </Table.Tbody>
        </Table>
        <Pagination total={10} className='mt-4' />
      </div>
    </div>
  )
})

list.displayName = 'AuthPostlist'

export default list