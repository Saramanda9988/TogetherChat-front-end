# TogetherChat 前端

## 功能特性

- **实时聊天** - 支持个人聊天、群组聊天和机器人对话
- **视频通话** - 内置视频会议功能，支持多人通话
- **联系人管理** - 完整的联系人系统
- **日历集成** - 内置日历功能，方便安排会议
- **主题切换** - 支持深色/浅色主题，可自动适配系统主题
- **响应式设计** - 完美适配桌面端和移动端

## 技术栈

- **框架**: React 18.3.1
- **语言**: TypeScript 5.5.3
- **构建工具**: Vite 5.4.2
- **路由**: React Router DOM 7.6.3
- **样式**: Tailwind CSS 3.4.1
- **代码规范**: ESLint + TypeScript ESLint

## 项目结构(暂定)

```text
src/
├── components/          # 组件目录
│   ├── common/         # 通用组件
│   │   ├── Avatar.tsx  # 头像组件
│   │   ├── Button.tsx  # 按钮组件
│   │   ├── Input.tsx   # 输入框组件
│   │   ├── Modal.tsx   # 模态框组件
│   │   └── Toggle.tsx  # 开关组件
│   ├── ChatList/       # 聊天列表相关组件
│   │   ├── ActionMenu.tsx
│   │   ├── ChatItem.tsx
│   │   ├── ChatListContainer.tsx
│   │   ├── index.tsx
│   │   ├── SearchHeader.tsx
│   │   └── useChatSearch.ts
│   ├── Calendar.tsx    # 日历组件
│   ├── CallModal.tsx   # 通话模态框
│   ├── ChatInfo.tsx    # 聊天信息
│   ├── Contacts.tsx    # 联系人组件
│   ├── MessageArea.tsx # 消息区域
│   ├── Settings.tsx    # 设置组件
│   ├── Sidebar.tsx     # 侧边栏
│   └── VideoMeeting.tsx # 视频会议
├── contexts/           # React Context
├── hooks/              # 自定义 Hooks
│   └── useWebRTC.ts   # WebRTC 相关 Hook
├── pages/              # 页面组件
│   └── ChatPage.tsx   # 聊天页面
├── types/              # TypeScript 类型定义
│   └── index.ts
├── utils/              # 工具函数
│   ├── api.ts         # API 相关
│   └── theme.ts       # 主题相关
├── App.tsx            # 应用主组件
├── main.tsx           # 应用入口
└── index.css          # 全局样式
```

## 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm >= 7.0.0 或 yarn >= 1.22.0

### 安装依赖

```bash
npm install
# 或
yarn install
```

### 启动开发服务器

```bash
npm run dev
# 或
yarn dev
```

### 代码检查

```bash
npm run lint
# 或
yarn lint
```

## 主要组件说明

### Sidebar 侧边栏

- 提供导航功能，切换不同模块（聊天、联系人、日历、设置等）
- 支持主题切换

### ChatList 聊天列表

- 显示所有聊天会话
- 支持搜索功能
- 显示未读消息数量
- 支持聊天操作菜单

### MessageArea 消息区域

- 显示聊天消息
- 支持文本、图片、文件等多种消息类型
- 消息回复功能
- 消息状态显示

### VideoMeeting 视频会议

- 基于 WebRTC 的视频通话功能
- 支持多人会议
- 屏幕共享支持

### Calendar 日历

- 集成日历功能
- 会议安排
- 事件管理

## 主题系统

应用支持三种主题模式：

- **浅色主题** - 明亮的界面风格
- **深色主题** - 护眼的深色界面
- **自动模式** - 根据系统主题自动切换

主题设置会自动保存到本地存储，下次访问时会保持用户的选择。

## 自定义配置

### Tailwind CSS 配置

项目使用 Tailwind CSS 进行样式管理，可以在 `tailwind.config.js` 中自定义主题色彩、字体等配置。

### Vite 配置

构建和开发服务器配置在 `vite.config.ts` 中，可以根据需要调整代理、插件等设置。

### ESLint 配置

代码规范配置在 `eslint.config.js` 中，包含 React、TypeScript 相关规则。
