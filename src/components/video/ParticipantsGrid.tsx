import { Participant } from '../../types/webrtc';
import { VideoPlayer } from './VideoPlayer';

// 参与者网格组件属性
interface ParticipantsGridProps {
  participants: Map<number, Participant>;
  className?: string;
}

// 参与者网格组件
export function ParticipantsGrid({ participants, className = '' }: ParticipantsGridProps) {
  const participantList = Array.from(participants.values());
  
  // 根据参与者数量计算网格布局
  const getGridClass = (count: number) => {
    if (count === 0) return '';
    if (count === 1) return 'grid-cols-1';
    if (count <= 4) return 'grid-cols-2';
    if (count <= 9) return 'grid-cols-3';
    return 'grid-cols-4';
  };

  if (participantList.length === 0) {
    return (
      <div className={`flex items-center justify-center h-64 bg-gray-100 rounded-lg ${className}`}>
        <div className="text-center text-gray-500">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-300 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A3.016 3.016 0 0 0 17.09 7H16c-.8 0-1.52.31-2.07.81L12.67 9.2c-.58.67-.97 1.47-1.11 2.33l-.54 3.47H8v4H6v2h14z"/>
            </svg>
          </div>
          <p>等待其他参与者加入...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`grid gap-4 ${getGridClass(participantList.length)} ${className}`}>
      {participantList.map((participant) => (
        <div 
          key={participant.user.id} 
          className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video"
        >
          <VideoPlayer
            stream={participant.stream}
            className="w-full h-full"
            placeholder={`等待 ${participant.user.username} 的视频...`}
          />
          
          {/* 参与者信息覆盖层 */}
          <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 px-2 py-1 rounded text-white text-sm">
            <div className="flex items-center space-x-2">
              {participant.user.avatar ? (
                <img 
                  src={participant.user.avatar} 
                  alt={participant.user.username}
                  className="w-6 h-6 rounded-full"
                />
              ) : (
                <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center">
                  <span className="text-xs font-medium">
                    {participant.user.username.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <span>{participant.user.username}</span>
            </div>
          </div>

          {/* 音频状态指示器 */}
          {participant.isAudioMuted && (
            <div className="absolute top-2 right-2 bg-red-500 p-1 rounded-full">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 11h-1.7c0 .74-.16 1.43-.43 2.05l1.23 1.23c.56-.98.9-2.09.9-3.28zm-4.02.17c0-.06.02-.11.02-.17V5c0-1.66-1.34-3-3-3S9 3.34 9 5v.18l5.98 5.99zM4.27 3L3 4.27l6.01 6.01V11c0 1.66 1.33 3 2.99 3 .22 0 .44-.03.65-.08l1.66 1.66c-.71.33-1.5.52-2.31.52-2.76 0-5.3-2.1-5.3-5.1H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c.91-.13 1.77-.45 2.54-.9L19.73 21 21 19.73 4.27 3z"/>
              </svg>
            </div>
          )}

          {/* 连接状态指示器 */}
          {!participant.stream && (
            <div className="absolute top-2 left-2">
              <div className="flex items-center space-x-1 bg-yellow-500 px-2 py-1 rounded text-white text-xs">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                <span>连接中...</span>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
