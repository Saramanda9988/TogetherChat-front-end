// WebRTC 相关类型定义
export interface RTCDescription {
  type: 'offer' | 'answer';
  sdp: string;
}

export interface RTCCandidate {
  candidate: string;
  sdpMid: string;
  sdpMLineIndex: number;
  usernameFragment: string;
}

// 信令基类
export interface WSBaseSignalling {
  type: number;
  sourceId: number;
  targetId: number | null;
  meetId: number;
  key: string;
}

// 进入房间信令
export interface WSEntry extends WSBaseSignalling {
  type: 4;
  userId: number;
  userName: string;
  userAvatar: string;
}

// WebRTC Offer 信令
export interface WSOffer extends WSBaseSignalling {
  type: 5;
  description: RTCDescription;
}

// WebRTC Answer 信令
export interface WSAnswer extends WSBaseSignalling {
  type: 6;
  description: RTCDescription;
}

// ICE 候选信息
export interface WSCandidate extends WSBaseSignalling {
  type: 7;
  candidate: RTCCandidate;
}

// 离开房间信令
export interface WSLeave extends WSBaseSignalling {
  type: 8;
}

// 加入房间信令
export interface WSJoin extends WSBaseSignalling {
  type: 10;
}

// 拒绝加入房间信令
export interface WSReject extends WSBaseSignalling {
  type: 11;
}

// 结束房间通话信令
export interface WSCancel extends WSBaseSignalling {
  type: 12;
}

// 用户信息
export interface User {
  id: number;
  username: string;
  avatar?: string;
}

// 会议参与者
export interface Participant {
  user: User;
  stream?: MediaStream;
  peerConnection?: RTCPeerConnection;
  isAudioMuted?: boolean;
  isVideoMuted?: boolean;
}

// 会议状态
export interface MeetingState {
  meetingId: number | null;
  isActive: boolean;
  isInitiator: boolean;
  localStream: MediaStream | null;
  participants: Map<number, Participant>;
  isAudioMuted: boolean;
  isVideoMuted: boolean;
}

// 信令消息包装
export interface WSMessage<T = any> {
  type: number;
  data: T;
}
