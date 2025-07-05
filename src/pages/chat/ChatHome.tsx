import React from 'react';
import { useNavigate } from 'react-router-dom';
import ChatList from '../../components/chat/ChatList';
import { useChat } from '../../hooks/useChat';
import { useChatNavigation } from '../../hooks/useChatNavigation';

const ChatHome: React.FC = () => {
  const { chats } = useChat();
  const { handleChatSelect } = useChatNavigation();
  const navigate = useNavigate();

  const handleChatClick = (chatId: string) => {
    handleChatSelect(chatId);
    navigate(`/chat/${chatId}`);
  };

  return (
    <div className="h-full bg-slate-900 dark:bg-slate-900 light:bg-white flex flex-col overflow-hidden">
      <div className="bg-slate-800 dark:bg-slate-800 light:bg-gray-100 p-4 border-b border-slate-700 dark:border-slate-700 light:border-gray-200 flex-shrink-0">
        <h1 className="text-white dark:text-white light:text-gray-900 text-xl font-bold">消息</h1>
      </div>
      <div className="flex-1 overflow-hidden">
        <ChatList
          chats={chats}
          selectedChat={null}
          setSelectedChat={handleChatClick}
        />
      </div>
    </div>
  );
};

export default ChatHome; 