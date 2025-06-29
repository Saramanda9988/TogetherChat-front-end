import React, { useState } from 'react';
import { X, Users, Bell, Shield, Search, Settings, Phone, Video, UserPlus } from 'lucide-react';

interface ChatInfoProps {
  isOpen: boolean;
  onClose: () => void;
  chatName: string;
  isGroup: boolean;
  memberCount?: number;
}

const ChatInfo: React.FC<ChatInfoProps> = ({
  isOpen,
  onClose,
  chatName,
  isGroup,
  memberCount = 0
}) => {
  const [activeTab, setActiveTab] = useState('members');

  if (!isOpen) return null;

  return (
    <div className="w-80 bg-slate-800 border-l border-slate-700 flex flex-col">
      <div className="p-4 border-b border-slate-700 flex items-center justify-between">
        <h3 className="text-white font-medium">聊天信息</h3>
        <button
          onClick={onClose}
          className="p-1 text-slate-400 hover:text-white hover:bg-slate-700 rounded"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Chat Header */}
        <div className="p-6 text-center border-b border-slate-700">
          <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-medium mx-auto mb-3">
            {isGroup ? <Users className="w-10 h-10" /> : chatName.charAt(0).toUpperCase()}
          </div>
          <h2 className="text-white text-lg font-medium mb-1">{chatName}</h2>
          {isGroup && (
            <p className="text-slate-400 text-sm">{memberCount} 位成员</p>
          )}
        </div>

        {/* Quick Actions */}
        <div className="p-4 border-b border-slate-700">
          <div className="grid grid-cols-3 gap-4">
            <button className="flex flex-col items-center p-3 text-slate-300 hover:bg-slate-700 rounded-lg transition-colors">
              <Phone className="w-6 h-6 mb-2" />
              <span className="text-xs">语音通话</span>
            </button>
            <button className="flex flex-col items-center p-3 text-slate-300 hover:bg-slate-700 rounded-lg transition-colors">
              <Video className="w-6 h-6 mb-2" />
              <span className="text-xs">视频通话</span>
            </button>
            <button className="flex flex-col items-center p-3 text-slate-300 hover:bg-slate-700 rounded-lg transition-colors">
              <Search className="w-6 h-6 mb-2" />
              <span className="text-xs">搜索记录</span>
            </button>
          </div>
        </div>

        {isGroup && (
          <>
            {/* Tab Navigation */}
            <div className="flex border-b border-slate-700">
              <button
                onClick={() => setActiveTab('members')}
                className={`flex-1 py-3 px-4 text-sm font-medium ${
                  activeTab === 'members'
                    ? 'text-blue-400 border-b-2 border-blue-400'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                成员
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`flex-1 py-3 px-4 text-sm font-medium ${
                  activeTab === 'settings'
                    ? 'text-blue-400 border-b-2 border-blue-400'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                设置
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'members' && (
              <div className="p-4">
                <button className="flex items-center w-full p-3 text-blue-400 hover:bg-slate-700 rounded-lg mb-4">
                  <UserPlus className="w-5 h-5 mr-3" />
                  添加成员
                </button>
                
                <div className="space-y-2">
                  {[1, 2, 3].map((member) => (
                    <div key={member} className="flex items-center p-3 hover:bg-slate-700 rounded-lg">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-medium">
                        U{member}
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="text-white font-medium">用户 {member}</p>
                        <p className="text-slate-400 text-sm">在线</p>
                      </div>
                      {member === 1 && (
                        <span className="text-xs bg-yellow-500 text-yellow-900 px-2 py-1 rounded">
                          群主
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="p-4 space-y-2">
                <button className="flex items-center w-full p-3 text-slate-300 hover:bg-slate-700 rounded-lg">
                  <Bell className="w-5 h-5 mr-3" />
                  消息通知
                </button>
                <button className="flex items-center w-full p-3 text-slate-300 hover:bg-slate-700 rounded-lg">
                  <Shield className="w-5 h-5 mr-3" />
                  群聊权限
                </button>
                <button className="flex items-center w-full p-3 text-slate-300 hover:bg-slate-700 rounded-lg">
                  <Settings className="w-5 h-5 mr-3" />
                  群聊设置
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ChatInfo;