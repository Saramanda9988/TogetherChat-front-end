// WebRTC 相关工具函数
import { RTCDescription, RTCCandidate } from '../types/webrtc';

// WebRTC 配置
export const RTC_CONFIG: RTCConfiguration = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
    { urls: 'stun:stun2.l.google.com:19302' },
    { urls: 'stun:stun3.l.google.com:19302' },
    { urls: 'stun:stun4.l.google.com:19302' }
  ]
};

// 媒体约束配置
export const MEDIA_CONSTRAINTS = {
  audio: {
    echoCancellation: true,
    noiseSuppression: true,
    autoGainControl: true
  },
  video: {
    width: { min: 640, ideal: 1280, max: 1920 },
    height: { min: 480, ideal: 720, max: 1080 },
    frameRate: { min: 15, ideal: 30, max: 60 }
  }
};

// 获取用户媒体流
export async function getUserMedia(constraints: MediaStreamConstraints): Promise<MediaStream> {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    return stream;
  } catch (error) {
    throw new Error(`获取媒体流失败: ${error}`);
  }
}

// 创建 RTCPeerConnection
export function createPeerConnection(
  config: RTCConfiguration = RTC_CONFIG
): RTCPeerConnection {
  return new RTCPeerConnection(config);
}

// 创建 Offer
export async function createOffer(
  peerConnection: RTCPeerConnection
): Promise<RTCSessionDescriptionInit> {
  try {
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    return offer;
  } catch (error) {
    throw new Error(`创建 Offer 失败: ${error}`);
  }
}

// 创建 Answer
export async function createAnswer(
  peerConnection: RTCPeerConnection,
  offer: RTCSessionDescriptionInit
): Promise<RTCSessionDescriptionInit> {
  try {
    await peerConnection.setRemoteDescription(offer);
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    return answer;
  } catch (error) {
    throw new Error(`创建 Answer 失败: ${error}`);
  }
}

// 处理 ICE 候选
export async function handleIceCandidate(
  peerConnection: RTCPeerConnection,
  candidate: RTCIceCandidateInit
): Promise<void> {
  try {
    await peerConnection.addIceCandidate(candidate);
  } catch (error) {
    throw new Error(`处理 ICE 候选失败: ${error}`);
  }
}

// 停止媒体流
export function stopMediaStream(stream: MediaStream): void {
  stream.getTracks().forEach(track => {
    track.stop();
  });
}

// 切换音频状态
export function toggleAudio(stream: MediaStream, muted: boolean): void {
  stream.getAudioTracks().forEach(track => {
    track.enabled = !muted;
  });
}

// 切换视频状态
export function toggleVideo(stream: MediaStream, muted: boolean): void {
  stream.getVideoTracks().forEach(track => {
    track.enabled = !muted;
  });
}

// 获取媒体设备列表
export async function getMediaDevices(): Promise<{
  audioInputs: MediaDeviceInfo[];
  videoInputs: MediaDeviceInfo[];
  audioOutputs: MediaDeviceInfo[];
}> {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    
    return {
      audioInputs: devices.filter(device => device.kind === 'audioinput'),
      videoInputs: devices.filter(device => device.kind === 'videoinput'),
      audioOutputs: devices.filter(device => device.kind === 'audiooutput')
    };
  } catch (error) {
    throw new Error(`获取媒体设备列表失败: ${error}`);
  }
}

// 检查媒体设备可用性
export async function checkMediaDeviceAvailability(): Promise<{
  hasAudio: boolean;
  hasVideo: boolean;
}> {
  try {
    const devices = await getMediaDevices();
    return {
      hasAudio: devices.audioInputs.length > 0,
      hasVideo: devices.videoInputs.length > 0
    };
  } catch (error) {
    console.warn('检查媒体设备可用性失败:', error);
    return { hasAudio: false, hasVideo: false };
  }
}

// 获取媒体流统计信息
export async function getMediaStreamStats(
  peerConnection: RTCPeerConnection
): Promise<RTCStatsReport> {
  try {
    return await peerConnection.getStats();
  } catch (error) {
    throw new Error(`获取媒体流统计信息失败: ${error}`);
  }
}

// 处理连接状态变化
export function handleConnectionStateChange(
  peerConnection: RTCPeerConnection,
  onStateChange: (state: RTCPeerConnectionState) => void
): void {
  peerConnection.onconnectionstatechange = () => {
    onStateChange(peerConnection.connectionState);
  };
}

// 处理 ICE 连接状态变化
export function handleIceConnectionStateChange(
  peerConnection: RTCPeerConnection,
  onStateChange: (state: RTCIceConnectionState) => void
): void {
  peerConnection.oniceconnectionstatechange = () => {
    onStateChange(peerConnection.iceConnectionState);
  };
}

// 转换信令描述格式
export function convertToSignalDescription(description: RTCSessionDescriptionInit): RTCDescription {
  return {
    type: description.type as 'offer' | 'answer',
    sdp: description.sdp || ''
  };
}

// 转换 ICE 候选格式
export function convertToSignalCandidate(candidate: RTCIceCandidate): RTCCandidate {
  return {
    candidate: candidate.candidate,
    sdpMid: candidate.sdpMid || '',
    sdpMLineIndex: candidate.sdpMLineIndex || 0,
    usernameFragment: candidate.usernameFragment || ''
  };
}

// 从信令格式转换回 WebRTC 格式
export function convertFromSignalDescription(description: RTCDescription): RTCSessionDescriptionInit {
  return {
    type: description.type,
    sdp: description.sdp
  };
}

// 从信令格式转换回 ICE 候选格式
export function convertFromSignalCandidate(candidate: RTCCandidate): RTCIceCandidateInit {
  return {
    candidate: candidate.candidate,
    sdpMid: candidate.sdpMid,
    sdpMLineIndex: candidate.sdpMLineIndex,
    usernameFragment: candidate.usernameFragment
  };
}
