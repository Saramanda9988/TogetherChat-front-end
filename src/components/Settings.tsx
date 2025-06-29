import React, { useState, useEffect } from 'react';
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  HelpCircle, 
  Info, 
  LogOut, 
  ChevronRight,
  Moon,
  Sun,
  Monitor,
  Volume2,
  VolumeX,
  Eye,
  EyeOff,
  Smartphone,
  Download,
  Upload,
  Key,
  Lock,
  X
} from 'lucide-react';
import { Theme, UserProfile } from '../types';
import { userAPI, authAPI } from '../utils/api';
import Button from './common/Button';
import Modal from './common/Modal';
import Toggle from './common/Toggle';

interface SettingsProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const Settings: React.FC<SettingsProps> = ({ theme, setTheme }) => {
  const [activeSection, setActiveSection] = useState('profile');
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [onlineStatus, setOnlineStatus] = useState(true);

  // Mock 用户数据
  const [userProfile] = useState<UserProfile>({
    id: 'user123',
    username: 'xiaoyuan001',
    nickname: '小媛',
    email: 'xiaoyuan@example.com',
    phone: '138****8888',
    avatar: '',
    signature: '今天也要加油呀！',
    department: '产品部'
  });

  const menuItems = [
    {
      id: 'profile',
      icon: User,
      title: '个人资料',
      description: '管理你的个人信息'
    },
    {
      id: 'notifications',
      icon: Bell,
      title: '通知设置',
      description: '消息提醒和通知偏好'
    },
    {
      id: 'privacy',
      icon: Shield,
      title: '隐私安全',
      description: '账号安全和隐私设置'
    },
    {
      id: 'appearance',
      icon: Palette,
      title: '外观设置',
      description: '主题和界面个性化'
    },
    {
      id: 'language',
      icon: Globe,
      title: '语言设置',
      description: '界面语言和地区设置'
    },
    {
      id: 'help',
      icon: HelpCircle,
      title: '帮助中心',
      description: '使用帮助和常见问题'
    },
    {
      id: 'about',
      icon: Info,
      title: '关于',
      description: '版本信息和更新日志'
    }
  ];

  const handleThemeChange = async (newTheme: Theme) => {
    setTheme(newTheme);
    
    // 调用后端API保存主题设置
    try {
      await userAPI.updateTheme({ mode: newTheme });
      console.log('主题设置更新成功');
    } catch (error) {
      console.error('更新主题设置失败:', error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await authAPI.logout();

      if (response.ok) {
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
        window.location.href = '/login';
      } else {
        console.error('登出失败');
      }
    } catch (error) {
      console.error('登出请求失败:', error);
    }
    setShowLogoutModal(false);
  };

  const updateNotificationSettings = async (settings: any) => {
    try {
      const response = await userAPI.updateNotifications(settings);
      if (response.ok) {
        console.log('通知设置更新成功');
      }
    } catch (error) {
      console.error('更新通知设置失败:', error);
    }
  };

  const updatePrivacySettings = async (settings: any) => {
    try {
      const response = await userAPI.updatePrivacy(settings);
      if (response.ok) {
        console.log('隐私设置更新成功');
      }
    } catch (error) {
      console.error('更新隐私设置失败:', error);
    }
  };

  const renderProfileSection = () => (
    <div className="space-y-6">
      <div className="text-center pb-6 border-b border-slate-700 dark:border-slate-700 light:border-gray-200">
        <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center text-white text-3xl font-medium mx-auto mb-4">
          {userProfile.nickname.charAt(0)}
        </div>
        <h2 className="text-white dark:text-white light:text-gray-900 text-xl font-medium mb-2">{userProfile.nickname}</h2>
        <p className="text-slate-400 dark:text-slate-400 light:text-gray-600">用户ID: {userProfile.username}</p>
      </div>

      <div className="space-y-4">
        {[
          { label: '昵称', value: userProfile.nickname },
          { label: '个性签名', value: userProfile.signature },
          { label: '邮箱', value: userProfile.email },
          { label: '手机号', value: userProfile.phone },
          { label: '部门', value: userProfile.department }
        ].map((item, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-slate-800 dark:bg-slate-800 light:bg-gray-100 rounded-lg">
            <div>
              <p className="text-white dark:text-white light:text-gray-900 font-medium">{item.label}</p>
              <p className="text-slate-400 dark:text-slate-400 light:text-gray-600 text-sm">{item.value}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 dark:text-slate-400 light:text-gray-600" />
          </div>
        ))}
      </div>
    </div>
  );

  const renderNotificationsSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-white dark:text-white light:text-gray-900 text-lg font-medium mb-4">消息通知</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-slate-800 dark:bg-slate-800 light:bg-gray-100 rounded-lg">
            <div className="flex items-center">
              <Bell className="w-5 h-5 text-slate-400 dark:text-slate-400 light:text-gray-600 mr-3" />
              <div>
                <p className="text-white dark:text-white light:text-gray-900 font-medium">桌面通知</p>
                <p className="text-slate-400 dark:text-slate-400 light:text-gray-600 text-sm">接收新消息时显示桌面通知</p>
              </div>
            </div>
            <Toggle
              enabled={notificationsEnabled}
              onChange={(enabled) => {
                setNotificationsEnabled(enabled);
                updateNotificationSettings({ desktop: enabled });
              }}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-800 dark:bg-slate-800 light:bg-gray-100 rounded-lg">
            <div className="flex items-center">
              {soundEnabled ? (
                <Volume2 className="w-5 h-5 text-slate-400 dark:text-slate-400 light:text-gray-600 mr-3" />
              ) : (
                <VolumeX className="w-5 h-5 text-slate-400 dark:text-slate-400 light:text-gray-600 mr-3" />
              )}
              <div>
                <p className="text-white dark:text-white light:text-gray-900 font-medium">声音提醒</p>
                <p className="text-slate-400 dark:text-slate-400 light:text-gray-600 text-sm">接收消息时播放提示音</p>
              </div>
            </div>
            <Toggle
              enabled={soundEnabled}
              onChange={(enabled) => {
                setSoundEnabled(enabled);
                updateNotificationSettings({ sound: enabled });
              }}
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-white dark:text-white light:text-gray-900 text-lg font-medium mb-4">免打扰设置</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-slate-800 dark:bg-slate-800 light:bg-gray-100 rounded-lg">
            <div>
              <p className="text-white dark:text-white light:text-gray-900 font-medium">免打扰时间</p>
              <p className="text-slate-400 dark:text-slate-400 light:text-gray-600 text-sm">22:00 - 08:00</p>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 dark:text-slate-400 light:text-gray-600" />
          </div>
        </div>
      </div>
    </div>
  );

  const renderPrivacySection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-white dark:text-white light:text-gray-900 text-lg font-medium mb-4">在线状态</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-slate-800 dark:bg-slate-800 light:bg-gray-100 rounded-lg">
            <div className="flex items-center">
              {onlineStatus ? (
                <Eye className="w-5 h-5 text-slate-400 dark:text-slate-400 light:text-gray-600 mr-3" />
              ) : (
                <EyeOff className="w-5 h-5 text-slate-400 dark:text-slate-400 light:text-gray-600 mr-3" />
              )}
              <div>
                <p className="text-white dark:text-white light:text-gray-900 font-medium">显示在线状态</p>
                <p className="text-slate-400 dark:text-slate-400 light:text-gray-600 text-sm">让好友看到你的在线状态</p>
              </div>
            </div>
            <Toggle
              enabled={onlineStatus}
              onChange={(enabled) => {
                setOnlineStatus(enabled);
                updatePrivacySettings({ showOnlineStatus: enabled });
              }}
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-white dark:text-white light:text-gray-900 text-lg font-medium mb-4">账号安全</h3>
        <div className="space-y-4">
          {[
            { icon: Key, label: '修改密码', desc: '定期更换密码保护账号安全' },
            { icon: Smartphone, label: '设备管理', desc: '管理已登录的设备' },
            { icon: Lock, label: '登录保护', desc: '开启二步验证' }
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-slate-800 dark:bg-slate-800 light:bg-gray-100 rounded-lg">
              <div className="flex items-center">
                <item.icon className="w-5 h-5 text-slate-400 dark:text-slate-400 light:text-gray-600 mr-3" />
                <div>
                  <p className="text-white dark:text-white light:text-gray-900 font-medium">{item.label}</p>
                  <p className="text-slate-400 dark:text-slate-400 light:text-gray-600 text-sm">{item.desc}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 dark:text-slate-400 light:text-gray-600" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAppearanceSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-white dark:text-white light:text-gray-900 text-lg font-medium mb-4">主题设置</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            {[
              { key: 'light', icon: Sun, label: '浅色', color: 'text-yellow-500' },
              { key: 'dark', icon: Moon, label: '深色', color: 'text-blue-400' },
              { key: 'auto', icon: Monitor, label: '跟随系统', color: 'text-slate-400 dark:text-slate-400 light:text-gray-600' }
            ].map((themeOption) => (
              <button
                key={themeOption.key}
                onClick={() => handleThemeChange(themeOption.key as Theme)}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  theme === themeOption.key 
                    ? 'border-blue-500 bg-blue-500/10' 
                    : 'border-slate-600 dark:border-slate-600 light:border-gray-300 bg-slate-800 dark:bg-slate-800 light:bg-gray-100 hover:border-slate-500 dark:hover:border-slate-500 light:hover:border-gray-400'
                }`}
              >
                <themeOption.icon className={`w-8 h-8 ${themeOption.color} mx-auto mb-2`} />
                <p className="text-white dark:text-white light:text-gray-900 text-sm">{themeOption.label}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-white dark:text-white light:text-gray-900 text-lg font-medium mb-4">聊天背景</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-slate-800 dark:bg-slate-800 light:bg-gray-100 rounded-lg">
            <div>
              <p className="text-white dark:text-white light:text-gray-900 font-medium">聊天背景图片</p>
              <p className="text-slate-400 dark:text-slate-400 light:text-gray-600 text-sm">自定义聊天界面背景</p>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 dark:text-slate-400 light:text-gray-600" />
          </div>
        </div>
      </div>
    </div>
  );

  const renderLanguageSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-white dark:text-white light:text-gray-900 text-lg font-medium mb-4">界面语言</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-slate-800 dark:bg-slate-800 light:bg-gray-100 rounded-lg">
            <div>
              <p className="text-white dark:text-white light:text-gray-900 font-medium">简体中文</p>
              <p className="text-slate-400 dark:text-slate-400 light:text-gray-600 text-sm">当前使用语言</p>
            </div>
            <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-800 dark:bg-slate-800 light:bg-gray-100 rounded-lg opacity-50">
            <div>
              <p className="text-white dark:text-white light:text-gray-900 font-medium">English</p>
              <p className="text-slate-400 dark:text-slate-400 light:text-gray-600 text-sm">即将支持</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-white dark:text-white light:text-gray-900 text-lg font-medium mb-4">地区设置</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-slate-800 dark:bg-slate-800 light:bg-gray-100 rounded-lg">
            <div>
              <p className="text-white dark:text-white light:text-gray-900 font-medium">时区</p>
              <p className="text-slate-400 dark:text-slate-400 light:text-gray-600 text-sm">GMT+8 北京时间</p>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 dark:text-slate-400 light:text-gray-600" />
          </div>
        </div>
      </div>
    </div>
  );

  const renderHelpSection = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        {[
          { icon: HelpCircle, label: '使用帮助', desc: '查看使用教程和常见问题' },
          { icon: Download, label: '意见反馈', desc: '向我们反馈问题和建议' },
          { icon: Upload, label: '联系客服', desc: '获取人工客服支持' }
        ].map((item, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-slate-800 dark:bg-slate-800 light:bg-gray-100 rounded-lg">
            <div className="flex items-center">
              <item.icon className="w-5 h-5 text-slate-400 dark:text-slate-400 light:text-gray-600 mr-3" />
              <div>
                <p className="text-white dark:text-white light:text-gray-900 font-medium">{item.label}</p>
                <p className="text-slate-400 dark:text-slate-400 light:text-gray-600 text-sm">{item.desc}</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 dark:text-slate-400 light:text-gray-600" />
          </div>
        ))}
      </div>
    </div>
  );

  const renderAboutSection = () => (
    <div className="space-y-6">
      <div className="text-center pb-6 border-b border-slate-700 dark:border-slate-700 light:border-gray-200">
        <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
          IM
        </div>
        <h2 className="text-white dark:text-white light:text-gray-900 text-xl font-medium mb-2">现代化 IM 系统</h2>
        <p className="text-slate-400 dark:text-slate-400 light:text-gray-600">版本 1.0.0</p>
      </div>

      <div className="space-y-4">
        {[
          { label: '检查更新', desc: '当前已是最新版本' },
          { label: '更新日志', desc: '查看版本更新记录' },
          { label: '隐私政策', desc: '了解我们如何保护你的隐私' },
          { label: '服务条款', desc: '查看使用条款和协议' }
        ].map((item, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-slate-800 dark:bg-slate-800 light:bg-gray-100 rounded-lg">
            <div>
              <p className="text-white dark:text-white light:text-gray-900 font-medium">{item.label}</p>
              <p className="text-slate-400 dark:text-slate-400 light:text-gray-600 text-sm">{item.desc}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 dark:text-slate-400 light:text-gray-600" />
          </div>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'profile': return renderProfileSection();
      case 'notifications': return renderNotificationsSection();
      case 'privacy': return renderPrivacySection();
      case 'appearance': return renderAppearanceSection();
      case 'language': return renderLanguageSection();
      case 'help': return renderHelpSection();
      case 'about': return renderAboutSection();
      default: return renderProfileSection();
    }
  };

  return (
    <div className="flex-1 bg-slate-900 dark:bg-slate-900 light:bg-white flex h-full overflow-hidden">
      {/* 左侧菜单 */}
      <div className="w-80 bg-slate-900 dark:bg-slate-900 light:bg-white border-r border-slate-700 dark:border-slate-700 light:border-gray-200 flex flex-col h-full overflow-hidden">
        <div className="p-6 border-b border-slate-700 dark:border-slate-700 light:border-gray-200 flex-shrink-0">
          <h1 className="text-white dark:text-white light:text-gray-900 text-2xl font-bold">设置</h1>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full p-4 rounded-lg text-left transition-colors flex items-center ${
                  activeSection === item.id
                    ? 'bg-blue-500/20 border border-blue-500/50'
                    : 'hover:bg-slate-800 dark:hover:bg-slate-800 light:hover:bg-gray-100'
                }`}
              >
                <item.icon className={`w-5 h-5 mr-3 ${
                  activeSection === item.id ? 'text-blue-400' : 'text-slate-400 dark:text-slate-400 light:text-gray-600'
                }`} />
                <div className="flex-1">
                  <p className={`font-medium ${
                    activeSection === item.id ? 'text-blue-400' : 'text-white dark:text-white light:text-gray-900'
                  }`}>
                    {item.title}
                  </p>
                  <p className="text-slate-400 dark:text-slate-400 light:text-gray-600 text-sm">{item.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 退出登录按钮 */}
        <div className="p-4 border-t border-slate-700 dark:border-slate-700 light:border-gray-200 flex-shrink-0">
          <Button
            onClick={() => setShowLogoutModal(true)}
            variant="danger"
            className="w-full bg-red-500/20 border border-red-500/50 text-red-400 hover:bg-red-500/30"
            icon={LogOut}
          >
            退出登录
          </Button>
        </div>
      </div>

      {/* 右侧内容区域 */}
      <div className="flex-1 bg-slate-900 dark:bg-slate-900 light:bg-white flex flex-col h-full">
        <div className="p-6 border-b border-slate-700 dark:border-slate-700 light:border-gray-200 flex-shrink-0">
          <h2 className="text-white dark:text-white light:text-gray-900 text-xl font-medium">
            {menuItems.find(item => item.id === activeSection)?.title}
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </div>
      </div>

      {/* 退出登录确认弹窗 */}
      <Modal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        title="确认退出"
        footer={
          <>
            <Button variant="ghost" onClick={() => setShowLogoutModal(false)}>
              取消
            </Button>
            <Button variant="danger" onClick={handleLogout}>
              确认退出
            </Button>
          </>
        }
      >
        <p className="text-slate-300 dark:text-slate-300 light:text-gray-700">
          确定要退出当前账号吗？退出后需要重新登录。
        </p>
      </Modal>
    </div>
  );
};

export default Settings;