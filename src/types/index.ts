export interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  isGroup: boolean;
  isOnline?: boolean;
  type: 'chat' | 'group' | 'bot';
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  type: 'text' | 'image' | 'file' | 'system';
  isRead: boolean;
  isOwn: boolean;
  replyTo?: {
    id: string;
    content: string;
    senderName: string;
  };
}

export interface Contact {
  id: string;
  name: string;
  nickname?: string;
  avatar: string;
  isOnline: boolean;
  userId: string;
  department?: string;
  signature?: string;
}

export interface Group {
  id: string;
  name: string;
  avatar: string;
  memberCount: number;
  description?: string;
}

export interface UserProfile {
  id: string;
  username: string;
  nickname: string;
  email: string;
  phone: string;
  avatar: string;
  signature: string;
  department: string;
}

export interface TodoItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location?: string;
  participants?: string[];
  description?: string;
  type: 'meeting' | 'task' | 'event';
  priority: 'high' | 'medium' | 'low';
}

export interface MeetingRecord {
  id: string;
  title: string;
  host: string;
  date: string;
  time: string;
  duration: string;
  participants: number;
  type: 'video' | 'audio';
}

export interface Friend {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
  department?: string;
}

export interface Participant {
  id: string;
  name: string;
  avatar: string;
  isHost: boolean;
  isMuted: boolean;
  isVideoOn: boolean;
  isHandRaised: boolean;
}

export type Theme = 'light' | 'dark' | 'auto';

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}