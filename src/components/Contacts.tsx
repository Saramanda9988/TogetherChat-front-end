import React, { useState } from 'react';
import { Search, Users, ChevronRight, ChevronDown, UserPlus, Settings, Phone, Video, MessageSquare, Star, Heart, Bot, Smartphone, X } from 'lucide-react';
import { Contact, Group } from '../types';
import Button from './common/Button';
import Input from './common/Input';
import Modal from './common/Modal';
import Avatar from './common/Avatar';

interface ContactGroup {
  [groupName: string]: Contact[];
}

interface GroupData {
  [groupName: string]: Group[];
}

const Contacts: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'friends' | 'groups'>('friends');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(['我的好友', '同事', '特别关心']));
  const [showAddModal, setShowAddModal] = useState(false);
  const [addType, setAddType] = useState<'friend' | 'group'>('friend');
  const [addId, setAddId] = useState('');

  // Mock 好友数据 - 按分组组织
  const [contactGroups] = useState<ContactGroup>({
    '特别关心': [
      {
        id: '1',
        name: '小媛（怡夏）',
        nickname: '小媛',
        avatar: '',
        isOnline: true,
        userId: 'xiaoyuan001',
        department: '产品部',
        signature: '今天也要加油呀！'
      },
      {
        id: '2',
        name: '赵春蕾（昕取...',
        nickname: '春蕾',
        avatar: '',
        isOnline: true,
        userId: 'zhaochunlei',
        department: '设计部',
        signature: '设计改变世界'
      }
    ],
    '我的好友': [
      {
        id: '3',
        name: '蔡依阳（鹿慕...',
        nickname: '依阳',
        avatar: '',
        isOnline: false,
        userId: 'caiyiyang',
        department: '技术部',
        signature: '代码如诗'
      },
      {
        id: '4',
        name: '独酌清月',
        nickname: '清月',
        avatar: '',
        isOnline: false,
        userId: 'duzhuoqingyue',
        department: '运营部',
        signature: '遨游九天，游乐仙境，笑谈红尘'
      },
      {
        id: '5',
        name: '时空印记',
        nickname: '印记',
        avatar: '',
        isOnline: false,
        userId: 'shikongjiyi',
        department: '市场部',
        signature: '在黑暗中...'
      }
    ],
    '朋友': [
      {
        id: '6',
        name: '张三',
        nickname: '小张',
        avatar: '',
        isOnline: true,
        userId: 'zhangsan123',
        department: '财务部',
        signature: '工作使我快乐'
      },
      {
        id: '7',
        name: '李四',
        nickname: '小李',
        avatar: '',
        isOnline: true,
        userId: 'lisi456',
        department: '人事部',
        signature: '每天都是新的开始'
      }
    ],
    '家人': [
      {
        id: '8',
        name: '妈妈',
        nickname: '妈妈',
        avatar: '',
        isOnline: false,
        userId: 'mama001',
        signature: '注意身体，按时吃饭'
      }
    ],
    '同学': [
      {
        id: '9',
        name: '王五',
        nickname: '老王',
        avatar: '',
        isOnline: true,
        userId: 'wangwu789',
        signature: '怀念校园时光'
      },
      {
        id: '10',
        name: '赵六',
        nickname: '小赵',
        avatar: '',
        isOnline: false,
        userId: 'zhaoliu012',
        signature: '奋斗在路上'
      }
    ]
  });

  // Mock 群聊数据
  const [groupData] = useState<GroupData>({
    '我创建的群': [
      {
        id: 'g1',
        name: '技术交流群',
        avatar: '',
        memberCount: 25,
        description: '技术讨论，经验分享'
      },
      {
        id: 'g2',
        name: '项目协作组',
        avatar: '',
        memberCount: 8,
        description: '项目进度跟踪和协作'
      }
    ],
    '我管理的群': [
      {
        id: 'g3',
        name: '部门例会群',
        avatar: '',
        memberCount: 15,
        description: '部门日常沟通'
      }
    ],
    '我加入的群': [
      {
        id: 'g4',
        name: '公司大群',
        avatar: '',
        memberCount: 200,
        description: '公司全员群'
      },
      {
        id: 'g5',
        name: '兴趣爱好群',
        avatar: '',
        memberCount: 45,
        description: '分享生活，交流兴趣'
      },
      {
        id: 'g6',
        name: '学习分享群',
        avatar: '',
        memberCount: 32,
        description: '知识分享，共同进步'
      }
    ]
  });

  const toggleGroupExpansion = (groupName: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupName)) {
      newExpanded.delete(groupName);
    } else {
      newExpanded.add(groupName);
    }
    setExpandedGroups(newExpanded);
  };

  const handleContactClick = (contact: Contact) => {
    setSelectedContact(contact);
    setSelectedGroup(null);
  };

  const handleGroupClick = (group: Group) => {
    setSelectedGroup(group);
    setSelectedContact(null);
  };

  const getContactCount = (groupName: string) => {
    return contactGroups[groupName]?.length || 0;
  };

  const getGroupCount = (groupName: string) => {
    return groupData[groupName]?.length || 0;
  };

  const filteredContactGroups = Object.entries(contactGroups).reduce((acc, [groupName, contacts]) => {
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.nickname?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (filteredContacts.length > 0) {
      acc[groupName] = filteredContacts;
    }
    return acc;
  }, {} as ContactGroup);

  const filteredGroupData = Object.entries(groupData).reduce((acc, [groupName, groups]) => {
    const filteredGroups = groups.filter(group =>
      group.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (filteredGroups.length > 0) {
      acc[groupName] = filteredGroups;
    }
    return acc;
  }, {} as GroupData);

  const handleAddFriend = () => {
    setAddType('friend');
    setShowAddModal(true);
    setAddId('');
  };

  const handleAddGroup = () => {
    setAddType('group');
    setShowAddModal(true);
    setAddId('');
  };

  const handleSubmitAdd = () => {
    if (addId.trim()) {
      console.log(`${addType === 'friend' ? '添加好友' : '加入群组'}: ${addId}`);
      setShowAddModal(false);
      setAddId('');
    }
  };

  return (
    <div className="flex-1 bg-slate-900 dark:bg-slate-900 light:bg-white flex h-full overflow-hidden">
      {/* 左侧联系人列表 */}
      <div className="w-80 bg-slate-900 dark:bg-slate-900 light:bg-white border-r border-slate-700 dark:border-slate-700 light:border-gray-200 flex flex-col h-full overflow-hidden">
        {/* 搜索栏 */}
        <div className="p-4 border-b border-slate-700 dark:border-slate-700 light:border-gray-200 flex-shrink-0">
          <div className="mb-4">
            <Input
              type="text"
              placeholder="搜索"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={Search}
            />
          </div>

          {/* 添加好友/群组按钮 */}
          <div className="flex space-x-2">
            <Button 
              onClick={handleAddFriend}
              variant="secondary"
              className="flex-1"
              icon={UserPlus}
            >
              加好友
            </Button>
            <Button 
              onClick={handleAddGroup}
              variant="secondary"
              className="flex-1"
              icon={Users}
            >
              加群组
            </Button>
          </div>
        </div>

        {/* 标签页切换 */}
        <div className="flex border-b border-slate-700 dark:border-slate-700 light:border-gray-200 flex-shrink-0">
          <button
            onClick={() => setActiveTab('friends')}
            className={`flex-1 py-3 px-4 text-sm font-medium ${
              activeTab === 'friends'
                ? 'text-blue-400 border-b-2 border-blue-400 bg-slate-800 dark:bg-slate-800 light:bg-blue-50'
                : 'text-slate-400 dark:text-slate-400 light:text-gray-600 hover:text-white dark:hover:text-white light:hover:text-gray-900 hover:bg-slate-800 dark:hover:bg-slate-800 light:hover:bg-gray-100'
            }`}
          >
            好友
          </button>
          <button
            onClick={() => setActiveTab('groups')}
            className={`flex-1 py-3 px-4 text-sm font-medium ${
              activeTab === 'groups'
                ? 'text-blue-400 border-b-2 border-blue-400 bg-slate-800 dark:bg-slate-800 light:bg-blue-50'
                : 'text-slate-400 dark:text-slate-400 light:text-gray-600 hover:text-white dark:hover:text-white light:hover:text-gray-900 hover:bg-slate-800 dark:hover:bg-slate-800 light:hover:bg-gray-100'
            }`}
          >
            群聊
          </button>
        </div>

        {/* 联系人/群聊列表 */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'friends' ? (
            <div>
              {Object.entries(filteredContactGroups).map(([groupName, contacts]) => (
                <div key={groupName}>
                  <button
                    onClick={() => toggleGroupExpansion(groupName)}
                    className="w-full p-3 text-left text-slate-300 dark:text-slate-300 light:text-gray-700 hover:bg-slate-800 dark:hover:bg-slate-800 light:hover:bg-gray-100 transition-colors flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      {expandedGroups.has(groupName) ? (
                        <ChevronDown className="w-4 h-4 mr-2" />
                      ) : (
                        <ChevronRight className="w-4 h-4 mr-2" />
                      )}
                      <span>{groupName}</span>
                    </div>
                    <span className="text-slate-500 dark:text-slate-500 light:text-gray-500 text-sm">
                      {getContactCount(groupName)}/{getContactCount(groupName)}
                    </span>
                  </button>

                  {expandedGroups.has(groupName) && (
                    <div className="ml-6">
                      {contacts.map((contact) => (
                        <button
                          key={contact.id}
                          onClick={() => handleContactClick(contact)}
                          className={`w-full p-3 text-left hover:bg-slate-800 dark:hover:bg-slate-800 light:hover:bg-gray-100 transition-colors flex items-center ${
                            selectedContact?.id === contact.id ? 'bg-slate-800 dark:bg-slate-800 light:bg-blue-50' : ''
                          }`}
                        >
                          <Avatar
                            name={contact.name}
                            isOnline={contact.isOnline}
                            size="sm"
                            className="mr-3"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-white dark:text-white light:text-gray-900 text-sm font-medium truncate">{contact.name}</p>
                            <p className="text-slate-400 dark:text-slate-400 light:text-gray-600 text-xs truncate">
                              {contact.isOnline ? '在线' : '离线'}
                              {contact.signature && ` - ${contact.signature}`}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div>
              {Object.entries(filteredGroupData).map(([groupName, groups]) => (
                <div key={groupName}>
                  <button
                    onClick={() => toggleGroupExpansion(groupName)}
                    className="w-full p-3 text-left text-slate-300 dark:text-slate-300 light:text-gray-700 hover:bg-slate-800 dark:hover:bg-slate-800 light:hover:bg-gray-100 transition-colors flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      {expandedGroups.has(groupName) ? (
                        <ChevronDown className="w-4 h-4 mr-2" />
                      ) : (
                        <ChevronRight className="w-4 h-4 mr-2" />
                      )}
                      <span>{groupName}</span>
                    </div>
                    <span className="text-slate-500 dark:text-slate-500 light:text-gray-500 text-sm">
                      {getGroupCount(groupName)}/{getGroupCount(groupName)}
                    </span>
                  </button>

                  {expandedGroups.has(groupName) && (
                    <div className="ml-6">
                      {groups.map((group) => (
                        <button
                          key={group.id}
                          onClick={() => handleGroupClick(group)}
                          className={`w-full p-3 text-left hover:bg-slate-800 dark:hover:bg-slate-800 light:hover:bg-gray-100 transition-colors flex items-center ${
                            selectedGroup?.id === group.id ? 'bg-slate-800 dark:bg-slate-800 light:bg-blue-50' : ''
                          }`}
                        >
                          <Avatar
                            name={group.name}
                            isGroup={true}
                            size="sm"
                            className="mr-3"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-white dark:text-white light:text-gray-900 text-sm font-medium truncate">{group.name}</p>
                            <p className="text-slate-400 dark:text-slate-400 light:text-gray-600 text-xs truncate">
                              {group.memberCount} 人
                              {group.description && ` - ${group.description}`}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 右侧详情页面 */}
      <div className="flex-1 bg-slate-900 dark:bg-slate-900 light:bg-white flex flex-col h-full">
        {selectedContact ? (
          <div className="flex-1 flex flex-col">
            {/* 用户信息头部 */}
            <div className="p-8 border-b border-slate-700 dark:border-slate-700 light:border-gray-200 text-center flex-shrink-0">
              <Avatar
                name={selectedContact.name}
                isOnline={selectedContact.isOnline}
                size="xl"
                className="mx-auto mb-4"
              />
              <h2 className="text-white dark:text-white light:text-gray-900 text-2xl font-bold mb-2">{selectedContact.nickname || selectedContact.name}</h2>
              <p className="text-slate-400 dark:text-slate-400 light:text-gray-600 mb-4">用户ID: {selectedContact.userId}</p>
              <div className="flex items-center justify-center mb-6">
                <div className={`w-2 h-2 rounded-full mr-2 ${selectedContact.isOnline ? 'bg-green-400' : 'bg-slate-500'}`}></div>
                <span className="text-slate-400 dark:text-slate-400 light:text-gray-600">{selectedContact.isOnline ? '在线' : '离线'}</span>
              </div>

              {/* 操作按钮 */}
              <div className="flex items-center justify-center space-x-4">
                <Button variant="secondary">分享</Button>
                <Button variant="secondary">音视频通话</Button>
                <Button>发消息</Button>
              </div>
            </div>

            {/* 详细信息 */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                {/* 备注 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-slate-400 dark:text-slate-400 light:text-gray-600 mr-3">📝</span>
                    <span className="text-white dark:text-white light:text-gray-900">备注</span>
                  </div>
                  <button className="text-slate-400 dark:text-slate-400 light:text-gray-600 hover:text-white dark:hover:text-white light:hover:text-gray-900">
                    设置好友备注
                  </button>
                </div>

                {/* 好友分组 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-slate-400 dark:text-slate-400 light:text-gray-600 mr-3">👥</span>
                    <span className="text-white dark:text-white light:text-gray-900">好友分组</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-slate-400 dark:text-slate-400 light:text-gray-600 mr-2">我的好友</span>
                    <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-400 light:text-gray-600" />
                  </div>
                </div>

                {/* 昵称 */}
                {selectedContact.nickname && (
                  <div className="flex items-start">
                    <span className="text-slate-400 dark:text-slate-400 light:text-gray-600 mr-3 mt-1">🏷️</span>
                    <div>
                      <div className="text-white dark:text-white light:text-gray-900 mb-1">昵称</div>
                      <div className="text-slate-300 dark:text-slate-300 light:text-gray-700">{selectedContact.nickname}</div>
                    </div>
                  </div>
                )}

                {/* 签名 */}
                <div className="flex items-start">
                  <span className="text-slate-400 dark:text-slate-400 light:text-gray-600 mr-3 mt-1">✏️</span>
                  <div>
                    <div className="text-white dark:text-white light:text-gray-900 mb-1">签名</div>
                    <div className="text-slate-300 dark:text-slate-300 light:text-gray-700">{selectedContact.signature || '这个人很懒，什么都没留下'}</div>
                  </div>
                </div>

                {/* 部门信息 */}
                {selectedContact.department && (
                  <div className="flex items-start">
                    <span className="text-slate-400 dark:text-slate-400 light:text-gray-600 mr-3 mt-1">🏢</span>
                    <div>
                      <div className="text-white dark:text-white light:text-gray-900 mb-1">部门</div>
                      <div className="text-slate-300 dark:text-slate-300 light:text-gray-700">{selectedContact.department}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : selectedGroup ? (
          <div className="flex-1 flex flex-col">
            {/* 群组信息头部 */}
            <div className="p-8 border-b border-slate-700 dark:border-slate-700 light:border-gray-200 text-center flex-shrink-0">
              <Avatar
                name={selectedGroup.name}
                isGroup={true}
                size="xl"
                className="mx-auto mb-4"
              />
              <h2 className="text-white dark:text-white light:text-gray-900 text-2xl font-bold mb-2">{selectedGroup.name}</h2>
              <p className="text-slate-400 dark:text-slate-400 light:text-gray-600 mb-4">{selectedGroup.memberCount} 位成员</p>
              
              {selectedGroup.description && (
                <p className="text-slate-300 dark:text-slate-300 light:text-gray-700 mb-6">{selectedGroup.description}</p>
              )}

              {/* 操作按钮 */}
              <div className="flex items-center justify-center space-x-4">
                <Button variant="secondary">群设置</Button>
                <Button>发消息</Button>
              </div>
            </div>

            {/* 群组详细信息 */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-slate-400 dark:text-slate-400 light:text-gray-600 mr-3">👥</span>
                    <span className="text-white dark:text-white light:text-gray-900">群成员</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-slate-400 dark:text-slate-400 light:text-gray-600 mr-2">{selectedGroup.memberCount} 人</span>
                    <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-400 light:text-gray-600" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-slate-400 dark:text-slate-400 light:text-gray-600 mr-3">📁</span>
                    <span className="text-white dark:text-white light:text-gray-900">群文件</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-400 light:text-gray-600" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-slate-400 dark:text-slate-400 light:text-gray-600 mr-3">📷</span>
                    <span className="text-white dark:text-white light:text-gray-900">群相册</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-400 light:text-gray-600" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-slate-400 dark:text-slate-400 light:text-gray-500">
              <Users className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg">选择一个联系人查看详情</p>
            </div>
          </div>
        )}
      </div>

      {/* 添加好友/群组弹窗 */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title={addType === 'friend' ? '添加好友' : '加入群组'}
        footer={
          <>
            <Button variant="ghost" onClick={() => setShowAddModal(false)}>
              取消
            </Button>
            <Button
              onClick={handleSubmitAdd}
              disabled={!addId.trim()}
            >
              {addType === 'friend' ? '添加' : '加入'}
            </Button>
          </>
        }
      >
        <div>
          <label className="block text-slate-400 dark:text-slate-400 light:text-gray-600 text-sm mb-2">
            {addType === 'friend' ? '用户ID' : '群组ID'}
          </label>
          <Input
            type="text"
            value={addId}
            onChange={(e) => setAddId(e.target.value)}
            placeholder={`请输入${addType === 'friend' ? '用户' : '群组'}ID`}
          />
        </div>
      </Modal>
    </div>
  );
};

export default Contacts;