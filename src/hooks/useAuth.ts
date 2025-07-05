import { useState, useEffect } from 'react';
import { AuthState, User } from '../types/auth';
import { storage } from '../utils/common';
import { apiClient, setApiClientAuth } from '../utils/apiClient';
import { UserLoginRequest, UserRegisterRequest } from '../../api/index';

  // 认证相关的 Hook
export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null,
    refreshToken: null
  });
  const [loading, setLoading] = useState(true);

  // 初始化认证状态
  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      const token = storage.get<string>('token');
      const refreshToken = storage.get<string>('refreshToken');
      const user = storage.get<User>('user');

      if (token && user) {
        // 设置 API 客户端的认证头
        setApiClientAuth(user.id);
        
        setAuthState({
          isAuthenticated: true,
          user,
          token,
          refreshToken
        });
        
        // 验证 token 有效性
        try {
          const response = await apiClient.userController.getUserInfo1();
          if (response.success && response.data) {
            const userData = response.data;
            setAuthState(prev => ({
              ...prev,
              user: {
                id: userData.userId || user.id,
                username: userData.username || user.username,
                avatar: userData.avatar || user.avatar
              }
            }));
            storage.set('user', userData);
          }
        } catch (error) {
          console.warn('验证 token 失败，需要重新登录:', error);
          logout();
        }
      }
    } catch (error) {
      console.error('初始化认证状态失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials: UserLoginRequest): Promise<{
    success: boolean;
    message: string;
  }> => {
    try {
      setLoading(true);
      const response = await apiClient.userController.login(credentials);
      
      if (response.success && response.data) {
        const loginData = response.data;
        const userData: User = {
          id: loginData.userId || 0,
          username: loginData.username || credentials.username,
          avatar: loginData.avatar
        };

        // 保存认证信息
        storage.set('token', loginData.accessToken);
        // 注意：根据 API 文档，refreshToken 可能不在 LoginInfoResponse 中
        // storage.set('refreshToken', loginData.refreshToken);
        storage.set('user', userData);

        // 设置 API 客户端的认证头
        setApiClientAuth(userData.id);

        setAuthState({
          isAuthenticated: true,
          user: userData,
          token: loginData.accessToken || null,
          refreshToken: null // 暂时设为 null，根据实际 API 响应调整
        });

        return { success: true, message: '登录成功' };
      } else {
        return { success: false, message: response.errMsg || '登录失败' };
      }
    } catch (error) {
      console.error('登录失败:', error);
      return { 
        success: false, 
        message: error instanceof Error ? error.message : '登录失败，请重试' 
      };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: UserRegisterRequest): Promise<{
    success: boolean;
    message: string;
  }> => {
    try {
      setLoading(true);
      const response = await apiClient.userController.register(userData);
      
      if (response.success) {
        return { success: true, message: '注册成功，请登录' };
      } else {
        return { success: false, message: response.errMsg || '注册失败' };
      }
    } catch (error) {
      console.error('注册失败:', error);
      return { 
        success: false, 
        message: error instanceof Error ? error.message : '注册失败，请重试' 
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      const refreshToken = storage.get<string>('refreshToken');
      if (refreshToken) {
        try {
          await apiClient.userController.logout(refreshToken);
        } catch (error) {
          console.warn('服务器登出失败:', error);
        }
      }
    } catch (error) {
      console.error('登出失败:', error);
    } finally {
      // 清除本地存储
      storage.remove('token');
      storage.remove('refreshToken');
      storage.remove('user');
      
      // 清除 API 客户端的认证头
      setApiClientAuth(null);
      
      // 重置认证状态
      setAuthState({
        isAuthenticated: false,
        user: null,
        token: null,
        refreshToken: null
      });
    }
  };

  const refreshAccessToken = async (): Promise<boolean> => {
    try {
      const refreshToken = storage.get<string>('refreshToken');
      if (!refreshToken) return false;

      const response = await apiClient.userController.refreshToken(refreshToken);
      if (response.success && response.data) {
        const newToken = response.data;
        storage.set('token', newToken);
        
        setAuthState(prev => ({
          ...prev,
          token: newToken
        }));
        
        return true;
      }
      return false;
    } catch (error) {
      console.error('刷新 token 失败:', error);
      return false;
    }
  };

  const updateUser = (userData: Partial<User>): void => {
    setAuthState(prev => ({
      ...prev,
      user: prev.user ? { ...prev.user, ...userData } : null
    }));
    
    if (authState.user) {
      const updatedUser = { ...authState.user, ...userData };
      storage.set('user', updatedUser);
      // 如果用户 ID 更新了，也要更新 API 客户端的认证头
      if (userData.id !== undefined) {
        setApiClientAuth(userData.id);
      }
    }
  };

  return {
    authState,
    loading,
    login,
    register,
    logout,
    refreshAccessToken,
    updateUser
  };
}
