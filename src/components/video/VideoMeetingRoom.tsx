import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useWebSocket } from '../../../api/useWebSocket';
import { useWebRTC } from '../../hooks/useWebRTC';
import { togetherchat } from '../../../api/instance';

// TODO: 替换为实际的用户信息获取方式
const getCurrentUser = () => ({
  userId: String(Math.floor(Math.random() * 100000)), // mock userId
  userName: '用户' + Math.floor(Math.random() * 100),
  userAvatar: '',
});

const VideoMeetingRoom: React.FC = () => {
  const { meetId } = useParams();
  const { userId, userName, userAvatar } = getCurrentUser();
  const ws = useWebSocket();
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const [meetingReady, setMeetingReady] = useState(false);
  const [isHost, setIsHost] = useState(false); // 是否主持人
  // 集成 useWebRTC
  const {
    localStream,
    remoteStreams,
    startCall,
    endCall,
    toggleVideo,
    toggleAudio,
    createOffer,
    handleOffer,
    handleAnswer,
    handleCandidate,
    initializeLocalStream,
    isVideoEnabled,
    isAudioEnabled,
  } = useWebRTC({ userId, sendSignal: ws.sendSignal, meetId: meetId || '' });

  // 进入会议时先调用后端API
  useEffect(() => {
    let cancelled = false;
    async function joinMeeting() {
      try {
        // 1. 发起会议（或加入会议）
        await togetherchat.callController.initiateCall({
          callerId: Number(userId),
          receiverId: [], // 群聊可为空
          type: 1, // 信令类型（自定义，假设1为发起）
          callType: 2, // 2-视频通话
          sessionType: 2, // 2-群聊
          subject: '',
          expireTime: undefined,
          extra: undefined,
        });
        if (cancelled) return;
        setMeetingReady(true);
        setIsHost(true); // 这里假设发起人即主持人，实际可根据后端返回判断
        // 2. 会议创建成功后再发送 ENTER 信令
        ws.sendSignal({
          type: 4, // ENTER
          sourceId: userId,
          targetId: null,
          meetId,
          key: `${userId}-enter-${Date.now()}`,
          userId,
          userName,
          userAvatar,
        });
        startCall();
      } catch (e) {
        // TODO: 错误处理
        alert('会议创建失败，请重试');
      }
    }
    joinMeeting();
    // 离开时清理
    return () => {
      cancelled = true;
      endCall();
      ws.sendSignal({
        type: 8, // LEAVE
        sourceId: userId,
        targetId: null,
        meetId,
        key: `${userId}-leave-${Date.now()}`,
      });
    };
    // eslint-disable-next-line
  }, [meetId, userId]);

  // 信令监听
  useEffect(() => {
    if (!meetingReady) return;
    ws.registerSignalListener('onOffer', (msg) => {
      if (msg.sourceId !== userId) {
        handleOffer(msg.sourceId, msg.description);
      }
    });
    ws.registerSignalListener('onAnswer', (msg) => {
      if (msg.sourceId !== userId) {
        handleAnswer(msg.sourceId, msg.description);
      }
    });
    ws.registerSignalListener('onCandidate', (msg) => {
      if (msg.sourceId !== userId) {
        handleCandidate(msg.sourceId, msg.candidate);
      }
    });
    ws.registerSignalListener('onEnter', (msg) => {
      if (msg.sourceId !== userId) {
        createOffer(msg.sourceId);
      }
    });
    // eslint-disable-next-line
  }, [userId, meetId, meetingReady]);

  // 本地流挂载到 video
  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  // 主持人结束会议
  const handleEndMeeting = async () => {
    if (!isHost) return;
    try {
      await togetherchat.callController.endCall({
        callerId: Number(userId),
        receiverId: undefined,
        sessionId: meetId ? Number(meetId) : undefined,
        sessionType: 2, // 群聊
        cancelReason: 1, // 正常挂断
      });
      ws.sendSignal({
        type: 12, // CANCEL
        sourceId: userId,
        targetId: null,
        meetId,
        key: `${userId}-cancel-${Date.now()}`,
      });
      endCall();
    } catch (e) {
      alert('结束会议失败，请重试');
    }
  };

  return (
    <div className="flex-1 bg-black flex flex-col h-full overflow-hidden">
      <div className="h-16 bg-slate-900/90 border-b border-slate-700 flex items-center justify-between px-6 flex-shrink-0">
        <div className="flex items-center space-x-4">
          <h2 className="text-white font-medium">团队会议</h2>
          <span className="text-slate-400 text-sm">会议号: {meetId}</span>
        </div>
      </div>
      <div className="flex-1 p-4 overflow-hidden">
        <div className="grid grid-cols-3 gap-4 h-full">
          {/* 本地视频 */}
          <div className="relative bg-slate-800 rounded-lg overflow-hidden flex flex-col items-center justify-center">
            <video ref={localVideoRef} autoPlay muted playsInline className="w-full h-full object-cover" />
            <div className="absolute bottom-2 left-2 text-white text-xs bg-black/50 px-2 py-1 rounded">我（{userName}）</div>
          </div>
          {/* 远端视频 */}
          {remoteStreams.map(({ userId: uid, stream }) => (
            <div key={uid} className="relative bg-slate-800 rounded-lg overflow-hidden flex flex-col items-center justify-center">
              <video
                autoPlay
                playsInline
                className="w-full h-full object-cover"
                ref={el => {
                  if (el) el.srcObject = stream;
                }}
              />
              <div className="absolute bottom-2 left-2 text-white text-xs bg-black/50 px-2 py-1 rounded">用户 {uid}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="h-20 bg-slate-900/90 border-t border-slate-700 flex items-center justify-center flex-shrink-0">
        <button onClick={toggleAudio} className={`mx-2 px-4 py-2 rounded ${isAudioEnabled ? 'bg-green-600' : 'bg-red-600'} text-white`}>{isAudioEnabled ? '麦克风开' : '麦克风关'}</button>
        <button onClick={toggleVideo} className={`mx-2 px-4 py-2 rounded ${isVideoEnabled ? 'bg-green-600' : 'bg-red-600'} text-white`}>{isVideoEnabled ? '摄像头开' : '摄像头关'}</button>
        {isHost ? (
          <button onClick={handleEndMeeting} className="mx-2 px-4 py-2 rounded bg-red-700 text-white">结束会议</button>
        ) : (
          <button onClick={endCall} className="mx-2 px-4 py-2 rounded bg-red-700 text-white">挂断</button>
        )}
      </div>
    </div>
  );
};

export default VideoMeetingRoom; 