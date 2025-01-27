"use client"

import React, { memo, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../lib/hooks'
import { getUserProfile } from '@/lib/features/users/userSilce'
import { Button } from '@mantine/core'

const Page = memo(() => {
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

  return (
    <div>
      <h1>User Profile</h1>
      <p>Username: {profile.username || 'No username'}</p>
      <p>Email: {profile.email || 'No email'}</p>
      <p>Nickname: {profile.nickname || 'No nickname'}</p>
      <Button></Button>
      {/* 其他字段 */}
    </div>
  )
})

export default Page
