'use client'

import React, { memo } from 'react'
import { AppShell, Group } from '@mantine/core'
import Menu from '~/components/Menu'
import LayoutRightSide from '~/components/dashboard/LayoutRightSide'

const layout = memo(({ children }: { children: React.ReactNode }) => {
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm' }}
      aside={{ width: 300, breakpoint: 'sm' }}
      transitionDuration={0}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <h1>QOQ 后台管理系统</h1>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar>
        <Menu />
      </AppShell.Navbar>

      <AppShell.Aside p="md">
        <LayoutRightSide />
      </AppShell.Aside>

      <AppShell.Main className="bg-white">{children}</AppShell.Main>
    </AppShell>
  )
})

layout.displayName = 'DashboardLayout'

export default layout
