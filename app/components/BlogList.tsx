import React from "react";
import { fetchGetPosts } from "@/service/posts";
import Navigateto from "@/components/Navigeto";
import BlogItem from "./BlogItem";

// 使用 Server Components 获取数据
async function fetchPosts(page: number, pageSize: number) {
  try {
    const result = await fetchGetPosts(page, pageSize);
    return result?.data;
  } catch (error) {
    console.log(error);
  }
}

interface BlogListPost {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  description: string;
  cover: string;
}

const BlogList = async () => {
  const page = 1; // 默认第一页
  const pageSize = 10; // 每页显示 10 条数据
  const data = await fetchPosts(page, pageSize);
  const list = data.posts;
  const total = data.total;

  // 静态颜色映射
  const colors = [
    "bg-red-300",
    "bg-blue-300",
    "bg-green-300",
    "bg-yellow-400",
    "bg-orange-300",
    "bg-purple-300",
    "bg-pink-300",
  ];

  const randomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const renderList = () => {
    return (
      <>
        {list.map((item: BlogListPost) => (
          <div key={item.id} className="mb-6">
            {/* 使用静态映射的随机颜色 */}
            <Navigateto
              href={`/post/${item.id}`}
            >
              <BlogItem title={item.title} color={ randomColor() } cover={ item.cover } />
            </Navigateto>
            <div className="text-gray-500 text-sm">{item.description}</div>
          </div>
        ))}
        <div>
          {/* <Pagination total={1} /> */}
        </div>
      </>
    );
  };

  const renderControl = () => {
    if (total === 0) {
      return <div>暂无数据</div>;
    } else {
      return renderList();
    }
  };

  return <div>{renderControl()}</div>;
};

export default BlogList;
