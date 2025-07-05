import { TogetherChat } from '../../api/TogetherChat';
import { storage } from './common';
import { User } from '../types/auth';

// 创建全局 API 客户端实例
export const apiClient = new TogetherChat();

// 设置 API 客户端的 Authorization 头
export const setApiClientAuth = (userId: number | null) => {
  if (userId) {
    // 注意：OpenAPI 客户端会自动添加 "Bearer " 前缀，所以这里只传用户ID
    apiClient.request.config.TOKEN = String(userId);
  } else {
    apiClient.request.config.TOKEN = undefined;
  }
};

// 初始化 API 客户端认证
export const initializeApiClient = () => {
  const user = storage.get<User>('user');
  if (user?.id) {
    setApiClientAuth(user.id);
  }
};

// 在应用启动时初始化 API 客户端
initializeApiClient();
