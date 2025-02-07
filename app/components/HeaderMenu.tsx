"use client";

import React, { memo } from 'react';
import Link from 'next/link';
import { IconBrandBilibili, IconBrandGithub, IconBrandXFilled, IconHome, IconUserCircle } from '@tabler/icons-react';
import { usePathname } from 'next/navigation';

const menu = memo(() => {
  const menus = [
    {
      name: '首页',
      icon: <IconHome color="pink" />,
      path: '/',
    },
    {
      name: '关于我',
      icon: <IconUserCircle color="#a78bfa" />,
      path: '/about',
    },
  ];

  const currentNav = usePathname();

  return (
    <div className="w-full">
      <div className="flex justify-between w-full px-6">
        <nav>
          <ul className="flex gap-4">
            {menus.map((item) => {
              return (
                <Link 
                  href={item.path}
                  className={`flex ${ item.path === currentNav ? 'text-sky-500' : '' }`}
                  key={item.path}
                >
                  {item.icon} <span className="ml-2">{item.name}</span>
                </Link>
              );
            })}
          </ul>
        </nav>
        <div>
          <ul className="flex gap-2">
            <li>
              <Link href={`https://space.bilibili.com/344928233`} target="_blank">
                <IconBrandBilibili color="pink" />
              </Link>
            </li>
            <li>
              <Link href={`https://github.com/listensay`} target="_blank">
                <IconBrandGithub color="black" />
              </Link>
            </li>
            <li>
              <Link href={`https://x.com/yimeng2002`} target="_blank">
                <IconBrandXFilled />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
});

export default menu;
