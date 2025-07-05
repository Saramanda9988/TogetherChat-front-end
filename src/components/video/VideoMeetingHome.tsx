import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Video, Plus } from 'lucide-react';

const VideoMeetingHome: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex-1 bg-slate-900 flex h-full overflow-hidden">
      {/* 左侧功能区 */}
      <div className="w-96 bg-slate-900 border-r border-slate-700 flex flex-col h-full">
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            <h1 className="text-white text-2xl font-bold mb-8">视频会议</h1>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {/* 发起会议 */}
              <button
                onClick={() => navigate('/meeting/join')}
                className="bg-blue-600 hover:bg-blue-700 rounded-xl p-6 text-white transition-colors group"
              >
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-white/30 transition-colors">
                  <Video className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <h3 className="font-medium mb-1">发起会议</h3>
                </div>
              </button>
              {/* 加入会议 */}
              <button
                onClick={() => navigate('/meeting/join')}
                className="bg-blue-600 hover:bg-blue-700 rounded-xl p-6 text-white transition-colors group"
              >
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-white/30 transition-colors">
                  <Plus className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <h3 className="font-medium mb-1">加入会议</h3>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* 右侧历史记录 */}
      <div className="flex-1 bg-slate-900 flex flex-col h-full">
        <div className="p-6 border-b border-slate-700 flex items-center justify-between flex-shrink-0">
          <h2 className="text-white text-lg font-medium">历史记录</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            <div className="space-y-4">
              {/* 这里可后续插入历史会议组件 */}
              <div className="text-slate-400">暂无历史会议</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoMeetingHome; 