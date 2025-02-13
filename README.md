# CoffeeNotes - 咖啡笔记 H5

一个面向咖啡爱好者的 H5 应用，提供咖啡资讯、实用工具和个性化学习体验。

## 项目概述

CoffeeNotes 是一个基于 Web 的咖啡爱好者平台，结合 AI 技术，为用户提供个性化的咖啡知识内容和实用工具。

## 功能模块

### 1. 首页 - AI 咖啡资讯流
- AI 生成的咖啡相关内容
  - 详细资讯文章
  - 知识卡片
  - 咖啡豆/器具评测
  - 咖啡食谱/饮品创意
- 类小红书瀑布流布局
- 标签系统
- 互动功能（点赞/评论/分享）

### 2. 工具箱
- 计时器
  - 基础秒表功能
  - 预设冲煮时间
- 手冲记录
  - 水温记录
  - 水粉比记录
  - 冲煮方法选择
  - 咖啡豆信息记录
  - 口感记录
- 烘焙记录
  - 烘焙曲线记录
  - 烘焙豆信息记录
  - 烘焙结果记录
  - 数据可视化

### 3. 个人中心
- 用户画像设置
  - 咖啡偏好调查
  - 知识水平选择
- 话题订阅
  - 自然语言输入
  - AI 智能匹配
- 个人记录管理
  - 历史记录查看
  - 数据统计

## 技术架构

### 前端技术栈
- Next.js (支持 SSR 和静态生成，完美适配 Vercel)
- TypeScript
- TailwindCSS
- PWA 支持

### 后端技术栈
- Next.js API Routes (Vercel 原生支持，无需单独部署)
- MongoDB Atlas (云托管，免费层足够个人使用)
- Redis (使用 Vercel 的 Redis 插件)
- RESTful API

### 用户系统
- NextAuth.js / Firebase Authentication
- 邮箱登录 + 社交登录（Google、Facebook、Apple）
- 免密码验证（Magic Link）
- 匿名用户支持（设备指纹追踪）

### AI 技术
- DeepSeek R1 API (咖啡内容生成)
- 轻量级推荐算法 (基于用户行为数据)

## 开发路线

### Phase 1 - 项目初始化与基础设置
1. 项目基础搭建
   - 使用 create-next-app 初始化项目
   - 配置 TypeScript
   - 配置 TailwindCSS
   - 配置 ESLint 和 Prettier
   - 设置 Git Hooks (husky)
   - 配置项目目录结构

2. 基础组件开发
   - 布局组件 (Layout)
   - 导航组件 (Navigation)
   - 卡片组件 (Card)
   - 加载状态组件 (Loading)
   - 错误提示组件 (Error)
   - 通用按钮组件 (Button)
   - 表单组件 (Form Elements)

3. 工具与服务配置
   - 设置 MongoDB Atlas 连接
   - 配置 NextAuth.js
   - 设置 DeepSeek API
   - 配置 Vercel 部署

### Phase 2 - MVP 核心功能开发
1. 首页基础功能 (2周)
   - AI 生成的知识卡片展示
   - 基础瀑布流布局
   - 内容加载与分页
   - 基础交互功能

2. 核心工具开发 (2周)
   - 计时器工具
     - 基础计时功能
     - 预设时间功能
   - 手冲记录工具
     - 基础记录表单
     - 数据存储功能

3. 用户系统开发 (1周)
   - 用户注册/登录
   - 基础用户信息管理
   - 用户偏好设置

### Phase 3 - 功能完善与优化
1. AI 内容系统完善 (2周)
   - 内容生成系统优化
   - 内容分类与标签
   - 内容推荐算法

2. 工具功能增强 (2周)
   - 高级计时功能
   - 数据可视化
   - 数据导出功能

3. 性能优化 (1周)
   - 首屏加载优化
   - 图片优化
   - 缓存策略
   - PWA 支持

### Phase 4 - 社区与商业化
1. 社区功能 (3周)
   - 用户互动系统
   - 内容分享功能
   - 评论系统

2. 商业化探索 (2周)
   - 会员系统
   - 广告系统
   - 数据分析

## 当前开发进度
- [x] 项目初始化
  - [x] 创建项目仓库
  - [x] 编写 README.md
  - [ ] 初始化 Next.js 项目
  - [ ] 配置开发环境

## 项目规范

### 代码规范
- ESLint
- Prettier
- TypeScript 强类型检查
- Git Commit 规范

### 文档规范
- 接口文档
- 组件文档
- 开发文档

## 环境要求
- Node.js >= 16
- npm >= 8
- MongoDB >= 4.4
- Redis >= 6.0

## 开发指南

### 本地开发
```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 贡献指南
欢迎提交 Issue 和 Pull Request

## 许可证
MIT License 