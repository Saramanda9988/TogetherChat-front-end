import { createContext, useContext, ReactNode } from 'react';
import { useAuth } from '../hooks/useAuth';
import { AuthState, LoginForm, RegisterForm, User } from '../types/auth';

// 认证上下文类型
interface AuthContextType {
  authState: AuthState;
  loading: boolean;
  login: (credentials: LoginForm) => Promise<{ success: boolean; message: string; }>;
  register: (userData: RegisterForm) => Promise<{ success: boolean; message: string; }>;
  logout: () => Promise<void>;
  refreshAccessToken: () => Promise<boolean>;
  updateUser: (userData: Partial<AuthState['user']>) => void;
}

// 创建认证上下文
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 认证提供者组件
export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuth();

  // 包装 login 函数以适配 LoginForm 类型
  const login = async (credentials: LoginForm) => {
    return await auth.login({
      username: credentials.username,
      password: credentials.password
    });
  };

  // 包装 register 函数以适配 RegisterForm 类型
  const register = async (userData: RegisterForm) => {
    return await auth.register({
      username: userData.username,
      password: userData.password
    });
  };

  const value: AuthContextType = {
    authState: auth.authState,
    loading: auth.loading,
    login,
    register,
    logout: auth.logout,
    refreshAccessToken: auth.refreshAccessToken,
    updateUser: (userData) => {
      if (userData && auth.authState.user) {
        auth.updateUser(userData);
      }
    }
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// 使用认证上下文的 Hook
export function useAuthContext(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}
