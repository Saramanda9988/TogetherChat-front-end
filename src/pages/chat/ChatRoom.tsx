import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MessageArea from '../../components/chat/MessageArea';
import ChatInfo from '../../components/chat/ChatInfo';
import { useChat } from '../../hooks/useChat';
import { useChatNavigation } from '../../hooks/useChatNavigation';

const ChatRoom: React.FC = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const navigate = useNavigate();
  const { messages, handleSendMessage, getChatById } = useChat();
  const { showChatInfo, toggleChatInfo } = useChatNavigation();

  const selectedChatData = getChatById(chatId || '');

  const handleBack = () => {
    navigate('/chat');
  };

  if (!selectedChatData) {
    return (
      <div className="h-full bg-slate-900 dark:bg-slate-900 light:bg-white flex items-center justify-center">
        <div className="text-center text-slate-400 dark:text-slate-400 light:text-gray-500">
          <p className="text-lg">聊天不存在</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-slate-900 dark:bg-slate-900 light:bg-white flex overflow-hidden">
      <MessageArea
        selectedChat={chatId || ''}
        chatName={selectedChatData.name}
        isGroup={selectedChatData.isGroup}
        isOnline={selectedChatData.isOnline || false}
        messages={messages}
        onSendMessage={handleSendMessage}
        onBack={handleBack}
      />
      
      {showChatInfo && (
        <ChatInfo
          isOpen={showChatInfo}
          onClose={toggleChatInfo}
          chatName={selectedChatData.name}
          isGroup={selectedChatData.isGroup}
          memberCount={3}
        />
      )}
    </div>
  );
};

export default ChatRoom; 