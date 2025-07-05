import React from 'react';
import { useParams } from 'react-router-dom';
import ChatList from '../../components/chat/ChatList';
import MessageArea from '../../components/chat/MessageArea';
import ChatInfo from '../../components/chat/ChatInfo';
import { useChat } from '../../hooks/useChat';
import { useChatNavigation } from '../../hooks/useChatNavigation';

const ChatDesktop: React.FC = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const { chats, messages, handleSendMessage, getChatById } = useChat();
  const { showChatInfo, toggleChatInfo, handleChatSelect } = useChatNavigation();

  const selectedChatData = getChatById(chatId || '');

  return (
    <div className="h-full bg-slate-900 dark:bg-slate-900 light:bg-white flex overflow-hidden">
      <ChatList
        chats={chats}
        selectedChat={chatId || null}
        setSelectedChat={handleChatSelect}
      />
      
      {selectedChatData ? (
        <>
          <MessageArea
            selectedChat={chatId || ''}
            chatName={selectedChatData.name}
            isGroup={selectedChatData.isGroup}
            isOnline={selectedChatData.isOnline || false}
            messages={messages}
            onSendMessage={handleSendMessage}
            onBack={undefined}
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
        </>
      ) : (
        <div className="flex-1 bg-slate-900 dark:bg-slate-900 light:bg-white flex items-center justify-center">
          <div className="text-center text-slate-400 dark:text-slate-400 light:text-gray-500">
            <p className="text-lg">选择一个对话开始聊天</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatDesktop; 