// 用户认证相关类型
export interface LoginForm {
  username: string;
  password: string;
}

export interface RegisterForm {
  username: string;
  password: string;
  confirmPassword: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  refreshToken: string | null;
}

export interface User {
  id: number;
  username: string;
  avatar?: string;
}

// API 响应类型
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

// 路由相关类型
export interface RouteConfig {
  path: string;
  element: React.ComponentType;
  protected?: boolean;
}
