"use client";

import React, { useState } from "react";
import Link from "next/link";

interface NavigetoProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

const Navigeto: React.FC<NavigetoProps> = ({ href, className, children }) => {
  const [isNavigating, setIsNavigating] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isNavigating) {
      e.preventDefault(); // 阻止重复跳转
      return;
    }
    setIsNavigating(true);
    setTimeout(() => {
      setIsNavigating(false); // 重置状态
    }, 1000); // 防抖时间为 1 秒
  };

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
};

export default Navigeto;
