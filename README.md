# Next.js 15 博客项目

这是一个使用 Next.js 15 构建的现代化博客系统，采用 App Router 架构，支持服务器端渲染和静态站点生成。

## 技术栈

- **框架**: Next.js 15 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **数据库**: Prisma ORM
- **状态管理**: 自定义 Store
- **开发工具**: ESLint, PostCSS

## 项目结构

```
├── app/                    # Next.js 15 主应用目录
│   ├── api/               # API 路由
│   ├── [id]/             # 动态路由页面
│   ├── about/            # 关于页面
│   ├── dashboard/        # 仪表盘页面
│   ├── login/            # 登录页面
│   ├── layout.tsx        # 根布局组件
│   └── page.tsx          # 首页
├── src/                   # 源代码目录
│   ├── components/       # 共享组件
│   ├── assets/          # 静态资源
│   ├── providers/       # 全局提供者组件
│   │   └── StoreProvider.tsx
│   ├── services/        # API 请求接口
│   ├── store/           # 状态管理库
│   │   ├── features/    # 状态管理特性
│   │   ├── hooks.ts     # 自定义 hooks
│   │   └── index.ts     # 状态管理入口文件
│   └── utils/           # 工具函数
├── prisma/              # Prisma 数据库配置和模型
├── public/             # 静态文件目录
└── middleware.ts       # Next.js 中间件
```

## 功能特性

- 🚀 基于 Next.js 15 的现代化架构
- 📱 响应式设计，支持多端适配
- 🔒 用户认证系统
- 📊 数据可视化仪表盘
- 🛍️ 状态管理库
- 🛠️ 服务管理
- 📝 博客文章管理
- 🔍 SEO 优化

## 开始使用

### 环境要求

- Node.js 18.17 或更高版本
- npm 9.0 或更高版本

### 安装依赖

```bash
npm install
# 或
yarn install
# 或
pnpm install
```

### 开发环境运行

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看项目。

### 生产环境构建

```bash
npm run build
# 或
yarn build
# 或
pnpm build
```

### 生产环境运行

```bash
npm run start
# 或
yarn start
# 或
pnpm start
```

## 环境变量配置

项目使用 `.env.development` 和 `.env.production` 文件管理环境变量。请确保在运行项目前正确配置这些文件。

## 部署

推荐使用 [Vercel](https://vercel.com) 部署本项目，它提供了最佳的 Next.js 部署体验。

## 开发指南

### 代码规范

- 使用 ESLint 进行代码检查
- 遵循 TypeScript 严格模式
- 使用 Prettier 进行代码格式化

### 提交规范

提交信息应遵循以下格式：
```
<type>(<scope>): <subject>

<body>

<footer>
```

type 类型：
- feat: 新功能
- fix: 修复
- docs: 文档
- style: 格式
- refactor: 重构
- test: 测试
- chore: 构建过程或辅助工具的变动

## 贡献指南

1. Fork 本仓库
2. 创建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情
