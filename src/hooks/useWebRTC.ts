import { useState, useRef, useCallback } from 'react';

interface WebRTCState {
  isCallActive: boolean;
  isVideoEnabled: boolean;
  isAudioEnabled: boolean;
  remoteStream: MediaStream | null;
  localStream: MediaStream | null;
}

export const useWebRTC = () => {
  const [state, setState] = useState<WebRTCState>({
    isCallActive: false,
    isVideoEnabled: true,
    isAudioEnabled: true,
    remoteStream: null,
    localStream: null,
  });

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnection = useRef<RTCPeerConnection | null>(null);

  const initializeWebRTC = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      setState(prev => ({ ...prev, localStream: stream }));

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      // Initialize peer connection
      peerConnection.current = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
      });

      // Add local stream to peer connection
      stream.getTracks().forEach(track => {
        peerConnection.current?.addTrack(track, stream);
      });

      // Handle remote stream
      peerConnection.current.ontrack = (event) => {
        setState(prev => ({ ...prev, remoteStream: event.streams[0] }));
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = event.streams[0];
        }
      };

    } catch (error) {
      console.error('Error accessing media devices:', error);
    }
  }, []);

  const startCall = useCallback(async () => {
    await initializeWebRTC();
    setState(prev => ({ ...prev, isCallActive: true }));
  }, [initializeWebRTC]);

  const endCall = useCallback(() => {
    if (state.localStream) {
      state.localStream.getTracks().forEach(track => track.stop());
    }

    if (peerConnection.current) {
      peerConnection.current.close();
      peerConnection.current = null;
    }

    setState({
      isCallActive: false,
      isVideoEnabled: true,
      isAudioEnabled: true,
      remoteStream: null,
      localStream: null,
    });
  }, [state.localStream]);

  const toggleVideo = useCallback(() => {
    if (state.localStream) {
      const videoTrack = state.localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !state.isVideoEnabled;
        setState(prev => ({ ...prev, isVideoEnabled: !prev.isVideoEnabled }));
      }
    }
  }, [state.localStream, state.isVideoEnabled]);

  const toggleAudio = useCallback(() => {
    if (state.localStream) {
      const audioTrack = state.localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !state.isAudioEnabled;
        setState(prev => ({ ...prev, isAudioEnabled: !prev.isAudioEnabled }));
      }
    }
  }, [state.localStream, state.isAudioEnabled]);

  return {
    ...state,
    localVideoRef,
    remoteVideoRef,
    startCall,
    endCall,
    toggleVideo,
    toggleAudio,
  };
};