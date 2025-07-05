import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { RegisterForm } from '../types/auth';
import { Button, Input, Card } from '../components/ui';
import { validateForm } from '../utils/common';

export function RegisterPage() {
  const { register, loading } = useAuthContext();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterForm>({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState<string>('');

  // 表单验证规则
  const validationRules = {
    username: {
      required: true,
      minLength: 3,
      maxLength: 20,
      pattern: /^[a-zA-Z0-9_]+$/,
      message: '用户名只能包含字母、数字和下划线'
    },
    password: {
      required: true,
      minLength: 6,
      maxLength: 50,
      pattern: /^(?=.*[a-zA-Z])(?=.*\d)/,
      message: '密码必须包含至少一个字母和一个数字'
    },
    confirmPassword: {
      required: true
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // 清除对应字段的错误
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    
    // 验证表单
    const validation = validateForm(formData, validationRules);
    const formErrors = { ...validation.errors };
    
    // 验证密码确认
    if (formData.password !== formData.confirmPassword) {
      formErrors.confirmPassword = '密码确认不匹配';
    }
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      const result = await register(formData);
      
      if (result.success) {
        setMessage('注册成功！请登录');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setMessage(result.message);
      }
    } catch (error) {
      setMessage('注册失败，请重试');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            注册 TogetherChat 账户
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            或者{' '}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              使用现有账户登录
            </Link>
          </p>
        </div>
        
        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="用户名"
              name="username"
              type="text"
              autoComplete="username"
              required
              value={formData.username}
              onChange={handleChange}
              error={errors.username}
              placeholder="请输入用户名（3-20个字符）"
              helperText="只能包含字母、数字和下划线"
            />
            
            <Input
              label="密码"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              placeholder="请输入密码（至少6个字符）"
              helperText="密码必须包含至少一个字母和一个数字"
            />
            
            <Input
              label="确认密码"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              placeholder="请再次输入密码"
            />

            {message && (
              <div className={`p-4 rounded-md ${
                message.includes('成功') 
                  ? 'bg-green-50 text-green-800' 
                  : 'bg-red-50 text-red-800'
              }`}>
                {message}
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              loading={loading}
              disabled={loading}
            >
              {loading ? '注册中...' : '注册'}
            </Button>
          </form>
        </Card>
        
        <div className="text-center">
          <p className="text-sm text-gray-600">
            已有账户？{' '}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              立即登录
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
