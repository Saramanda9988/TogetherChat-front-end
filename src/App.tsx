import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import CallModal from './components/CallModal';
import Calendar from './components/Calendar';
import VideoMeeting from './pages/VideoMeetingPage';
import ChatPage from './pages/ChatPage';
import Contacts from './components/Contacts';
import Settings from './components/Settings';
import { Theme } from './types';
import { applyTheme, getStoredTheme, setStoredTheme } from './utils/theme';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('chat');
  const [showCallModal, setShowCallModal] = useState(false);
  const [theme, setTheme] = useState<Theme>('dark');

  // 主题初始化
  useEffect(() => {
    const savedTheme = getStoredTheme();
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    setStoredTheme(newTheme);
    applyTheme(newTheme);
  };

  // 监听系统主题变化
  useEffect(() => {
    if (theme === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => applyTheme('auto');
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);



  return (
    <div className="h-screen bg-slate-900 dark:bg-slate-900 light:bg-white flex overflow-hidden">
      <Sidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
      />
      
      <div className="flex-1 overflow-hidden">
        <Routes>
          <Route path="/chat/*" element={<ChatPage />} />
          <Route path="/meeting/*" element={<VideoMeeting />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/settings" element={<Settings theme={theme} setTheme={handleThemeChange} />} />
          <Route path="/" element={<Navigate to="/chat" replace />} />
          <Route path="*" element={<Navigate to="/chat" replace />} />
        </Routes>
      </div>

      <CallModal
        isOpen={showCallModal}
        onClose={() => setShowCallModal(false)}
        callerName="张三"
        isVideoCall={true}
        isIncoming={true}
      />
    </div>
  );
};

export default App;