import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { useWebRTCMeeting } from '../hooks/useWebRTCMeeting';
import { VideoPlayer, MeetingControls, ParticipantsGrid } from '../components/video';
import { Button, Modal } from '../components/ui';
import { isWebRTCSupported } from '../utils/common';

export function MeetingPage() {
  const { id: meetingIdParam } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { authState } = useAuthContext();
  const {
    meetingState,
    error,
    loading,
    localVideoRef,
    joinMeeting,
    leaveMeeting,
    endMeeting,
    toggleAudioMute,
    toggleVideoMute
  } = useWebRTCMeeting();

  const [showEndDialog, setShowEndDialog] = useState(false);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    // 检查 WebRTC 支持
    if (!isWebRTCSupported()) {
      setIsSupported(false);
      return;
    }

    // 如果用户未登录，跳转到登录页
    if (!authState.isAuthenticated) {
      navigate('/login');
      return;
    }

    // 如果有会议ID参数，自动加入会议
    if (meetingIdParam && !meetingState.isActive) {
      const meetingId = parseInt(meetingIdParam, 10);
      if (!isNaN(meetingId)) {
        joinMeeting(meetingId, 2); // 默认视频通话
      }
    }
  }, [authState.isAuthenticated, meetingIdParam, meetingState.isActive, navigate, joinMeeting]);

  // 设置本地视频流
  useEffect(() => {
    if (localVideoRef.current && meetingState.localStream) {
      localVideoRef.current.srcObject = meetingState.localStream;
    }
  }, [meetingState.localStream]);

  // 处理页面卸载
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (meetingState.isActive) {
        leaveMeeting();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      if (meetingState.isActive) {
        leaveMeeting();
      }
    };
  }, [meetingState.isActive, leaveMeeting]);

  const handleEndMeeting = async () => {
    if (meetingState.isInitiator) {
      await endMeeting();
    } else {
      await leaveMeeting();
    }
    navigate('/dashboard');
  };

  const handleLeaveClick = () => {
    setShowEndDialog(true);
  };

  const handleConfirmLeave = () => {
    setShowEndDialog(false);
    handleEndMeeting();
  };

  const handleCancelLeave = () => {
    setShowEndDialog(false);
  };

  // WebRTC 不支持
  if (!isSupported) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center text-white">
          <div className="w-24 h-24 mx-auto mb-6 bg-red-600 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-4">浏览器不支持</h2>
          <p className="text-gray-300 mb-6">
            您的浏览器不支持 WebRTC，无法使用视频通话功能。
            <br />
            请使用现代浏览器（Chrome、Firefox、Safari 等）。
          </p>
          <Button onClick={() => navigate('/dashboard')}>
            返回主页
          </Button>
        </div>
      </div>
    );
  }

  // 加载中
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center text-white">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-lg">正在加入会议...</p>
        </div>
      </div>
    );
  }

  // 错误状态
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center text-white">
          <div className="w-24 h-24 mx-auto mb-6 bg-red-600 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-4">连接失败</h2>
          <p className="text-gray-300 mb-6">{error}</p>
          <div className="space-x-4">
            <Button onClick={() => window.location.reload()}>
              重试
            </Button>
            <Button variant="secondary" onClick={() => navigate('/dashboard')}>
              返回主页
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // 会议未激活
  if (!meetingState.isActive) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center text-white">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-600 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-4">会议未开始</h2>
          <p className="text-gray-300 mb-6">
            会议还未开始或已结束
          </p>
          <Button onClick={() => navigate('/dashboard')}>
            返回主页
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* 头部信息 */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold text-white">
              视频会议 #{meetingState.meetingId}
            </h1>
            <div className="flex items-center space-x-2 text-sm text-gray-300">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>在线 {meetingState.participants.size + 1} 人</span>
            </div>
          </div>
          <div className="text-sm text-gray-300">
            {authState.user?.username}
          </div>
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* 本地视频 */}
        <div className="lg:col-span-1 space-y-4">
          <div className="relative">
            <VideoPlayer
              ref={localVideoRef}
              muted={true} // 本地视频始终静音以避免回音
              className="w-full aspect-video"
              placeholder="您的视频"
            />
            
            {/* 本地视频信息覆盖层 */}
            <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 px-2 py-1 rounded text-white text-sm">
              <div className="flex items-center space-x-2">
                {authState.user?.avatar ? (
                  <img 
                    src={authState.user.avatar} 
                    alt={authState.user.username}
                    className="w-6 h-6 rounded-full"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                    <span className="text-xs font-medium">
                      {authState.user?.username?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <span>您 {meetingState.isInitiator && '(主持人)'}</span>
              </div>
            </div>

            {/* 本地状态指示器 */}
            <div className="absolute top-2 right-2 flex space-x-1">
              {meetingState.isAudioMuted && (
                <div className="bg-red-500 p-1 rounded-full">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 11h-1.7c0 .74-.16 1.43-.43 2.05l1.23 1.23c.56-.98.9-2.09.9-3.28zm-4.02.17c0-.06.02-.11.02-.17V5c0-1.66-1.34-3-3-3S9 3.34 9 5v.18l5.98 5.99zM4.27 3L3 4.27l6.01 6.01V11c0 1.66 1.33 3 2.99 3 .22 0 .44-.03.65-.08l1.66 1.66c-.71.33-1.5.52-2.31.52-2.76 0-5.3-2.1-5.3-5.1H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c.91-.13 1.77-.45 2.54-.9L19.73 21 21 19.73 4.27 3z"/>
                  </svg>
                </div>
              )}
              {meetingState.isVideoMuted && (
                <div className="bg-red-500 p-1 rounded-full">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21 6.5l-4 4V7c0-.55-.45-1-1-1H9.82L21 17.18V6.5zM3.27 2L2 3.27 4.73 6H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.21 0 .39-.08.54-.18L19.73 21 21 19.73 3.27 2zM15 11.73L9.27 6H15v5.73z"/>
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 其他参与者视频 */}
        <div className="lg:col-span-3">
          <ParticipantsGrid participants={meetingState.participants} />
        </div>
      </div>

      {/* 底部控制栏 */}
      <div className="bg-gray-800 border-t border-gray-700 p-4">
        <MeetingControls
          isAudioMuted={meetingState.isAudioMuted}
          isVideoMuted={meetingState.isVideoMuted}
          onToggleAudio={toggleAudioMute}
          onToggleVideo={toggleVideoMute}
          onEndCall={handleLeaveClick}
          isInitiator={meetingState.isInitiator}
        />
      </div>

      {/* 结束会议确认对话框 */}
      <Modal
        isOpen={showEndDialog}
        onClose={handleCancelLeave}
        title={meetingState.isInitiator ? '结束会议' : '离开会议'}
      >
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg>
          </div>
          
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {meetingState.isInitiator ? '确认结束会议？' : '确认离开会议？'}
          </h3>
          
          <p className="text-sm text-gray-500 mb-6">
            {meetingState.isInitiator 
              ? '结束会议后，所有参与者都将被移除，会议将无法恢复。'
              : '离开会议后，您需要重新加入才能继续参与。'
            }
          </p>
          
          <div className="flex space-x-4">
            <Button
              variant="secondary"
              className="flex-1"
              onClick={handleCancelLeave}
            >
              取消
            </Button>
            <Button
              variant="danger"
              className="flex-1"
              onClick={handleConfirmLeave}
            >
              {meetingState.isInitiator ? '结束会议' : '离开会议'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
