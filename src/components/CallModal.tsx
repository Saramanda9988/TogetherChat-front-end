import React from 'react';
import { Phone, PhoneOff, Video, VideoOff, Mic, MicOff, Users } from 'lucide-react';
import { useWebRTC } from '../hooks/useWebRTC';

interface CallModalProps {
  isOpen: boolean;
  onClose: () => void;
  callerName: string;
  isVideoCall: boolean;
  isIncoming?: boolean;
}

const CallModal: React.FC<CallModalProps> = ({
  isOpen,
  onClose,
  callerName,
  isVideoCall,
  isIncoming = false,
}) => {
  const {
    isCallActive,
    isVideoEnabled,
    isAudioEnabled,
    localVideoRef,
    remoteVideoRef,
    startCall,
    endCall,
    toggleVideo,
    toggleAudio,
  } = useWebRTC();

  if (!isOpen) return null;

  const handleAcceptCall = () => {
    startCall();
  };

  const handleEndCall = () => {
    endCall();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-slate-900 rounded-lg p-6 w-full max-w-4xl h-3/4 flex flex-col">
        {/* Call Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium mr-3">
              {callerName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="text-white text-lg font-medium">{callerName}</h3>
              <p className="text-slate-400 text-sm">
                {isCallActive 
                  ? '通话中...' 
                  : isIncoming 
                    ? `来电 - ${isVideoCall ? '视频通话' : '语音通话'}` 
                    : '正在连接...'
                }
              </p>
            </div>
          </div>
          <button className="p-2 text-slate-400 hover:text-white">
            <Users className="w-5 h-5" />
          </button>
        </div>

        {/* Video Area */}
        <div className="flex-1 relative bg-slate-800 rounded-lg overflow-hidden">
          {isVideoCall && isCallActive ? (
            <>
              {/* Remote Video */}
              <video
                ref={remoteVideoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
              
              {/* Local Video */}
              <div className="absolute top-4 right-4 w-48 h-36 bg-slate-700 rounded-lg overflow-hidden">
                <video
                  ref={localVideoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="w-32 h-32 bg-blue-500 rounded-full flex items-center justify-center text-white text-4xl font-medium mx-auto mb-4">
                  {callerName.charAt(0).toUpperCase()}
                </div>
                <h3 className="text-white text-xl font-medium">{callerName}</h3>
              </div>
            </div>
          )}
        </div>

        {/* Call Controls */}
        <div className="flex items-center justify-center space-x-4 mt-6">
          {isCallActive ? (
            <>
              <button
                onClick={toggleAudio}
                className={`p-4 rounded-full transition-colors ${
                  isAudioEnabled 
                    ? 'bg-slate-700 text-white hover:bg-slate-600' 
                    : 'bg-red-500 text-white hover:bg-red-600'
                }`}
              >
                {isAudioEnabled ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
              </button>
              
              {isVideoCall && (
                <button
                  onClick={toggleVideo}
                  className={`p-4 rounded-full transition-colors ${
                    isVideoEnabled 
                      ? 'bg-slate-700 text-white hover:bg-slate-600' 
                      : 'bg-red-500 text-white hover:bg-red-600'
                  }`}
                >
                  {isVideoEnabled ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
                </button>
              )}
              
              <button
                onClick={handleEndCall}
                className="p-4 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              >
                <PhoneOff className="w-6 h-6" />
              </button>
            </>
          ) : isIncoming ? (
            <>
              <button
                onClick={handleEndCall}
                className="p-4 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              >
                <PhoneOff className="w-6 h-6" />
              </button>
              <button
                onClick={handleAcceptCall}
                className="p-4 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
              >
                <Phone className="w-6 h-6" />
              </button>
            </>
          ) : (
            <button
              onClick={handleAcceptCall}
              className="p-4 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
            >
              <Phone className="w-6 h-6" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CallModal;