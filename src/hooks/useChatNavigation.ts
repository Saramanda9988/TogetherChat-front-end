import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const useChatNavigation = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [showChatInfo, setShowChatInfo] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const { chatId } = useParams<{ chatId: string }>();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    if (chatId) {
      setSelectedChat(chatId);
    }
  }, [chatId]);

  const handleChatSelect = (chatId: string) => {
    setSelectedChat(chatId);
    if (isMobile) {
      navigate(`/chat/${chatId}`);
    }
  };

  const handleBackToChatList = () => {
    setSelectedChat(null);
    if (isMobile) {
      navigate('/chat');
    }
  };

  const toggleChatInfo = () => {
    setShowChatInfo(!showChatInfo);
  };

  return {
    selectedChat,
    showChatInfo,
    isMobile,
    handleChatSelect,
    handleBackToChatList,
    toggleChatInfo,
    setShowChatInfo
  };
}; 