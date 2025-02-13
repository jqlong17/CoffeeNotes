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

### Phase 1 - MVP
1. 首页基础功能
   - AI 生成的知识卡片展示
   - 基础瀑布流布局
2. 核心工具
   - 计时器
   - 基础手冲记录
3. 用户系统
   - 基础用户注册/登录
   - 简单的用户画像设置

### Phase 2 - 功能完善
1. AI 内容生成系统完善
2. 高级工具功能
3. 个性化推荐
4. 数据可视化

### Phase 3 - 优化与扩展
1. 性能优化
2. PWA 支持
3. 社区功能
4. 商业化探索

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