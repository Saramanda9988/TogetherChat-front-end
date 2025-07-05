import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MessageCircle, Calendar, Cloud, Users, Video, Zap, Settings, Plus } from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, setActiveSection }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const menuItems = [
    { id: 'chat', icon: MessageCircle, label: '消息', path: '/chat' },
    { id: 'calendar', icon: Calendar, label: '日历', path: '/calendar' },
    { id: 'cloud', icon: Cloud, label: '云文档', path: '/cloud' },
    { id: 'meeting', icon: Video, label: '视频会议', path: '/meeting' },
    { id: 'contacts', icon: Users, label: '通讯录', path: '/contacts' },
    { id: 'workspace', icon: Zap, label: '工作台', path: '/workspace' },
    { id: 'apps', icon: Plus, label: '应用中心', path: '/apps' },
  ];

  return (
    <div className="w-16 bg-slate-800 dark:bg-slate-800 light:bg-gray-100 flex flex-col items-center py-4 space-y-4">
      <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
        <MessageCircle className="w-5 h-5 text-white" />
      </div>
      
      {menuItems.map((item) => (
        <button
          key={item.id}
          onClick={() => {
            setActiveSection(item.id);
            navigate(item.path);
          }}
          className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
            location.pathname.startsWith(item.path) || (item.id === 'chat' && location.pathname === '/')
              ? 'bg-blue-500 text-white'
              : 'text-slate-400 dark:text-slate-400 light:text-gray-600 hover:text-white dark:hover:text-white light:hover:text-gray-900 hover:bg-slate-700 dark:hover:bg-slate-700 light:hover:bg-gray-200'
          }`}
          title={item.label}
        >
          <item.icon className="w-5 h-5" />
        </button>
      ))}
      
      <div className="flex-1"></div>
      
      <button 
        onClick={() => {
          setActiveSection('settings');
          navigate('/settings');
        }}
        className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
          location.pathname === '/settings'
            ? 'bg-blue-500 text-white'
            : 'text-slate-400 dark:text-slate-400 light:text-gray-600 hover:text-white dark:hover:text-white light:hover:text-gray-900 hover:bg-slate-700 dark:hover:bg-slate-700 light:hover:bg-gray-200'
        }`}
        title="设置"
      >
        <Settings className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Sidebar;