# ☕ Coffee Notes - 咖啡笔记

一个面向咖啡爱好者的 H5 应用，提供咖啡资讯、实用工具和个性化学习体验。

[![部署状态](https://therealsujitk-vercel-badge.vercel.app/?app=coffee-notes)](https://coffee-notes.vercel.app)

## 在线预览

访问 [https://coffee-notes.vercel.app](https://coffee-notes.vercel.app) 查看线上演示版本。

## 项目概述

CoffeeNotes 是一个基于 Web 的咖啡爱好者平台，结合 AI 技术，为用户提供个性化的咖啡知识内容和实用工具。

## 功能特点

### 1. 响应式设计
- 移动端（< 1024px）
  - 底部固定导航栏（首页、工具、我的）
  - 优化的触摸交互体验
  - 适配各种移动设备屏幕
- 桌面端（>= 1024px）
  - 左侧固定导航栏
  - 更大的显示空间和丰富的交互
  - 优化的键鼠操作体验

### 2. 主要功能模块
- 咖啡资讯
  - AI 生成的咖啡相关内容
  - 瀑布流布局展示
  - 资讯文章、知识卡片
  - 咖啡豆/器具评测
  - 咖啡食谱/饮品创意
- 工具箱
  - 计时器（已实现）
    - 基础计时功能
    - 预设时间（手冲、法压、冷萃）
    - 美观的控制界面
  - 手冲记录（开发中）
    - 水温记录
    - 水粉比记录
    - 冲煮方法选择
  - 烘焙记录（计划中）
    - 烘焙曲线记录
    - 烘焙豆信息记录
- 个人中心
  - 用户认证
  - 个性化设置
  - 历史记录管理

## 技术栈

### 前端
- Next.js 15.1.7 (App Router)
- TypeScript
- TailwindCSS
- React 19
- Heroicons
- Headless UI

### 开发工具
- Node.js >= 20
- npm >= 10
- Git
- VS Code / Cursor IDE

## 项目结构

```
src/
├── app/                 # Next.js 13+ App Router
│   ├── layout.tsx      # 根布局（导航结构）
│   ├── page.tsx        # 首页（咖啡资讯）
│   ├── tools/          # 工具箱模块
│   │   ├── layout.tsx  # 工具箱布局
│   │   ├── page.tsx    # 工具箱首页
│   │   └── timer/      # 计时器工具
│   └── profile/        # 个人中心模块
├── components/         # 可复用组件
│   ├── ui/            # 基础 UI 组件
│   └── layout/        # 布局组件
│       └── nav.tsx    # 响应式导航组件
├── lib/               # 工具函数和配置
│   └── utils.ts       # 通用工具函数
├── styles/            # 全局样式
└── types/             # TypeScript 类型定义
```

## 开发进度

### Phase 1 - 项目初始化与基础设置 (已完成)
- [x] 项目基础搭建
  - [x] Next.js 项目初始化
  - [x] TypeScript 配置
  - [x] TailwindCSS 配置
  - [x] ESLint 和 Prettier 配置
- [x] 响应式布局开发
  - [x] 移动端底部导航
  - [x] 桌面端侧边栏
  - [x] 自适应内容区域
- [x] 基础页面开发
  - [x] 首页（咖啡资讯）
  - [x] 工具箱
  - [x] 个人中心

### Phase 2 - 核心功能开发 (进行中)
- [x] 计时器工具
  - [x] 基础计时功能
  - [x] 预设时间选项
  - [x] UI 设计和交互
- [ ] 手冲记录工具
- [ ] 数据持久化
- [ ] 用户系统

### Phase 3 - 功能完善 (计划中)
- [ ] AI 内容生成
- [ ] 数据可视化
- [ ] 社交功能
- [ ] PWA 支持

### 2024-02-23 部署上线
- [x] 修复 ESLint 错误
- [x] 成功部署到 Vercel
- [x] 项目可通过 https://coffee-notes.vercel.app 访问

## 开发规范

### 进度记录
为了保持项目文档的及时性和完整性，在以下情况下需要更新 README.md：

1. 功能里程碑完成
   - 新功能模块开发完成
   - 重要功能升级或改进
   - Bug 修复（重要）

2. 项目结构变更
   - 新增重要依赖
   - 架构调整
   - 工作流程改变

3. 部署相关
   - 新环境部署
   - 部署配置更新
   - 域名变更

4. 开发规范更新
   - 编码规范变更
   - 工作流程调整
   - 新增开发指南

记录格式：
```markdown
### YYYY-MM-DD 更新内容
- [x] 主要更新点
  - [x] 具体内容 1
  - [x] 具体内容 2
- [x] 其他重要变更
```

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

## 环境要求
- Node.js >= 20
- npm >= 10
- 现代浏览器支持

## 贡献指南
欢迎提交 Issue 和 Pull Request

## 许可证
MIT License 