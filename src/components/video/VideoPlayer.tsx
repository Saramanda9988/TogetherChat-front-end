import { forwardRef } from 'react';

// 视频播放器组件属性
interface VideoPlayerProps {
  stream?: MediaStream;
  muted?: boolean;
  className?: string;
  placeholder?: string;
}

// 视频播放器组件
export const VideoPlayer = forwardRef<HTMLVideoElement, VideoPlayerProps>(
  ({ stream, muted = false, className = '', placeholder = '等待视频流...' }, ref) => {
    return (
      <div className={`relative bg-gray-900 rounded-lg overflow-hidden ${className}`}>
        <video
          ref={ref}
          autoPlay
          playsInline
          muted={muted}
          className="w-full h-full object-cover"
          style={{
            display: stream ? 'block' : 'none'
          }}
        />
        {!stream && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-600 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 9V6a4 4 0 0 0-8 0v3H6v4c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V9h-2zm-6 0V6a2 2 0 0 1 4 0v3H10z"/>
                </svg>
              </div>
              <p className="text-sm text-gray-300">{placeholder}</p>
            </div>
          </div>
        )}
      </div>
    );
  }
);

VideoPlayer.displayName = 'VideoPlayer';
