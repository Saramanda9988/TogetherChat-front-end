import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ChatHome from './chat/ChatHome';
import ChatRoom from './chat/ChatRoom';
import ChatDesktop from './chat/ChatDesktop';

const ChatPage: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  if (isMobile) {
    return (
      <Routes>
        <Route path="/" element={<ChatHome />} />
        <Route path="/:chatId" element={<ChatRoom />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<ChatDesktop />} />
      <Route path="/:chatId" element={<ChatDesktop />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default ChatPage;
