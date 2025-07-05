import { useState, useEffect, useRef, useCallback } from 'react';
import { useImmer } from 'use-immer';
import { MeetingState, Participant, WSMessage, WSEntry, WSOffer, WSAnswer, WSCandidate, WSLeave, WSJoin, WSReject, WSCancel } from '../types/webrtc';
import { useAuth } from './useAuth';
import { useWebSocket } from '../../api/useWebSocket';
import { apiClient } from '../utils/apiClient';
import { CallingRequest } from '../../api/index';
import { 
  getUserMedia, 
  createPeerConnection, 
  createOffer, 
  createAnswer, 
  handleIceCandidate,
  stopMediaStream,
  toggleAudio,
  toggleVideo,
  convertToSignalDescription,
  convertToSignalCandidate,
  convertFromSignalDescription,
  convertFromSignalCandidate,
  MEDIA_CONSTRAINTS
} from '../utils/webrtc';
import { generateUUID } from '../utils/common';

// WebRTC 会议管理 Hook
export function useWebRTCMeeting() {
  const { authState } = useAuth();
  const webSocket = useWebSocket();

  // 会议状态
  const [meetingState, updateMeetingState] = useImmer<MeetingState>({
    meetingId: null,
    isActive: false,
    isInitiator: false,
    localStream: null,
    participants: new Map(),
    isAudioMuted: false,
    isVideoMuted: false
  });

  // 错误状态
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // 本地视频 ref
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const pendingCandidates = useRef<Map<number, RTCIceCandidateInit[]>>(new Map());

  // 初始化 WebSocket 信令监听
  useEffect(() => {
    if (!webSocket.registerSignalListener) return;

    webSocket.registerSignalListener('onOffer', handleOfferSignal);
    webSocket.registerSignalListener('onAnswer', handleAnswerSignal);
    webSocket.registerSignalListener('onCandidate', handleCandidateSignal);
    webSocket.registerSignalListener('onEnter', handleEnterSignal);
    webSocket.registerSignalListener('onLeave', handleLeaveSignal);
    webSocket.registerSignalListener('onJoin', handleJoinSignal);
    webSocket.registerSignalListener('onReject', handleRejectSignal);
    webSocket.registerSignalListener('onCancel', handleCancelSignal);

    return () => {
      // 清理监听器
      webSocket.registerSignalListener('onOffer', () => {});
      webSocket.registerSignalListener('onAnswer', () => {});
      webSocket.registerSignalListener('onCandidate', () => {});
      webSocket.registerSignalListener('onEnter', () => {});
      webSocket.registerSignalListener('onLeave', () => {});
      webSocket.registerSignalListener('onJoin', () => {});
      webSocket.registerSignalListener('onReject', () => {});
      webSocket.registerSignalListener('onCancel', () => {});
    };
  }, [webSocket]);

  // 发起会议
  const startMeeting = useCallback(async (receiverIds: number[], callType: number = 2): Promise<void> => {
    if (!authState.user) {
      setError('用户未登录');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // 1. 创建会议
      const callingRequest: CallingRequest = {
        callerId: authState.user.id,
        receiverId: receiverIds,
        type: 10, // JOIN 信令
        callType: callType, // 1-语音, 2-视频
        sessionType: receiverIds.length > 1 ? 2 : 1, // 1-一对一, 2-群聊
        subject: receiverIds.length > 1 ? '群聊会议' : '一对一通话'
      };

      const response = await apiClient.callController.initiateCall(callingRequest);
      if (!response.success || !response.data) {
        throw new Error(response.errMsg || '创建会议失败');
      }

      const meetingId = response.data.sessionId;
      if (!meetingId) {
        throw new Error('会议ID获取失败');
      }

      // 2. 获取本地媒体流
      const stream = await getUserMedia({
        audio: MEDIA_CONSTRAINTS.audio,
        video: callType === 2 ? MEDIA_CONSTRAINTS.video : false
      });

      updateMeetingState(draft => {
        draft.meetingId = meetingId;
        draft.isActive = true;
        draft.isInitiator = true;
        draft.localStream = stream;
      });

      // 3. 设置本地视频
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      // 4. 发送 JOIN 信令给其他用户
      const joinSignal: WSJoin = {
        type: 10,
        sourceId: authState.user.id,
        targetId: null, // 广播给所有用户
        meetId: meetingId,
        key: generateUUID()
      };

      webSocket.sendSignal(joinSignal);

    } catch (error) {
      console.error('发起会议失败:', error);
      setError(error instanceof Error ? error.message : '发起会议失败');
    } finally {
      setLoading(false);
    }
  }, [authState.user, webSocket, apiClient, updateMeetingState]);

  // 加入会议
  const joinMeeting = useCallback(async (meetingId: number, callType: number = 2): Promise<void> => {
    if (!authState.user) {
      setError('用户未登录');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // 1. 获取本地媒体流
      const stream = await getUserMedia({
        audio: MEDIA_CONSTRAINTS.audio,
        video: callType === 2 ? MEDIA_CONSTRAINTS.video : false
      });

      updateMeetingState(draft => {
        draft.meetingId = meetingId;
        draft.isActive = true;
        draft.isInitiator = false;
        draft.localStream = stream;
      });

      // 2. 设置本地视频
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      // 3. 发送 ENTER 信令
      const enterSignal: WSEntry = {
        type: 4,
        sourceId: authState.user.id,
        targetId: null,
        meetId: meetingId,
        key: generateUUID(),
        userId: authState.user.id,
        userName: authState.user.username,
        userAvatar: authState.user.avatar || ''
      };

      webSocket.sendSignal(enterSignal);

    } catch (error) {
      console.error('加入会议失败:', error);
      setError(error instanceof Error ? error.message : '加入会议失败');
    } finally {
      setLoading(false);
    }
  }, [authState.user, webSocket, updateMeetingState]);

  // 离开会议
  const leaveMeeting = useCallback(async (): Promise<void> => {
    if (!meetingState.meetingId || !authState.user) return;

    try {
      // 1. 发送 LEAVE 信令
      const leaveSignal: WSLeave = {
        type: 8,
        sourceId: authState.user.id,
        targetId: null,
        meetId: meetingState.meetingId,
        key: generateUUID()
      };

      webSocket.sendSignal(leaveSignal);

      // 2. 清理本地资源
      if (meetingState.localStream) {
        stopMediaStream(meetingState.localStream);
      }

      // 3. 清理所有 peer connections
      meetingState.participants.forEach(participant => {
        if (participant.peerConnection) {
          participant.peerConnection.close();
        }
      });

      // 4. 重置状态
      updateMeetingState(draft => {
        draft.meetingId = null;
        draft.isActive = false;
        draft.isInitiator = false;
        draft.localStream = null;
        draft.participants.clear();
        draft.isAudioMuted = false;
        draft.isVideoMuted = false;
      });

      setError(null);

    } catch (error) {
      console.error('离开会议失败:', error);
      setError('离开会议失败');
    }
  }, [meetingState, authState.user, webSocket, updateMeetingState]);

  // 结束会议
  const endMeeting = useCallback(async (): Promise<void> => {
    if (!meetingState.meetingId || !authState.user || !meetingState.isInitiator) return;

    try {
      // 1. 发送 CANCEL 信令
      const cancelSignal: WSCancel = {
        type: 12,
        sourceId: authState.user.id,
        targetId: null,
        meetId: meetingState.meetingId,
        key: generateUUID()
      };

      webSocket.sendSignal(cancelSignal);

      // 2. 调用后端结束会议
      await apiClient.callController.endCall({
        callerId: authState.user.id,
        sessionId: meetingState.meetingId,
        cancelReason: 1 // 正常挂断
      });

      // 3. 清理资源
      await leaveMeeting();

    } catch (error) {
      console.error('结束会议失败:', error);
      setError('结束会议失败');
    }
  }, [meetingState, authState.user, webSocket, apiClient, leaveMeeting]);

  // 切换音频状态
  const toggleAudioMute = useCallback(() => {
    if (!meetingState.localStream) return;

    const newMuted = !meetingState.isAudioMuted;
    toggleAudio(meetingState.localStream, newMuted);
    
    updateMeetingState(draft => {
      draft.isAudioMuted = newMuted;
    });
  }, [meetingState.localStream, meetingState.isAudioMuted, updateMeetingState]);

  // 切换视频状态
  const toggleVideoMute = useCallback(() => {
    if (!meetingState.localStream) return;

    const newMuted = !meetingState.isVideoMuted;
    toggleVideo(meetingState.localStream, newMuted);
    
    updateMeetingState(draft => {
      draft.isVideoMuted = newMuted;
    });
  }, [meetingState.localStream, meetingState.isVideoMuted, updateMeetingState]);

  // 信令处理函数
  const handleOfferSignal = useCallback(async (message: WSMessage<WSOffer>) => {
    if (!authState.user || !meetingState.localStream || !message.data) return;

    const { data } = message;
    const sourceId = data.sourceId;

    try {
      // 创建 peer connection
      const peerConnection = createPeerConnection();
      
      // 添加本地流
      meetingState.localStream.getTracks().forEach(track => {
        peerConnection.addTrack(track, meetingState.localStream!);
      });

      // 处理远程流
      peerConnection.ontrack = (event) => {
        updateMeetingState(draft => {
          const participant = draft.participants.get(sourceId);
          if (participant) {
            participant.stream = event.streams[0];
          }
        });
      };

      // 处理 ICE 候选
      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          const candidateSignal: WSCandidate = {
            type: 7,
            sourceId: authState.user!.id,
            targetId: sourceId,
            meetId: meetingState.meetingId!,
            key: generateUUID(),
            candidate: convertToSignalCandidate(event.candidate)
          };
          webSocket.sendSignal(candidateSignal);
        }
      };

      // 创建 Answer
      const offer = convertFromSignalDescription(data.description);
      const answer = await createAnswer(peerConnection, offer);

      // 发送 Answer 信令
      const answerSignal: WSAnswer = {
        type: 6,
        sourceId: authState.user.id,
        targetId: sourceId,
        meetId: meetingState.meetingId!,
        key: generateUUID(),
        description: convertToSignalDescription(answer)
      };

      webSocket.sendSignal(answerSignal);

      // 保存 peer connection
      updateMeetingState(draft => {
        const participant = draft.participants.get(sourceId);
        if (participant) {
          participant.peerConnection = peerConnection;
        }
      });

      // 处理等待的 ICE 候选
      const pending = pendingCandidates.current.get(sourceId);
      if (pending) {
        for (const candidate of pending) {
          await handleIceCandidate(peerConnection, candidate);
        }
        pendingCandidates.current.delete(sourceId);
      }

    } catch (error) {
      console.error('处理 Offer 信令失败:', error);
    }
  }, [authState.user, meetingState, webSocket, updateMeetingState]);

  const handleAnswerSignal = useCallback(async (message: WSMessage<WSAnswer>) => {
    if (!authState.user || !message.data) return;

    const { data } = message;
    const sourceId = data.sourceId;

    try {
      const participant = meetingState.participants.get(sourceId);
      if (!participant?.peerConnection) return;

      const answer = convertFromSignalDescription(data.description);
      await participant.peerConnection.setRemoteDescription(answer);

      // 处理等待的 ICE 候选
      const pending = pendingCandidates.current.get(sourceId);
      if (pending) {
        for (const candidate of pending) {
          await handleIceCandidate(participant.peerConnection, candidate);
        }
        pendingCandidates.current.delete(sourceId);
      }

    } catch (error) {
      console.error('处理 Answer 信令失败:', error);
    }
  }, [authState.user, meetingState]);

  const handleCandidateSignal = useCallback(async (message: WSMessage<WSCandidate>) => {
    if (!authState.user || !message.data) return;

    const { data } = message;
    const sourceId = data.sourceId;

    try {
      const participant = meetingState.participants.get(sourceId);
      const candidate = convertFromSignalCandidate(data.candidate);

      if (participant?.peerConnection && participant.peerConnection.remoteDescription) {
        await handleIceCandidate(participant.peerConnection, candidate);
      } else {
        // 保存候选等待 peer connection 准备好
        const pending = pendingCandidates.current.get(sourceId) || [];
        pending.push(candidate);
        pendingCandidates.current.set(sourceId, pending);
      }

    } catch (error) {
      console.error('处理 Candidate 信令失败:', error);
    }
  }, [authState.user, meetingState]);

  const handleEnterSignal = useCallback(async (message: WSMessage<WSEntry>) => {
    if (!authState.user || !meetingState.localStream || !message.data) return;

    const { data } = message;
    const sourceId = data.sourceId;

    if (sourceId === authState.user.id) return; // 忽略自己的信令

    try {
      // 添加新参与者
      const participant: Participant = {
        user: {
          id: data.userId,
          username: data.userName,
          avatar: data.userAvatar
        },
        stream: undefined,
        peerConnection: undefined
      };

      updateMeetingState(draft => {
        draft.participants.set(sourceId, participant);
      });

      // 创建 peer connection
      const peerConnection = createPeerConnection();
      
      // 添加本地流
      meetingState.localStream.getTracks().forEach(track => {
        peerConnection.addTrack(track, meetingState.localStream!);
      });

      // 处理远程流
      peerConnection.ontrack = (event) => {
        updateMeetingState(draft => {
          const participant = draft.participants.get(sourceId);
          if (participant) {
            participant.stream = event.streams[0];
          }
        });
      };

      // 处理 ICE 候选
      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          const candidateSignal: WSCandidate = {
            type: 7,
            sourceId: authState.user!.id,
            targetId: sourceId,
            meetId: meetingState.meetingId!,
            key: generateUUID(),
            candidate: convertToSignalCandidate(event.candidate)
          };
          webSocket.sendSignal(candidateSignal);
        }
      };

      // 创建并发送 Offer
      const offer = await createOffer(peerConnection);
      const offerSignal: WSOffer = {
        type: 5,
        sourceId: authState.user.id,
        targetId: sourceId,
        meetId: meetingState.meetingId!,
        key: generateUUID(),
        description: convertToSignalDescription(offer)
      };

      webSocket.sendSignal(offerSignal);

      // 保存 peer connection
      updateMeetingState(draft => {
        const participant = draft.participants.get(sourceId);
        if (participant) {
          participant.peerConnection = peerConnection;
        }
      });

    } catch (error) {
      console.error('处理 Enter 信令失败:', error);
    }
  }, [authState.user, meetingState, webSocket, updateMeetingState]);

  const handleLeaveSignal = useCallback((message: WSMessage<WSLeave>) => {
    if (!message.data) return;

    const { data } = message;
    const sourceId = data.sourceId;

    updateMeetingState(draft => {
      const participant = draft.participants.get(sourceId);
      if (participant?.peerConnection) {
        participant.peerConnection.close();
      }
      draft.participants.delete(sourceId);
    });

    // 清理等待的候选
    pendingCandidates.current.delete(sourceId);
  }, [updateMeetingState]);

  const handleJoinSignal = useCallback((message: WSMessage<WSJoin>) => {
    // 处理加入会议邀请
    console.log('收到加入会议邀请:', message.data);
    // 这里可以弹出邀请对话框或自动加入
  }, []);

  const handleRejectSignal = useCallback((message: WSMessage<WSReject>) => {
    console.log('会议邀请被拒绝:', message.data);
  }, []);

  const handleCancelSignal = useCallback((message: WSMessage<WSCancel>) => {
    console.log('会议被取消:', message.data);
    // 清理会议状态
    leaveMeeting();
  }, [leaveMeeting]);

  return {
    meetingState,
    error,
    loading,
    localVideoRef,
    startMeeting,
    joinMeeting,
    leaveMeeting,
    endMeeting,
    toggleAudioMute,
    toggleVideoMute
  };
}
