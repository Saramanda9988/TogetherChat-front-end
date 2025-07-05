import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';

// 受保护路由组件属性
interface ProtectedRouteProps {
  children: ReactNode;
}

// 受保护路由组件
export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { authState, loading } = useAuthContext();
  const location = useLocation();

  // 加载中显示
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-600">正在验证身份...</p>
        </div>
      </div>
    );
  }

  // 未认证则跳转到登录页
  if (!authState.isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

// 重定向已认证用户的组件
interface RedirectAuthenticatedProps {
  children: ReactNode;
}

export function RedirectAuthenticated({ children }: RedirectAuthenticatedProps) {
  const { authState, loading } = useAuthContext();

  // 加载中显示
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-600">正在验证身份...</p>
        </div>
      </div>
    );
  }

  // 已认证则跳转到仪表板
  if (authState.isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
