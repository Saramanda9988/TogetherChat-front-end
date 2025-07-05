import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import Input from '../common/Input';

const VideoMeetingJoin: React.FC = () => {
  const [meetingId, setMeetingId] = useState('');
  const navigate = useNavigate();
  return (
    <div className="flex-1 bg-slate-900 flex items-center justify-center h-full">
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 w-full max-w-md">
        <h2 className="text-white text-xl font-medium mb-6 text-center">加入会议</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-slate-400 text-sm mb-2">会议号</label>
            <Input
              type="text"
              value={meetingId}
              onChange={e => setMeetingId(e.target.value)}
              placeholder="请输入会议号"
            />
          </div>
          <div className="flex items-center space-x-4 pt-4">
            <Button variant="ghost" onClick={() => navigate('/meeting')} className="flex-1">取消</Button>
            <Button
              onClick={() => meetingId.trim() && navigate(`/meeting/room/${meetingId.trim()}`)}
              disabled={!meetingId.trim()}
              className="flex-1"
            >
              加入会议
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoMeetingJoin; 