import { Button } from '../ui';

// 会议控制栏组件属性
interface MeetingControlsProps {
  isAudioMuted: boolean;
  isVideoMuted: boolean;
  onToggleAudio: () => void;
  onToggleVideo: () => void;
  onEndCall: () => void;
  isInitiator?: boolean;
  className?: string;
}

// 会议控制栏组件
export function MeetingControls({
  isAudioMuted,
  isVideoMuted,
  onToggleAudio,
  onToggleVideo,
  onEndCall,
  isInitiator = false,
  className = ''
}: MeetingControlsProps) {
  return (
    <div className={`flex items-center justify-center space-x-4 p-4 bg-gray-800 rounded-lg ${className}`}>
      {/* 音频控制 */}
      <Button
        onClick={onToggleAudio}
        variant={isAudioMuted ? 'danger' : 'secondary'}
        size="lg"
        className="w-12 h-12 rounded-full p-0"
        title={isAudioMuted ? '开启麦克风' : '关闭麦克风'}
      >
        {isAudioMuted ? (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 11h-1.7c0 .74-.16 1.43-.43 2.05l1.23 1.23c.56-.98.9-2.09.9-3.28zm-4.02.17c0-.06.02-.11.02-.17V5c0-1.66-1.34-3-3-3S9 3.34 9 5v.18l5.98 5.99zM4.27 3L3 4.27l6.01 6.01V11c0 1.66 1.33 3 2.99 3 .22 0 .44-.03.65-.08l1.66 1.66c-.71.33-1.5.52-2.31.52-2.76 0-5.3-2.1-5.3-5.1H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c.91-.13 1.77-.45 2.54-.9L19.73 21 21 19.73 4.27 3z"/>
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2c1.66 0 3 1.34 3 3v6c0 1.66-1.34 3-3 3s-3-1.34-3-3V5c0-1.66 1.34-3 3-3zm5.3 6c0 3-2.54 5.1-5.3 5.1S6.7 11 6.7 8H5c0 3.41 2.72 6.23 6 6.72V17h2v-2.28c3.28-.49 6-3.31 6-6.72h-1.7z"/>
          </svg>
        )}
      </Button>

      {/* 视频控制 */}
      <Button
        onClick={onToggleVideo}
        variant={isVideoMuted ? 'danger' : 'secondary'}
        size="lg"
        className="w-12 h-12 rounded-full p-0"
        title={isVideoMuted ? '开启摄像头' : '关闭摄像头'}
      >
        {isVideoMuted ? (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21 6.5l-4 4V7c0-.55-.45-1-1-1H9.82L21 17.18V6.5zM3.27 2L2 3.27 4.73 6H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.21 0 .39-.08.54-.18L19.73 21 21 19.73 3.27 2zM15 11.73L9.27 6H15v5.73z"/>
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
          </svg>
        )}
      </Button>

      {/* 结束通话 */}
      <Button
        onClick={onEndCall}
        variant="danger"
        size="lg"
        className="w-12 h-12 rounded-full p-0"
        title={isInitiator ? '结束会议' : '离开会议'}
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
          <path d="M19 13h-2v2h2v-2zm0-4h-2v2h2V9z"/>
        </svg>
      </Button>
    </div>
  );
}
