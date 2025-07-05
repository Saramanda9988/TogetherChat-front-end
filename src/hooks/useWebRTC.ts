import { useState, useRef, useCallback } from 'react';

interface RemoteStreamInfo {
  userId: string;
  stream: MediaStream;
}

interface WebRTCState {
  isCallActive: boolean;
  isVideoEnabled: boolean;
  isAudioEnabled: boolean;
  localStream: MediaStream | null;
  remoteStreams: RemoteStreamInfo[];
}

interface UseWebRTCOptions {
  userId: string;
  sendSignal: (signal: any) => void;
  meetId: string | number;
}

export const useWebRTC = ({ userId, sendSignal, meetId }: UseWebRTCOptions) => {
  const [state, setState] = useState<WebRTCState>({
    isCallActive: false,
    isVideoEnabled: true,
    isAudioEnabled: true,
    localStream: null,
    remoteStreams: [],
  });

  // 多人会议：每个远端用户一个 PeerConnection
  const peerConnections = useRef<Map<string, RTCPeerConnection>>(new Map());
  const remoteStreams = useRef<Map<string, MediaStream>>(new Map());
  const localStreamRef = useRef<MediaStream | null>(null);

  // 初始化本地流
  const initializeLocalStream = useCallback(async () => {
    if (localStreamRef.current) return localStreamRef.current;
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localStreamRef.current = stream;
    setState(prev => ({ ...prev, localStream: stream }));
    return stream;
  }, []);

  // 创建 PeerConnection
  const createPeerConnection = useCallback((targetId: string) => {
    if (peerConnections.current.has(targetId)) {
      return peerConnections.current.get(targetId)!;
    }
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
    });
    // 本地流加入
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => {
        pc.addTrack(track, localStreamRef.current!);
      });
    }
    // 远端流
    const remoteStream = new MediaStream();
    pc.ontrack = (event) => {
      event.streams[0].getTracks().forEach(track => {
        remoteStream.addTrack(track);
      });
      remoteStreams.current.set(targetId, remoteStream);
      setState(prev => ({
        ...prev,
        remoteStreams: Array.from(remoteStreams.current.entries()).map(([userId, stream]) => ({ userId, stream })),
      }));
    };
    // ICE
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        sendSignal({
          type: 7, // CANDIDATE
          sourceId: userId,
          targetId,
          meetId,
          key: `${userId}-${targetId}-candidate-${Date.now()}`,
          candidate: event.candidate,
        });
      }
    };
    peerConnections.current.set(targetId, pc);
    return pc;
  }, [sendSignal, userId, meetId]);

  // 发起 OFFER
  const createOffer = useCallback(async (targetId: string) => {
    const pc = createPeerConnection(targetId);
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    sendSignal({
      type: 5, // OFFER
      sourceId: userId,
      targetId,
      meetId,
      key: `${userId}-${targetId}-offer-${Date.now()}`,
      description: offer,
    });
    return offer;
  }, [createPeerConnection, sendSignal, userId, meetId]);

  // 处理 OFFER
  const handleOffer = useCallback(async (fromId: string, offer: RTCSessionDescriptionInit) => {
    const pc = createPeerConnection(fromId);
    await pc.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);
    sendSignal({
      type: 6, // ANSWER
      sourceId: userId,
      targetId: fromId,
      meetId,
      key: `${userId}-${fromId}-answer-${Date.now()}`,
      description: answer,
    });
  }, [createPeerConnection, sendSignal, userId, meetId]);

  // 处理 ANSWER
  const handleAnswer = useCallback(async (fromId: string, answer: RTCSessionDescriptionInit) => {
    const pc = createPeerConnection(fromId);
    await pc.setRemoteDescription(new RTCSessionDescription(answer));
  }, [createPeerConnection]);

  // 处理 CANDIDATE
  const handleCandidate = useCallback(async (fromId: string, candidate: RTCIceCandidateInit) => {
    const pc = createPeerConnection(fromId);
    await pc.addIceCandidate(new RTCIceCandidate(candidate));
  }, [createPeerConnection]);

  // 关闭所有连接
  const closeAllConnections = useCallback(() => {
    peerConnections.current.forEach(pc => pc.close());
    peerConnections.current.clear();
    remoteStreams.current.clear();
    setState(prev => ({ ...prev, remoteStreams: [] }));
  }, []);

  // 媒体控制
  const toggleVideo = useCallback(() => {
    if (localStreamRef.current) {
      const videoTrack = localStreamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !state.isVideoEnabled;
        setState(prev => ({ ...prev, isVideoEnabled: !prev.isVideoEnabled }));
      }
    }
  }, [state.isVideoEnabled]);

  const toggleAudio = useCallback(() => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !state.isAudioEnabled;
        setState(prev => ({ ...prev, isAudioEnabled: !prev.isAudioEnabled }));
      }
    }
  }, [state.isAudioEnabled]);

  // 启动会议
  const startCall = useCallback(async () => {
    await initializeLocalStream();
    setState(prev => ({ ...prev, isCallActive: true }));
  }, [initializeLocalStream]);

  // 结束会议
  const endCall = useCallback(() => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop());
      localStreamRef.current = null;
    }
    closeAllConnections();
    setState({
      isCallActive: false,
      isVideoEnabled: true,
      isAudioEnabled: true,
      localStream: null,
      remoteStreams: [],
    });
  }, [closeAllConnections]);

  return {
    ...state,
    remoteStreams: state.remoteStreams, // [{userId, stream}]
    startCall,
    endCall,
    toggleVideo,
    toggleAudio,
    createOffer,
    handleOffer,
    handleAnswer,
    handleCandidate,
    initializeLocalStream,
  };
};