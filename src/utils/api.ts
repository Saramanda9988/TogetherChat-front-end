// API 工具函数
const API_BASE_URL = '/api';

const getAuthHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('token')}`
});

export const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: getAuthHeaders(),
    ...options,
  };

  try {
    const response = await fetch(url, config);
    return response;
  } catch (error) {
    console.error(`API request failed: ${endpoint}`, error);
    throw error;
  }
};

// 用户相关API
export const userAPI = {
  updateProfile: (updates: any) => 
    apiRequest('/user/profile', {
      method: 'PUT',
      body: JSON.stringify(updates)
    }),
  
  updateNotifications: (settings: any) =>
    apiRequest('/user/notifications', {
      method: 'PUT',
      body: JSON.stringify(settings)
    }),
  
  updatePrivacy: (settings: any) =>
    apiRequest('/user/privacy', {
      method: 'PUT',
      body: JSON.stringify(settings)
    }),
  
  updateTheme: (settings: any) =>
    apiRequest('/user/theme', {
      method: 'PUT',
      body: JSON.stringify(settings)
    }),
};

// 认证相关API
export const authAPI = {
  logout: () =>
    apiRequest('/auth/logout', {
      method: 'POST'
    }),
};