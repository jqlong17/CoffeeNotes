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

### 开发工具与环境
- Cursor IDE (AI 辅助开发)
- Git (版本控制)
- Node.js >= 16
- npm >= 8

### AI 辅助开发注意事项
- 使用 Cursor IDE 进行开发，充分利用 AI 能力
- 在开发前查看本文档，了解项目结构和开发规范
- 保持清晰的代码注释，方便 AI 理解和生成代码
- 定期更新文档，记录重要的代码结构和开发决策
- 使用 AI 生成代码时，确保符合项目规范和最佳实践

### 项目结构
```
src/
├── app/                 # Next.js 13+ App Router
│   ├── layout.tsx      # 根布局
│   ├── page.tsx        # 首页
│   ├── tools/          # 工具箱页面
│   └── profile/        # 个人中心页面
├── components/         # 可复用组件
│   ├── ui/            # 基础 UI 组件
│   ├── layout/        # 布局组件
│   └── features/      # 功能组件
├── lib/               # 工具函数和配置
│   ├── utils/         # 通用工具函数
│   ├── api/           # API 相关
│   └── config/        # 配置文件
├── types/             # TypeScript 类型定义
├── styles/            # 全局样式
└── public/            # 静态资源
```

### 开发注意事项
1. 代码组织
   - 遵循 Next.js 13+ App Router 的文件约定
   - 组件使用 TypeScript 编写，确保类型安全
   - 使用 TailwindCSS 进行样式开发

2. AI 开发流程
   - 开发新功能前，先在文档中明确需求和实现方案
   - 使用 Cursor AI 生成代码时，提供清晰的上下文
   - 定期检查和更新项目文档，确保其反映最新的开发状态

3. 代码提交
   - 遵循 Git Commit 规范
   - 提交前进行代码审查和测试
   - 更新相关文档和开发进度

4. 性能考虑
   - 使用 Next.js 的 SSR/SSG 特性优化性能
   - 实现适当的数据缓存策略
   - 注意移动端适配和响应式设计

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

### Phase 1 - 项目初始化与基础设置（Day 1）
1. 上午：项目基础搭建
   - 使用 create-next-app 初始化项目
   - 配置 TypeScript
   - 配置 TailwindCSS
   - 配置 ESLint 和 Prettier
   - 设置 Git Hooks (husky)

2. 下午：基础组件开发
   - 布局组件 (Layout)
   - 导航组件 (Navigation)
   - 卡片组件 (Card)
   - 通用 UI 组件库搭建

3. 晚上：工具与服务配置
   - 设置 MongoDB Atlas 连接
   - 配置 NextAuth.js
   - 设置 DeepSeek API

### Phase 2 - MVP 核心功能开发（Day 2-3）
1. Day 2 上午：首页开发
   - 实现瀑布流布局
   - 集成 AI 内容生成
   - 实现基础交互功能

2. Day 2 下午：工具箱开发
   - 计时器工具
   - 手冲记录基础功能
   - 数据存储对接

3. Day 3：用户系统
   - 用户认证流程
   - 个人中心页面
   - 用户偏好设置

### Phase 3 - 功能完善与优化（Day 4）
1. 上午：内容系统完善
   - AI 内容生成优化
   - 标签系统实现
   - 推荐算法集成

2. 下午：工具功能增强
   - 数据可视化实现
   - 高级功能开发
   - 移动端适配优化

3. 晚上：性能优化
   - 首屏加载优化
   - 图片优化
   - PWA 支持

### Phase 4 - 部署与发布（Day 5）
1. 上午：部署准备
   - 环境变量配置
   - 数据库索引优化
   - 安全性检查

2. 下午：正式部署
   - Vercel 部署
   - 域名配置
   - CDN 设置

3. 晚上：发布准备
   - 文档完善
   - 用户引导编写
   - 监控系统搭建

### 开发节奏
- 每天早晨开发前查看 README.md，明确当天目标
- 每个功能完成后更新开发进度
- 每天结束时提交代码，更新文档
- 使用 Cursor AI 持续优化代码质量

### 开发优先级
1. 核心功能
   - 首页瀑布流
   - 基础工具（计时器）
   - 用户系统

2. 增强功能
   - AI 内容生成
   - 数据可视化
   - 社交功能

3. 体验优化
   - 性能优化
   - UI/UX 完善
   - 移动端适配

## 当前开发进度

### Phase 0 - 需求分析与架构设计 (2024-02-14)
- [x] 需求分析
  - [x] 功能模块定义
  - [x] 用户场景分析
  - [x] 技术需求确认
- [x] 架构设计
  - [x] 技术栈选型
  - [x] 项目结构设计
  - [x] 数据模型设计
- [x] 开发规范
  - [x] 代码规范制定
  - [x] Git 工作流规范
  - [x] 文档规范确定
- [x] 项目初始化
  - [x] 创建项目仓库
  - [x] 编写 README.md
  - [ ] 初始化 Next.js 项目
  - [ ] 配置开发环境

### 下一步计划（Day 1）
- [ ] 项目基础搭建
  - [ ] 使用 create-next-app 初始化项目
  - [ ] 配置 TypeScript 和 TailwindCSS
  - [ ] 配置 ESLint 和 Prettier
  - [ ] 设置 Git Hooks

### 开发里程碑
✨ 2024-02-14：完成项目需求分析、架构设计和开发规范制定
⏳ 预计 2024-02-15：完成项目基础搭建和环境配置

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

### 使用 Cursor IDE 开发
1. 打开项目目录
2. 使用 AI 辅助功能时，提供清晰的需求描述
3. 检查生成的代码是否符合项目规范
4. 及时更新文档和注释

### 本地开发
```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

### 文档维护
- 开发新功能时更新 README.md
- 记录重要的开发决策和架构变更
- 保持代码注释的完整性和清晰度

## 贡献指南
欢迎提交 Issue 和 Pull Request

## 许可证
MIT License 