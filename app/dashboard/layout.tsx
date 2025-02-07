'use client'

import React, { memo } from 'react'
import { AppShell, Burger, Group, Skeleton } from '@mantine/core';
import LayoutLeftSide from "@/components/dashboard/LayoutLeftSide"
import LayoutRightSide from "@/components/dashboard/LayoutRightSide"


const layout = memo(({ children }: { children: React.ReactNode }) => {

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm'}}
      aside={{ width: 300, breakpoint: 'sm'}}
      transitionDuration={0}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <h1>QOQ 后台管理系统</h1>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <LayoutLeftSide />
      </AppShell.Navbar>

      <AppShell.Aside p="md">
        <LayoutRightSide />
      </AppShell.Aside>

      <AppShell.Main className='bg-white'>{ children }</AppShell.Main>
    </AppShell>
  )
})

export default layout