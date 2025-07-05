import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import VideoMeetingHome from '../components/video/VideoMeetingHome';
import VideoMeetingJoin from '../components/video/VideoMeetingJoin';
import VideoMeetingRoom from '../components/video/VideoMeetingRoom';

const VideoMeetingPage: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<VideoMeetingHome />} />
      <Route path="/join/:meetId?" element={<VideoMeetingJoin />} />
      <Route path="/room/:meetId" element={<VideoMeetingRoom />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default VideoMeetingPage; 