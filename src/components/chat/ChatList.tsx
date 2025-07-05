import React from 'react';
import { Search, Plus, UserPlus, MessageSquarePlus, PhoneCall, Phone, Video, Users, MoreHorizontal } from 'lucide-react';
import { Chat } from '../../types';
import Avatar from '../common/Avatar.tsx';
import Input from '../common/Input.tsx';

interface ChatListProps {
  chats: Chat[];
  selectedChat: string | null;
  setSelectedChat: (chatId: string) => void;
}

const ChatList: React.FC<ChatListProps> = ({ chats, selectedChat, setSelectedChat }) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [showPlusMenu, setShowPlusMenu] = React.useState(false);

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePlusMenuClick = (action: string) => {
    setShowPlusMenu(false);
    console.log(`执行操作: ${action}`);
  };

  return (
    <div className="w-80 bg-slate-900 dark:bg-slate-900 light:bg-white border-r border-slate-700 dark:border-slate-700 light:border-gray-200 flex flex-col h-full overflow-hidden">
      {/* 搜索栏 - 固定在顶部 */}
      <div className="p-4 border-b border-slate-700 dark:border-slate-700 light:border-gray-200 flex-shrink-0">
        <div className="flex items-center space-x-2">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="搜索 (Ctrl+K)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={Search}
            />
          </div>
          
          {/* Plus Button with Dropdown Menu */}
          <div className="relative">
            <button
              onClick={() => setShowPlusMenu(!showPlusMenu)}
              className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
            
            {/* Dropdown Menu */}
            {showPlusMenu && (
              <div className="absolute top-12 right-0 w-48 bg-slate-800 dark:bg-slate-800 light:bg-white border border-slate-600 dark:border-slate-600 light:border-gray-200 rounded-lg shadow-lg py-2 z-50">
                <button
                  onClick={() => handlePlusMenuClick('addFriend')}
                  className="flex items-center w-full px-4 py-2 text-sm text-slate-300 dark:text-slate-300 light:text-gray-700 hover:bg-slate-700 dark:hover:bg-slate-700 light:hover:bg-gray-100 transition-colors"
                >
                  <UserPlus className="w-4 h-4 mr-3" />
                  添加好友
                </button>
                
                <button
                  onClick={() => handlePlusMenuClick('createGroup')}
                  className="flex items-center w-full px-4 py-2 text-sm text-slate-300 dark:text-slate-300 light:text-gray-700 hover:bg-slate-700 dark:hover:bg-slate-700 light:hover:bg-gray-100 transition-colors"
                >
                  <MessageSquarePlus className="w-4 h-4 mr-3" />
                  创建群聊
                </button>
                
                <div className="border-t border-slate-600 dark:border-slate-600 light:border-gray-200 my-1"></div>
                
                <button
                  onClick={() => handlePlusMenuClick('voiceCall')}
                  className="flex items-center w-full px-4 py-2 text-sm text-slate-300 dark:text-slate-300 light:text-gray-700 hover:bg-slate-700 dark:hover:bg-slate-700 light:hover:bg-gray-100 transition-colors"
                >
                  <Phone className="w-4 h-4 mr-3" />
                  语音通话
                </button>
                
                <button
                  onClick={() => handlePlusMenuClick('videoCall')}
                  className="flex items-center w-full px-4 py-2 text-sm text-slate-300 dark:text-slate-300 light:text-gray-700 hover:bg-slate-700 dark:hover:bg-slate-700 light:hover:bg-gray-100 transition-colors"
                >
                  <Video className="w-4 h-4 mr-3" />
                  视频通话
                </button>
                
                <button
                  onClick={() => handlePlusMenuClick('videoMeeting')}
                  className="flex items-center w-full px-4 py-2 text-sm text-slate-300 dark:text-slate-300 light:text-gray-700 hover:bg-slate-700 dark:hover:bg-slate-700 light:hover:bg-gray-100 transition-colors"
                >
                  <Users className="w-4 h-4 mr-3" />
                  视频会议
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Click outside to close menu */}
      {showPlusMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowPlusMenu(false)}
        />
      )}

      {/* 聊天列表 - 可滚动区域 */}
      <div className="flex-1 overflow-y-auto">
        {filteredChats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => setSelectedChat(chat.id)}
            className={`flex items-center p-4 cursor-pointer transition-colors border-b border-slate-800 dark:border-slate-800 light:border-gray-100 ${
              selectedChat === chat.id
                ? 'bg-slate-800 dark:bg-slate-800 light:bg-blue-50 border-l-4 border-l-blue-500'
                : 'hover:bg-slate-800/50 dark:hover:bg-slate-800/50 light:hover:bg-gray-50'
            }`}
          >
            <Avatar
              name={chat.name}
              isGroup={chat.isGroup}
              isOnline={chat.isOnline}
              className="flex-shrink-0"
            />

            <div className="ml-3 flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="text-white dark:text-white light:text-gray-900 font-medium truncate">{chat.name}</h3>
                <span className="text-xs text-slate-400 dark:text-slate-400 light:text-gray-500 flex-shrink-0">{chat.time}</span>
              </div>
              <p className="text-sm text-slate-400 dark:text-slate-400 light:text-gray-600 truncate mt-1">{chat.lastMessage}</p>
            </div>

            {chat.unread > 0 && (
              <div className="ml-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
                {chat.unread > 99 ? '99+' : chat.unread}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;