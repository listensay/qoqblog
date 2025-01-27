'use client'

import { Group, TextInput, Button } from '@mantine/core'
import { useForm, hasLength } from '@mantine/form';
import React, { memo } from 'react'
import useRequest from '../../utils/myRequest'
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';

const page = memo(() => {
  const router = useRouter()

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      username: "odr233",
      password: "meng@2002"
    },

    validate: {
      username: hasLength({ min: 3, max: 18 }, 'Username must be 6-18 characters long'),
      password: hasLength({ min: 6, max: 18 }, 'Password must be 6-18 characters long'),
    },
  });

  const submit = async (e: any) => {
    const result = await useRequest.post('/v1/login', e)
    if(result.success) {
      notifications.show({
        title: "登录成功",
        message: "欢迎回来",
        autoClose: 5000,
        color: "green",
        position: "bottom-center",
      })
    }
    router.push('/dashboard')
  }

  return (
    <div className='flex justify-center'>
      <div className='w-96'>
        <form onSubmit={ form.onSubmit((e) => { submit(e) }) }>
          <TextInput
            label="用户名"
            placeholder="Username"
            withAsterisk
            key={form.key('username')}
            {...form.getInputProps('username')}
          />
          <TextInput
            label="密码"
            placeholder="Password"
            withAsterisk
            key={form.key('password')}
            {...form.getInputProps('password')}
            type='password'
          />
          <Group justify="flex-end" mt="md">
            <Button type="submit">登录</Button>
          </Group>
        </form>
      </div>
    </div>
  )
})

export default page