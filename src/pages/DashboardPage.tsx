import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { useWebRTCMeeting } from '../hooks/useWebRTCMeeting';
import { Button, Card, Modal, Input } from '../components/ui';

export function DashboardPage() {
  const { authState, logout } = useAuthContext();
  const { startMeeting, loading } = useWebRTCMeeting();
  const navigate = useNavigate();
  
  const [showStartMeetingModal, setShowStartMeetingModal] = useState(false);
  const [showJoinMeetingModal, setShowJoinMeetingModal] = useState(false);
  const [meetingId, setMeetingId] = useState('');
  const [receiverIds, setReceiverIds] = useState('');
  const [error, setError] = useState('');

  const handleStartMeeting = async () => {
    if (!receiverIds.trim()) {
      setError('请输入参与者ID');
      return;
    }

    try {
      const ids = receiverIds.split(',').map(id => parseInt(id.trim(), 10)).filter(id => !isNaN(id));
      if (ids.length === 0) {
        setError('请输入有效的参与者ID');
        return;
      }

      await startMeeting(ids, 2); // 视频通话
      setShowStartMeetingModal(false);
      navigate('/meeting');
    } catch (error) {
      setError('发起会议失败');
    }
  };

  const handleJoinMeeting = () => {
    if (!meetingId.trim()) {
      setError('请输入会议ID');
      return;
    }

    const id = parseInt(meetingId.trim(), 10);
    if (isNaN(id)) {
      setError('请输入有效的会议ID');
      return;
    }

    setShowJoinMeetingModal(false);
    navigate(`/meeting/${id}`);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部导航 */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">TogetherChat</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                {authState.user?.avatar ? (
                  <img 
                    src={authState.user.avatar} 
                    alt={authState.user.username}
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                    <span className="text-sm font-medium text-white">
                      {authState.user?.username?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <span className="text-sm font-medium text-gray-700">
                  {authState.user?.username}
                </span>
              </div>
              <Button variant="secondary" onClick={handleLogout}>
                退出登录
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* 主要内容 */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 快速操作卡片 */}
            <Card
              title="视频会议"
              description="发起或加入视频会议"
              className="hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="space-y-4">
                <Button
                  className="w-full"
                  onClick={() => setShowStartMeetingModal(true)}
                  loading={loading}
                >
                  发起会议
                </Button>
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() => setShowJoinMeetingModal(true)}
                >
                  加入会议
                </Button>
              </div>
            </Card>

            {/* 最近会议 */}
            <Card
              title="最近会议"
              description="查看最近的会议记录"
            >
              <div className="text-center text-gray-500 py-8">
                <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13 2.05V5l3-3-3-3v2.05c-5.05.5-9 4.76-9 9.95 0 5.52 4.48 10 10 10s10-4.48 10-10c0-5.19-3.95-9.45-9-9.95zM12 19c-3.87 0-7-3.13-7-7 0-3.53 2.61-6.43 6-6.93V8l4-4-4-4v2.93c-4.94.5-9 4.76-9 9.95 0 5.52 4.48 10 10 10z"/>
                </svg>
                <p className="text-sm">暂无会议记录</p>
              </div>
            </Card>

            {/* 设置 */}
            <Card
              title="设置"
              description="音视频设备设置"
            >
              <div className="space-y-3">
                <Button variant="secondary" className="w-full" size="sm">
                  摄像头设置
                </Button>
                <Button variant="secondary" className="w-full" size="sm">
                  麦克风设置
                </Button>
                <Button variant="secondary" className="w-full" size="sm">
                  扬声器设置
                </Button>
              </div>
            </Card>
          </div>

          {/* 使用说明 */}
          <Card className="mt-8" title="使用说明">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">发起会议</h4>
                <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1">
                  <li>点击"发起会议"按钮</li>
                  <li>输入要邀请的用户ID（用逗号分隔多个ID）</li>
                  <li>点击确认，等待其他用户加入</li>
                </ol>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">加入会议</h4>
                <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1">
                  <li>点击"加入会议"按钮</li>
                  <li>输入会议ID</li>
                  <li>点击确认加入会议</li>
                </ol>
              </div>
            </div>
          </Card>
        </div>
      </main>

      {/* 发起会议模态框 */}
      <Modal
        isOpen={showStartMeetingModal}
        onClose={() => {
          setShowStartMeetingModal(false);
          setError('');
          setReceiverIds('');
        }}
        title="发起视频会议"
      >
        <div className="space-y-4">
          <Input
            label="参与者用户ID"
            value={receiverIds}
            onChange={(e) => setReceiverIds(e.target.value)}
            placeholder="请输入用户ID，多个ID用逗号分隔，例如: 123,456,789"
            helperText="输入要邀请加入会议的用户ID"
            error={error}
          />
          
          <div className="flex space-x-3">
            <Button
              variant="secondary"
              className="flex-1"
              onClick={() => {
                setShowStartMeetingModal(false);
                setError('');
                setReceiverIds('');
              }}
            >
              取消
            </Button>
            <Button
              className="flex-1"
              onClick={handleStartMeeting}
              loading={loading}
            >
              发起会议
            </Button>
          </div>
        </div>
      </Modal>

      {/* 加入会议模态框 */}
      <Modal
        isOpen={showJoinMeetingModal}
        onClose={() => {
          setShowJoinMeetingModal(false);
          setError('');
          setMeetingId('');
        }}
        title="加入会议"
      >
        <div className="space-y-4">
          <Input
            label="会议ID"
            value={meetingId}
            onChange={(e) => setMeetingId(e.target.value)}
            placeholder="请输入会议ID"
            error={error}
          />
          
          <div className="flex space-x-3">
            <Button
              variant="secondary"
              className="flex-1"
              onClick={() => {
                setShowJoinMeetingModal(false);
                setError('');
                setMeetingId('');
              }}
            >
              取消
            </Button>
            <Button
              className="flex-1"
              onClick={handleJoinMeeting}
            >
              加入会议
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
