import { useState } from 'react';
import { Chat, Message } from '../types';

export const useChat = () => {
  const [chats, setChats] = useState<Chat[]>([
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
      type: type as 'text' | 'image' | 'file',
      isRead: false,
      isOwn: true
    };

    setMessages(prev => [...prev, newMessage]);
  };

  const getChatById = (chatId: string) => {
    return chats.find(chat => chat.id === chatId);
  };

  const updateChatLastMessage = (chatId: string, message: string) => {
    setChats(prev => prev.map(chat => 
      chat.id === chatId 
        ? { 
            ...chat, 
            lastMessage: message, 
            time: new Date().toLocaleTimeString('zh-CN', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })
          }
        : chat
    ));
  };

  return {
    chats,
    messages,
    handleSendMessage,
    getChatById,
    updateChatLastMessage
  };
}; 