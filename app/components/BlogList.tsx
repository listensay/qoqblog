import React from "react";
import Navigateto from "@/components/Navigato";
import BlogItem from "./BlogItem";
import { BlogListPost } from "@/page";

export default async function BlogList({ list }: { list: BlogListPost[] }) {

  const colors = [
    "bg-red-300",
    "bg-blue-300",
    "bg-green-300",
    "bg-yellow-400",
    "bg-orange-300",
    "bg-purple-300",
    "bg-pink-300",
  ];
  const randomColor = () =>
    colors[Math.floor(Math.random() * colors.length)];

  return (
    <div>
      {list.map((item: BlogListPost) => (
        <div key={item.id} className="mb-6">
          <Navigateto href={`/${item.id}`}>
            <BlogItem
              title={item.title}
              color={randomColor()}
              cover={item.cover}
            />
          </Navigateto>
          <div className="text-gray-500 text-sm">{item.description}</div>
        </div>
      ))}
      <div>{/* 可放分页控件 */}</div>
    </div>
  );
}
