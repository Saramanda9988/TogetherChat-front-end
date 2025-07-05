# Chat组件重构说明

## 重构概述

本次重构将chat相关组件进行了模块化拆分，参照video视频会议的代码结构，实现了以下改进：

1. **使用路由进行导航** - 采用React Router进行页面导航
2. **组件拆分** - 将chat相关组件拆分到pages、hooks、utils文件夹中
3. **保持原有布局** - 尽量不改变原有的页面布局和用户体验

## 新的文件结构

### Pages (页面组件)
```
src/pages/
├── ChatPage.tsx              # 主聊天页面，包含路由配置
└── chat/
    ├── ChatHome.tsx          # 聊天列表页面（移动端）
    ├── ChatRoom.tsx          # 聊天对话页面（移动端）
    ├── ChatDesktop.tsx       # 桌面端聊天布局
    └── index.ts              # 导出文件
```

### Hooks (自定义钩子)
```
src/hooks/
├── useChat.ts               # 聊天状态管理hook
└── useChatNavigation.ts     # 聊天导航管理hook
```

### Utils (工具函数)
```
src/utils/
└── chatUtils.ts             # 聊天相关工具函数
```

## 主要改进

### 1. 路由导航
- 移动端：`/chat` 显示聊天列表，`/chat/:chatId` 显示具体对话
- 桌面端：统一使用 `/chat` 和 `/chat/:chatId`，但布局不同
- 自动响应式：根据屏幕尺寸自动切换移动端/桌面端布局

### 2. 状态管理
- `useChat` hook：管理聊天数据、消息发送等核心功能
- `useChatNavigation` hook：管理导航状态、移动端返回等

### 3. 工具函数
- `formatTime`：格式化时间显示
- `filterChats`：聊天列表搜索过滤
- `groupMessagesByDate`：按日期分组消息
- `validateMessage`：消息验证
- 等等...

### 4. 组件拆分
- **ChatHome**：移动端聊天列表页面
- **ChatRoom**：移动端聊天对话页面
- **ChatDesktop**：桌面端完整聊天布局
- **ChatPage**：主页面，根据设备类型渲染不同组件

## 使用方式

### 在App.tsx中使用
```tsx
{activeSection === 'chat' && <ChatPage />}
```

### 路由访问
- 桌面端：访问 `/chat` 或 `/chat/123`
- 移动端：访问 `/chat` 显示列表，点击后跳转到 `/chat/123`

## 兼容性

- 保持了原有的UI设计和用户体验
- 支持移动端和桌面端的响应式布局
- 保持了所有原有功能（消息发送、聊天信息等）

## 技术栈

- React Router DOM v7.6.3
- TypeScript
- Tailwind CSS
- Lucide React Icons 