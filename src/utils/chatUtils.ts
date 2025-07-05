import { Message, Chat } from '../types';

export const formatTime = (date: Date | string): string => {
  const now = new Date();
  const messageDate = typeof date === 'string' ? new Date(date) : date;
  
  const diffInHours = (now.getTime() - messageDate.getTime()) / (1000 * 60 * 60);
  
  if (diffInHours < 24) {
    return messageDate.toLocaleTimeString('zh-CN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  } else if (diffInHours < 48) {
    return '昨天';
  } else if (diffInHours < 168) { // 7 days
    const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    return days[messageDate.getDay()];
  } else {
    return messageDate.toLocaleDateString('zh-CN', { 
      month: 'numeric', 
      day: 'numeric' 
    });
  }
};

export const filterChats = (chats: Chat[], searchTerm: string): Chat[] => {
  if (!searchTerm.trim()) return chats;
  
  return chats.filter(chat =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export const groupMessagesByDate = (messages: Message[]) => {
  const groups: { [key: string]: Message[] } = {};
  
  messages.forEach(message => {
    const date = new Date(message.timestamp).toDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
  });
  
  return Object.entries(groups).map(([date, messages]) => ({
    date,
    messages: messages.sort((a, b) => 
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    )
  }));
};

export const getUnreadCount = (chat: Chat): number => {
  return chat.unread || 0;
};

export const markChatAsRead = (chatId: string, chats: Chat[]): Chat[] => {
  return chats.map(chat => 
    chat.id === chatId ? { ...chat, unread: 0 } : chat
  );
};

export const validateMessage = (content: string): boolean => {
  return content.trim().length > 0 && content.trim().length <= 1000;
};

export const truncateMessage = (content: string, maxLength: number = 50): string => {
  if (content.length <= maxLength) return content;
  return content.substring(0, maxLength) + '...';
}; 