import React, { useState, useRef, useEffect } from 'react';
import { Send, Smile, Paperclip, Phone, Video, MoreHorizontal, Reply, Copy, Trash2, MessageCircle, ArrowLeft } from 'lucide-react';
import { Message } from '../types';
import Avatar from './common/Avatar';
import Input from './common/Input';
import Button from './common/Button';

interface MessageAreaProps {
  selectedChat: string | null;
  chatName: string;
  isGroup: boolean;
  isOnline: boolean;
  messages: Message[];
  onSendMessage: (content: string, type: string) => void;
}

const MessageArea: React.FC<MessageAreaProps> = ({
  selectedChat,
  chatName,
  isGroup,
  isOnline,
  messages,
  onSendMessage
}) => {
  const [messageText, setMessageText] = useState('');
  const [showContextMenu, setShowContextMenu] = useState<{
    messageId: string;
    x: number;
    y: number;
  } | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (messageText.trim()) {
      onSendMessage(messageText, 'text');
      setMessageText('');
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleRightClick = (e: React.MouseEvent, messageId: string) => {
    e.preventDefault();
    setShowContextMenu({
      messageId,
      x: e.clientX,
      y: e.clientY
    });
  };

  useEffect(() => {
    const handleClickOutside = () => setShowContextMenu(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  if (!selectedChat) {
    return (
      <div className="flex-1 bg-slate-900 dark:bg-slate-900 light:bg-white flex items-center justify-center h-full">
        <div className="text-center text-slate-400 dark:text-slate-400 light:text-gray-500">
          <MessageCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p className="text-lg">选择一个对话开始聊天</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-slate-900 dark:bg-slate-900 light:bg-white flex flex-col h-full overflow-hidden">
      {/* Chat Header - 固定在顶部 */}
      <div className="h-16 bg-slate-800 dark:bg-slate-800 light:bg-gray-100 border-b border-slate-700 dark:border-slate-700 light:border-gray-200 flex items-center justify-between px-6 flex-shrink-0">
        <div className="flex items-center">
          {/* 移动端返回按钮 */}
          <button className="md:hidden p-2 text-slate-400 dark:text-slate-400 light:text-gray-600 hover:text-white dark:hover:text-white light:hover:text-gray-900 hover:bg-slate-700 dark:hover:bg-slate-700 light:hover:bg-gray-200 rounded-lg transition-colors mr-2">
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <Avatar name={chatName} isGroup={isGroup} />
          <div className="ml-3 min-w-0">
            <h2 className="text-white dark:text-white light:text-gray-900 font-medium truncate">{chatName}</h2>
            <p className="text-sm text-slate-400 dark:text-slate-400 light:text-gray-600">
              {isGroup ? '3 位成员' : isOnline ? '在线' : '离线'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 flex-shrink-0">
          <Button variant="ghost" size="sm">
            <Phone className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="sm">
            <Video className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Messages - 可滚动区域 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
            onContextMenu={(e) => handleRightClick(e, message.id)}
          >
            <div className={`max-w-xs lg:max-w-md ${message.isOwn ? 'order-2' : 'order-1'}`}>
              {message.replyTo && (
                <div className="mb-2 p-2 bg-slate-800 dark:bg-slate-800 light:bg-gray-100 border-l-4 border-blue-500 rounded text-sm">
                  <p className="text-blue-400 font-medium">{message.replyTo.senderName}</p>
                  <p className="text-slate-300 dark:text-slate-300 light:text-gray-700 truncate">{message.replyTo.content}</p>
                </div>
              )}
              
              <div
                className={`px-4 py-2 rounded-lg ${
                  message.isOwn
                    ? 'bg-blue-500 text-white'
                    : 'bg-slate-700 dark:bg-slate-700 light:bg-gray-200 text-slate-100 dark:text-slate-100 light:text-gray-900'
                }`}
              >
                {!message.isOwn && isGroup && (
                  <p className="text-xs text-blue-400 mb-1">{message.senderName}</p>
                )}
                <p className="break-words">{message.content}</p>
              </div>
              
              <div className={`mt-1 flex items-center text-xs text-slate-400 dark:text-slate-400 light:text-gray-500 ${
                message.isOwn ? 'justify-end' : 'justify-start'
              }`}>
                <span>{message.timestamp}</span>
                {message.isOwn && message.isRead && (
                  <span className="ml-1 text-blue-400">已读</span>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input - 固定在底部 */}
      <div className="p-4 bg-slate-800 dark:bg-slate-800 light:bg-gray-100 border-t border-slate-700 dark:border-slate-700 light:border-gray-200 flex-shrink-0">
        <div className="flex items-end space-x-3">
          <Button variant="ghost" size="sm">
            <Paperclip className="w-5 h-5" />
          </Button>
          
          <div className="flex-1 min-w-0">
            <Input
              ref={inputRef}
              type="text"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="输入消息..."
              className="resize-none"
            />
          </div>
          
          <Button variant="ghost" size="sm">
            <Smile className="w-5 h-5" />
          </Button>
          
          <Button
            onClick={handleSendMessage}
            disabled={!messageText.trim()}
            size="sm"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Context Menu */}
      {showContextMenu && (
        <div
          className="fixed bg-slate-800 dark:bg-slate-800 light:bg-white border border-slate-600 dark:border-slate-600 light:border-gray-200 rounded-lg shadow-lg py-1 z-50"
          style={{
            left: showContextMenu.x,
            top: showContextMenu.y
          }}
        >
          <button className="flex items-center w-full px-3 py-2 text-sm text-slate-300 dark:text-slate-300 light:text-gray-700 hover:bg-slate-700 dark:hover:bg-slate-700 light:hover:bg-gray-100">
            <Reply className="w-4 h-4 mr-2" />
            回复
          </button>
          <button className="flex items-center w-full px-3 py-2 text-sm text-slate-300 dark:text-slate-300 light:text-gray-700 hover:bg-slate-700 dark:hover:bg-slate-700 light:hover:bg-gray-100">
            <Copy className="w-4 h-4 mr-2" />
            复制
          </button>
          <button className="flex items-center w-full px-3 py-2 text-sm text-red-400 hover:bg-slate-700 dark:hover:bg-slate-700 light:hover:bg-gray-100">
            <Trash2 className="w-4 h-4 mr-2" />
            撤回
          </button>
        </div>
      )}
    </div>
  );
};

export default MessageArea;