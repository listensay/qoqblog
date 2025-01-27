import type { Metadata } from "next";
import Menu from './components/Menu'
import "./globals.css";
import '@mantine/notifications/styles.css';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import './nprogress.css';
import ProgressBar from "./components/ProgressBar";

export const metadata: Metadata = {
  title: "背影如正面",
  description: "不要倒在黎明前的黑夜里",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
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
  );
}
