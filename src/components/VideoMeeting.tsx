import React, { useState } from 'react';
import { Video, Plus, Calendar, Podcast as Broadcast, Search, Settings, Users, Phone, Mic, MicOff, VideoOff, Monitor, MoreHorizontal, MessageSquare, Hand, Grid3X3, Maximize2 } from 'lucide-react';
import { MeetingRecord, Friend, Participant } from '../types';
import Button from './common/Button';
import Input from './common/Input';

const VideoMeeting: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'selectFriends' | 'joinMeeting' | 'inMeeting'>('home');
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
  const [meetingId, setMeetingId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [viewMode, setViewMode] = useState<'gallery' | 'speaker'>('gallery');

  // Mock 历史记录数据
  const [meetingHistory] = useState<MeetingRecord[]>([
    {
      id: '1',
      title: '糖(NenoSannn)的视频会议',
      host: 'NenoSannn',
      date: '5月13日',
      time: '22:01',
      duration: '45分钟',
      participants: 8,
      type: 'video'
    },
    {
      id: '2',
      title: '聊聊小芒的chat',
      host: '小芒',
      date: '5月11日',
      time: '20:54',
      duration: '1小时15分钟',
      participants: 5,
      type: 'video'
    },
    {
      id: '3',
      title: '产品评审会议',
      host: '产品经理',
      date: '5月10日',
      time: '14:30',
      duration: '2小时',
      participants: 12,
      type: 'video'
    }
  ]);

  // Mock 好友数据
  const [friends] = useState<Friend[]>([
    { id: '1', name: '张三', avatar: '', isOnline: true, department: '技术部' },
    { id: '2', name: '李四', avatar: '', isOnline: true, department: '产品部' },
    { id: '3', name: '王五', avatar: '', isOnline: false, department: '设计部' },
    { id: '4', name: '赵六', avatar: '', isOnline: true, department: '运营部' },
    { id: '5', name: '钱七', avatar: '', isOnline: true, department: '技术部' },
    { id: '6', name: '孙八', avatar: '', isOnline: false, department: '市场部' },
  ]);

  // Mock 会议参与者数据
  const [participants] = useState<Participant[]>([
    { id: '1', name: '我', avatar: '', isHost: true, isMuted: false, isVideoOn: true, isHandRaised: false },
    { id: '2', name: '张三', avatar: '', isHost: false, isMuted: false, isVideoOn: true, isHandRaised: false },
    { id: '3', name: '李四', avatar: '', isHost: false, isMuted: true, isVideoOn: true, isHandRaised: false },
    { id: '4', name: '王五', avatar: '', isHost: false, isMuted: false, isVideoOn: false, isHandRaised: true },
    { id: '5', name: '赵六', avatar: '', isHost: false, isMuted: false, isVideoOn: true, isHandRaised: false },
    { id: '6', name: '钱七', avatar: '', isHost: false, isMuted: true, isVideoOn: true, isHandRaised: false },
  ]);

  const filteredFriends = friends.filter(friend =>
    friend.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStartMeeting = () => {
    setCurrentView('selectFriends');
  };

  const handleJoinMeeting = () => {
    setCurrentView('joinMeeting');
  };

  const handleConfirmStartMeeting = () => {
    console.log('创建会议，邀请好友:', selectedFriends);
    setCurrentView('inMeeting');
  };

  const handleJoinMeetingSubmit = () => {
    if (meetingId.trim()) {
      console.log('加入会议:', meetingId);
      setCurrentView('inMeeting');
    }
  };

  const toggleFriendSelection = (friendId: string) => {
    setSelectedFriends(prev =>
      prev.includes(friendId)
        ? prev.filter(id => id !== friendId)
        : [...prev, friendId]
    );
  };

  const handleLeaveMeeting = () => {
    setCurrentView('home');
    setSelectedFriends([]);
    setMeetingId('');
  };

  // 主页面
  if (currentView === 'home') {
    return (
      <div className="flex-1 bg-slate-900 dark:bg-slate-900 light:bg-white flex h-full overflow-hidden">
        {/* 左侧功能区 */}
        <div className="w-96 bg-slate-900 dark:bg-slate-900 light:bg-white border-r border-slate-700 dark:border-slate-700 light:border-gray-200 flex flex-col h-full">
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              <h1 className="text-white dark:text-white light:text-gray-900 text-2xl font-bold mb-8">视频会议</h1>
              
              {/* 功能卡片网格 */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {/* 发起会议 */}
                <button
                  onClick={handleStartMeeting}
                  className="bg-blue-600 hover:bg-blue-700 rounded-xl p-6 text-white transition-colors group"
                >
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-white/30 transition-colors">
                    <Video className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium mb-1">发起会议</h3>
                  </div>
                </button>

                {/* 加入会议 */}
                <button
                  onClick={handleJoinMeeting}
                  className="bg-blue-600 hover:bg-blue-700 rounded-xl p-6 text-white transition-colors group"
                >
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-white/30 transition-colors">
                    <Plus className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium mb-1">加入会议</h3>
                  </div>
                </button>

                {/* 预约会议 */}
                <button
                  disabled
                  className="bg-orange-600/50 rounded-xl p-6 text-white/50 cursor-not-allowed"
                >
                  <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-4">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium mb-1">预约会议</h3>
                    <p className="text-xs opacity-75">即将推出</p>
                  </div>
                </button>

                {/* 会议室投屏 */}
                <button
                  disabled
                  className="bg-green-600/50 rounded-xl p-6 text-white/50 cursor-not-allowed"
                >
                  <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-4">
                    <Monitor className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium mb-1">会议室投屏</h3>
                    <p className="text-xs opacity-75">即将推出</p>
                  </div>
                </button>

                {/* 妙记 */}
                <button
                  disabled
                  className="bg-purple-600/50 rounded-xl p-6 text-white/50 cursor-not-allowed"
                >
                  <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-4">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium mb-1">妙记</h3>
                    <p className="text-xs opacity-75">即将推出</p>
                  </div>
                </button>

                {/* 直播 */}
                <button
                  disabled
                  className="bg-red-600/50 rounded-xl p-6 text-white/50 cursor-not-allowed"
                >
                  <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-4">
                    <Broadcast className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium mb-1">直播</h3>
                    <p className="text-xs opacity-75">即将推出</p>
                  </div>
                </button>

                {/* 电话 */}
                <button
                  disabled
                  className="bg-slate-600/50 rounded-xl p-6 text-white/50 cursor-not-allowed"
                >
                  <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-4">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium mb-1">电话</h3>
                    <p className="text-xs opacity-75">即将推出</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 右侧历史记录 */}
        <div className="flex-1 bg-slate-900 dark:bg-slate-900 light:bg-white flex flex-col h-full">
          <div className="p-6 border-b border-slate-700 dark:border-slate-700 light:border-gray-200 flex items-center justify-between flex-shrink-0">
            <h2 className="text-white dark:text-white light:text-gray-900 text-lg font-medium">历史记录</h2>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Search className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              <div className="space-y-4">
                {meetingHistory.map((meeting) => (
                  <div
                    key={meeting.id}
                    className="bg-slate-800 dark:bg-slate-800 light:bg-gray-100 rounded-lg p-4 hover:bg-slate-700 dark:hover:bg-slate-700 light:hover:bg-gray-200 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Video className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white dark:text-white light:text-gray-900 font-medium mb-1 truncate">{meeting.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-slate-400 dark:text-slate-400 light:text-gray-600">
                          <span>{meeting.date} {meeting.time}</span>
                          <span>•</span>
                          <span>主持人: {meeting.host}</span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-slate-400 dark:text-slate-400 light:text-gray-600 mt-1">
                          <span>时长: {meeting.duration}</span>
                          <span>•</span>
                          <span>{meeting.participants} 人参与</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 选择好友页面
  if (currentView === 'selectFriends') {
    return (
      <div className="flex-1 bg-slate-900 dark:bg-slate-900 light:bg-white flex flex-col h-full overflow-hidden">
        <div className="p-6 border-b border-slate-700 dark:border-slate-700 light:border-gray-200 flex items-center justify-between flex-shrink-0">
          <div>
            <h2 className="text-white dark:text-white light:text-gray-900 text-lg font-medium">选择参会人员</h2>
            <p className="text-slate-400 dark:text-slate-400 light:text-gray-600 text-sm mt-1">已选择 {selectedFriends.length} 人</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" onClick={() => setCurrentView('home')}>
              取消
            </Button>
            <Button
              onClick={handleConfirmStartMeeting}
              disabled={selectedFriends.length === 0}
            >
              发起会议
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            <div className="mb-6">
              <Input
                type="text"
                placeholder="搜索联系人"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={Search}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredFriends.map((friend) => (
                <div
                  key={friend.id}
                  onClick={() => toggleFriendSelection(friend.id)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                    selectedFriends.includes(friend.id)
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-slate-600 dark:border-slate-600 light:border-gray-300 bg-slate-800 dark:bg-slate-800 light:bg-gray-100 hover:border-slate-500 dark:hover:border-slate-500 light:hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                        {friend.name.charAt(0)}
                      </div>
                      {friend.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 border-2 border-slate-800 dark:border-slate-800 light:border-white rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white dark:text-white light:text-gray-900 font-medium truncate">{friend.name}</h3>
                      <p className="text-slate-400 dark:text-slate-400 light:text-gray-600 text-sm truncate">{friend.department}</p>
                    </div>
                    {selectedFriends.includes(friend.id) && (
                      <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 加入会议页面
  if (currentView === 'joinMeeting') {
    return (
      <div className="flex-1 bg-slate-900 dark:bg-slate-900 light:bg-white flex items-center justify-center h-full">
        <div className="bg-slate-800 dark:bg-slate-800 light:bg-white border border-slate-700 dark:border-slate-700 light:border-gray-200 rounded-lg p-8 w-full max-w-md">
          <h2 className="text-white dark:text-white light:text-gray-900 text-xl font-medium mb-6 text-center">加入会议</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-slate-400 dark:text-slate-400 light:text-gray-600 text-sm mb-2">会议号</label>
              <Input
                type="text"
                value={meetingId}
                onChange={(e) => setMeetingId(e.target.value)}
                placeholder="请输入会议号"
              />
            </div>
            
            <div className="flex items-center space-x-4 pt-4">
              <Button variant="ghost" onClick={() => setCurrentView('home')} className="flex-1">
                取消
              </Button>
              <Button
                onClick={handleJoinMeetingSubmit}
                disabled={!meetingId.trim()}
                className="flex-1"
              >
                加入会议
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 会议中页面
  if (currentView === 'inMeeting') {
    return (
      <div className="flex-1 bg-black flex flex-col h-full overflow-hidden">
        {/* 顶部工具栏 */}
        <div className="h-16 bg-slate-900/90 backdrop-blur-sm border-b border-slate-700 flex items-center justify-between px-6 flex-shrink-0">
          <div className="flex items-center space-x-4">
            <h2 className="text-white font-medium">团队会议</h2>
            <span className="text-slate-400 text-sm">会议号: 123-456-789</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode(viewMode === 'gallery' ? 'speaker' : 'gallery')}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg"
            >
              <Grid3X3 className="w-5 h-5" />
            </button>
            <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg">
              <Maximize2 className="w-5 h-5" />
            </button>
            <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 视频区域 */}
        <div className="flex-1 p-4 overflow-hidden">
          <div className="grid grid-cols-3 gap-4 h-full">
            {participants.map((participant) => (
              <div
                key={participant.id}
                className="relative bg-slate-800 rounded-lg overflow-hidden"
              >
                {participant.isVideoOn ? (
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <div className="text-white text-4xl font-medium">
                      {participant.name.charAt(0)}
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full bg-slate-700 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-slate-600 rounded-full flex items-center justify-center text-white text-xl font-medium mx-auto mb-2">
                        {participant.name.charAt(0)}
                      </div>
                      <p className="text-white text-sm">{participant.name}</p>
                    </div>
                  </div>
                )}
                
                {/* 参与者信息覆盖层 */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-white text-sm font-medium">{participant.name}</span>
                      {participant.isHost && (
                        <span className="text-xs bg-yellow-500 text-yellow-900 px-2 py-0.5 rounded">
                          主持人
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-1">
                      {participant.isHandRaised && (
                        <Hand className="w-4 h-4 text-yellow-400" />
                      )}
                      {participant.isMuted && (
                        <MicOff className="w-4 h-4 text-red-400" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 底部控制栏 */}
        <div className="h-20 bg-slate-900/90 backdrop-blur-sm border-t border-slate-700 flex items-center justify-center flex-shrink-0">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsAudioEnabled(!isAudioEnabled)}
              className={`p-4 rounded-full transition-colors ${
                isAudioEnabled
                  ? 'bg-slate-700 text-white hover:bg-slate-600'
                  : 'bg-red-500 text-white hover:bg-red-600'
              }`}
            >
              {isAudioEnabled ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
            </button>

            <button
              onClick={() => setIsVideoEnabled(!isVideoEnabled)}
              className={`p-4 rounded-full transition-colors ${
                isVideoEnabled
                  ? 'bg-slate-700 text-white hover:bg-slate-600'
                  : 'bg-red-500 text-white hover:bg-red-600'
              }`}
            >
              {isVideoEnabled ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
            </button>

            <button
              onClick={() => setIsScreenSharing(!isScreenSharing)}
              className={`p-4 rounded-full transition-colors ${
                isScreenSharing
                  ? 'bg-green-500 text-white hover:bg-green-600'
                  : 'bg-slate-700 text-white hover:bg-slate-600'
              }`}
            >
              <Monitor className="w-6 h-6" />
            </button>

            <button className="p-4 bg-slate-700 text-white rounded-full hover:bg-slate-600 transition-colors">
              <Hand className="w-6 h-6" />
            </button>

            <button className="p-4 bg-slate-700 text-white rounded-full hover:bg-slate-600 transition-colors">
              <MessageSquare className="w-6 h-6" />
            </button>

            <button className="p-4 bg-slate-700 text-white rounded-full hover:bg-slate-600 transition-colors">
              <Users className="w-6 h-6" />
            </button>

            <button
              onClick={handleLeaveMeeting}
              className="p-4 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            >
              <Phone className="w-6 h-6 transform rotate-[135deg]" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default VideoMeeting;