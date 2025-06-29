import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ChatList from './components/ChatList';
import MessageArea from './components/MessageArea';
import ChatInfo from './components/ChatInfo';
import CallModal from './components/CallModal';
import Calendar from './components/Calendar';
import VideoMeeting from './components/VideoMeeting';
import Contacts from './components/Contacts';
import Settings from './components/Settings';
import { Chat, Message, Theme } from './types';
import { applyTheme, getStoredTheme, setStoredTheme } from './utils/theme';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('chat');
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [showChatInfo, setShowChatInfo] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
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

  // Mock data
  const [chats] = useState<Chat[]>([
    {
      id: '1',
      name: '团队共创',
      avatar: '',
      lastMessage: 'feat: @功能 (#27)',
      time: '10:57',
      unread: 4,
      isGroup: true,
      type: 'group'
    },
    {
      id: '2',
      name: '张威锋效率工具群',
      avatar: '',
      lastMessage: '来看看为啥提高效率的改进',
      time: '3月31日',
      unread: 0,
      isGroup: true,
      type: 'group'
    },
    {
      id: '3',
      name: '保管班级',
      avatar: '',
      lastMessage: '感谢大脸',
      time: '6月28日',
      unread: 0,
      isGroup: true,
      type: 'group'
    },
    {
      id: '4',
      name: '云文档助手',
      avatar: '',
      lastMessage: '你邀请了云文档机器人',
      time: '6月24日',
      unread: 0,
      isGroup: false,
      isOnline: true,
      type: 'bot'
    },
    {
      id: '5',
      name: '飞行社',
      avatar: '',
      lastMessage: '上次讨论了解决方案',
      time: '6月23日',
      unread: 0,
      isGroup: true,
      type: 'group'
    }
  ]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      senderId: '1',
      senderName: '张三',
      content: 'feat: @功能, 提交相关, 初步处理今元素 (可以提一次性提醒级的) 的导出',
      timestamp: '10:30',
      type: 'text',
      isRead: true,
      isOwn: false
    },
    {
      id: '2',
      senderId: 'me',
      senderName: '我',
      content: '好的，我来处理这个功能',
      timestamp: '10:35',
      type: 'text',
      isRead: true,
      isOwn: true
    },
    {
      id: '3',
      senderId: '2',
      senderName: '李四',
      content: 'fix: 修改contentEditable后的显示问题',
      timestamp: '10:40',
      type: 'text',
      isRead: true,
      isOwn: false
    }
  ]);

  const selectedChatData = chats.find(chat => chat.id === selectedChat);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleSendMessage = (content: string, type: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: 'me',
      senderName: '我',
      content,
      timestamp: new Date().toLocaleTimeString('zh-CN', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      type: type as any,
      isRead: false,
      isOwn: true
    };

    setMessages(prev => [...prev, newMessage]);
  };

  if (isMobile) {
    return (
      <div className="h-screen bg-slate-900 dark:bg-slate-900 light:bg-white flex flex-col overflow-hidden">
        {!selectedChat ? (
          <>
            <div className="bg-slate-800 dark:bg-slate-800 light:bg-gray-100 p-4 border-b border-slate-700 dark:border-slate-700 light:border-gray-200 flex-shrink-0">
              <h1 className="text-white dark:text-white light:text-gray-900 text-xl font-bold">消息</h1>
            </div>
            <div className="flex-1 overflow-hidden">
              <ChatList
                chats={chats}
                selectedChat={selectedChat}
                setSelectedChat={setSelectedChat}
              />
            </div>
          </>
        ) : (
          <MessageArea
            selectedChat={selectedChat}
            chatName={selectedChatData?.name || ''}
            isGroup={selectedChatData?.isGroup || false}
            isOnline={selectedChatData?.isOnline || false}
            messages={messages}
            onSendMessage={handleSendMessage}
          />
        )}
      </div>
    );
  }

  return (
    <div className="h-screen bg-slate-900 dark:bg-slate-900 light:bg-white flex overflow-hidden">
      <Sidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
      />
      
      {activeSection === 'chat' && (
        <>
          <ChatList
            chats={chats}
            selectedChat={selectedChat}
            setSelectedChat={setSelectedChat}
          />
          
          <MessageArea
            selectedChat={selectedChat}
            chatName={selectedChatData?.name || ''}
            isGroup={selectedChatData?.isGroup || false}
            isOnline={selectedChatData?.isOnline || false}
            messages={messages}
            onSendMessage={handleSendMessage}
          />
          
          {showChatInfo && selectedChatData && (
            <ChatInfo
              isOpen={showChatInfo}
              onClose={() => setShowChatInfo(false)}
              chatName={selectedChatData.name}
              isGroup={selectedChatData.isGroup}
              memberCount={3}
            />
          )}
        </>
      )}

      {activeSection === 'calendar' && <Calendar />}
      
      {activeSection === 'meeting' && <VideoMeeting />}

      {activeSection === 'contacts' && <Contacts />}

      {activeSection === 'settings' && <Settings theme={theme} setTheme={handleThemeChange} />}

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