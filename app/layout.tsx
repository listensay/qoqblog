import type { Metadata } from "next";
import type { ReactNode } from "react";

import "@/assets/styles/globals.css";
import '@/assets/styles/nprogress.css';
import '@mantine/notifications/styles.css';
import '@mantine/core/styles.css';
import '@mantine/code-highlight/styles.css';

import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import ProgressBar from "@/components/ProgressBar";
import StoreProvider from "./StoreProvider";

export const metadata: Metadata = {
  title: "背影如正面",
  description: "不要倒在黎明前的黑夜里",
};

interface Props {
  readonly children: ReactNode;
}
export default function RootLayout({ children }: Props) {
  return (
    <StoreProvider>
      <html lang="en">
        <body
          className={`antialiased bg-indigo-50`}
        >
          <MantineProvider>
            <Notifications />
            <ProgressBar />
            <div>{children}</div>
          </MantineProvider>
        </body>
      </html>
    </StoreProvider>
  );
}
