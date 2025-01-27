import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@/styles/globals.css";
import '@/styles/nprogress.css';
import '@mantine/notifications/styles.css';
import '@mantine/core/styles.css';
import Menu from '@/components/Menu'
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
          className={`antialiased`}
        >
          <MantineProvider>
            <Menu />
            <Notifications />
            <ProgressBar />
            <div className="p-2 pt-0">{children}</div>
          </MantineProvider>
        </body>
      </html>
    </StoreProvider>
  );
}
