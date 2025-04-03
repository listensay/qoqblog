import type { Metadata } from 'next'
import { Suspense, type ReactNode } from 'react'

import '~/assets/styles/globals.css'
import '~/assets/styles/nprogress.css'
import '@mantine/notifications/styles.css'
import '@mantine/core/styles.css'
import '@mantine/code-highlight/styles.css'

import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import ProgressBar from '~/components/ProgressBar'
import StoreProvider from '~/providers/StoreProvider'

export const metadata: Metadata = {
  title: '背影如正面',
  description: '不要倒在黎明前的黑夜里'
}

interface Props {
  readonly children: ReactNode
}
export default function RootLayout({ children }: Props) {
  return (
    <StoreProvider>
      <html lang="en">
        <body
          className={`min-h-[100vh]  bg-[url(/gradient.jpg)] bg-cover bg-no-repeat`}
        >
          <MantineProvider>
            <Notifications />
            <Suspense fallback={<div>Loading...</div>}>
              <ProgressBar />
            </Suspense>
            <div>{children}</div>
          </MantineProvider>
        </body>
      </html>
    </StoreProvider>
  )
}
