import React from 'react';
import { MessageCircle, Calendar, Cloud, Users, Video, Zap, Settings, Plus } from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, setActiveSection }) => {
  const menuItems = [
    { id: 'chat', icon: MessageCircle, label: '消息' },
    { id: 'calendar', icon: Calendar, label: '日历' },
    { id: 'cloud', icon: Cloud, label: '云文档' },
    { id: 'meeting', icon: Video, label: '视频会议' },
    { id: 'contacts', icon: Users, label: '通讯录' },
    { id: 'workspace', icon: Zap, label: '工作台' },
    { id: 'apps', icon: Plus, label: '应用中心' },
  ];

  return (
    <div className="w-16 bg-slate-800 dark:bg-slate-800 light:bg-gray-100 flex flex-col items-center py-4 space-y-4">
      <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
        <MessageCircle className="w-5 h-5 text-white" />
      </div>
      
      {menuItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveSection(item.id)}
          className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
            activeSection === item.id
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
        onClick={() => setActiveSection('settings')}
        className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
          activeSection === 'settings'
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