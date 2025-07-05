import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute, RedirectAuthenticated } from './components/auth';
import { LoginPage, RegisterPage, DashboardPage, MeetingPage } from './pages';

// 创建 QueryClient 实例
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="App">
            <Routes>
              {/* 默认路由重定向 */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              
              {/* 认证路由 */}
              <Route 
                path="/login" 
                element={
                  <RedirectAuthenticated>
                    <LoginPage />
                  </RedirectAuthenticated>
                } 
              />
              <Route 
                path="/register" 
                element={
                  <RedirectAuthenticated>
                    <RegisterPage />
                  </RedirectAuthenticated>
                } 
              />
              
              {/* 受保护的路由 */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/meeting" 
                element={
                  <ProtectedRoute>
                    <MeetingPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/meeting/:id" 
                element={
                  <ProtectedRoute>
                    <MeetingPage />
                  </ProtectedRoute>
                } 
              />
              
              {/* 404 页面 */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

// 404 页面组件
function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-24 h-24 mx-auto mb-6 bg-gray-300 rounded-full flex items-center justify-center">
          <svg className="w-12 h-12 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">页面未找到</h2>
        <p className="text-gray-600 mb-6">您访问的页面不存在</p>
        <a 
          href="/dashboard" 
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          返回首页
        </a>
      </div>
    </div>
  );
}

export default App;