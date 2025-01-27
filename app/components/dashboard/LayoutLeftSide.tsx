"use client"

import React, { memo, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../lib/hooks'
import { getUserProfile } from '@/lib/features/users/userSilce'
import { Button } from '@mantine/core'
import { useFetchAuthLogout } from '@/service/user'
import { notifications } from '@mantine/notifications'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const Page = memo(() => {
  const router = useRouter()

  const dispatch = useAppDispatch()
  const profile = useAppSelector(state => state.user.profile)

  useEffect(() => {
    // 使用 IIFE 处理异步操作
    const fetchProfile = async () => {
      await dispatch(getUserProfile())
    }
    fetchProfile()
  }, [dispatch])

  // 处理无数据状态
  if (!profile) {
    return <div>No profile available</div>
  }

  const logout = async () => {
    await useFetchAuthLogout()
    notifications.show({
      title: '退出登录',
      message: '退出登录成功',
      color: 'blue',
      position: 'bottom-center'
    })
    router.push('/')
  }

  return (
    <div>
      我是菜单
    </div>
  )
})

export default Page
