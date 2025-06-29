import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Plus, Search, Settings } from 'lucide-react';
import { TodoItem } from '../types';
import Button from './common/Button';
import Input from './common/Input';
import Modal from './common/Modal';

interface CalendarProps {}

const Calendar: React.FC<CalendarProps> = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('week');
  const [selectedTodo, setSelectedTodo] = useState<TodoItem | null>(null);
  const [showTodoDetail, setShowTodoDetail] = useState(false);

  // Mock 待办事项数据
  const [todos] = useState<TodoItem[]>([
    {
      id: '1',
      title: '团队周会',
      date: '2025-06-23',
      time: '10:00',
      location: '会议室A',
      participants: ['张三', '李四', '王五'],
      description: '讨论本周工作进展和下周计划',
      type: 'meeting',
      priority: 'high'
    },
    {
      id: '2',
      title: '产品评审',
      date: '2025-06-24',
      time: '14:00',
      location: '线上会议',
      participants: ['产品经理', '开发团队'],
      description: '新功能需求评审',
      type: 'meeting',
      priority: 'medium'
    },
    {
      id: '3',
      title: '代码审查',
      date: '2025-06-25',
      time: '15:30',
      location: '开发区',
      participants: ['技术负责人'],
      description: '审查本周提交的代码',
      type: 'task',
      priority: 'medium'
    },
    {
      id: '4',
      title: '客户演示',
      date: '2025-06-26',
      time: '16:00',
      location: '演示厅',
      participants: ['销售团队', '客户'],
      description: '向客户展示新功能',
      type: 'event',
      priority: 'high'
    },
    {
      id: '5',
      title: '技术分享',
      date: '2025-06-28',
      time: '15:27',
      location: '大会议室',
      participants: ['全体技术人员'],
      description: 'React 18新特性分享',
      type: 'event',
      priority: 'low'
    }
  ]);

  // 获取当前周的日期范围
  const getWeekDates = (date: Date) => {
    const start = new Date(date);
    const day = start.getDay();
    const diff = start.getDate() - day + (day === 0 ? -6 : 1); // 周一开始
    start.setDate(diff);
    
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(start);
      currentDate.setDate(start.getDate() + i);
      dates.push(currentDate);
    }
    return dates;
  };

  // 获取月份的所有日期
  const getMonthDates = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    const endDate = new Date(lastDay);
    
    // 调整到周一开始
    const startDay = startDate.getDay();
    startDate.setDate(startDate.getDate() - (startDay === 0 ? 6 : startDay - 1));
    
    const dates = [];
    const current = new Date(startDate);
    
    while (current <= endDate || dates.length % 7 !== 0) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    
    return dates;
  };

  // 检查日期是否有待办事项
  const hasEvents = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return todos.some(todo => todo.date === dateStr);
  };

  // 获取指定日期的待办事项
  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return todos.filter(todo => todo.date === dateStr);
  };

  // 生成时间槽
  const timeSlots = [];
  for (let hour = 0; hour < 24; hour++) {
    timeSlots.push(`${hour.toString().padStart(2, '0')}:00`);
  }

  const weekDates = getWeekDates(currentDate);
  const monthDates = getMonthDates(currentDate);

  const formatDateRange = () => {
    if (viewMode === 'week') {
      const start = weekDates[0];
      const end = weekDates[6];
      return `${start.getFullYear()}年${start.getMonth() + 1}月${start.getDate()}日 - ${end.getDate()}日`;
    }
    return `${currentDate.getFullYear()}年${currentDate.getMonth() + 1}月`;
  };

  const handleTodoClick = (todo: TodoItem) => {
    setSelectedTodo(todo);
    setShowTodoDetail(true);
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (viewMode === 'week') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    } else {
      newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    }
    setCurrentDate(newDate);
  };

  return (
    <div className="flex-1 bg-slate-900 dark:bg-slate-900 light:bg-white flex">
      {/* 左侧日历 */}
      <div className="w-80 bg-slate-900 dark:bg-slate-900 light:bg-white border-r border-slate-700 dark:border-slate-700 light:border-gray-200 flex flex-col">
        {/* 日历头部 */}
        <div className="p-4 border-b border-slate-700 dark:border-slate-700 light:border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white dark:text-white light:text-gray-900 text-lg font-medium">
              {currentDate.getFullYear()}年{currentDate.getMonth() + 1}月
            </h2>
            <div className="flex items-center space-x-1">
              <button
                onClick={() => navigateDate('prev')}
                className="p-1 text-slate-400 dark:text-slate-400 light:text-gray-600 hover:text-white dark:hover:text-white light:hover:text-gray-900 hover:bg-slate-700 dark:hover:bg-slate-700 light:hover:bg-gray-100 rounded"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigateDate('next')}
                className="p-1 text-slate-400 dark:text-slate-400 light:text-gray-600 hover:text-white dark:hover:text-white light:hover:text-gray-900 hover:bg-slate-700 dark:hover:bg-slate-700 light:hover:bg-gray-100 rounded"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 月份小日历 */}
          <div className="grid grid-cols-7 gap-1 text-xs">
            {['日', '一', '二', '三', '四', '五', '六'].map(day => (
              <div key={day} className="text-center text-slate-400 dark:text-slate-400 light:text-gray-600 py-2 font-medium">
                {day}
              </div>
            ))}
            {monthDates.map((date, index) => {
              const isCurrentMonth = date.getMonth() === currentDate.getMonth();
              const isToday = date.toDateString() === new Date().toDateString();
              const isSelected = date.toDateString() === selectedDate.toDateString();
              const hasEvent = hasEvents(date);
              
              return (
                <button
                  key={index}
                  onClick={() => setSelectedDate(date)}
                  className={`relative h-8 text-center rounded transition-colors ${
                    isSelected
                      ? 'bg-blue-500 text-white'
                      : isToday
                      ? 'bg-blue-500/20 text-blue-400'
                      : isCurrentMonth
                      ? 'text-slate-300 dark:text-slate-300 light:text-gray-700 hover:bg-slate-700 dark:hover:bg-slate-700 light:hover:bg-gray-100'
                      : 'text-slate-600 dark:text-slate-600 light:text-gray-400'
                  }`}
                >
                  {date.getDate()}
                  {hasEvent && (
                    <div className="absolute bottom-0.5 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-red-500 rounded-full"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 搜索框 */}
        <div className="p-4 border-b border-slate-700 dark:border-slate-700 light:border-gray-200">
          <Input
            type="text"
            placeholder="搜索联系人、公共日历"
            icon={Search}
          />
        </div>

        {/* 日历列表 */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <button className="flex items-center w-full text-left text-blue-400 hover:bg-slate-800 dark:hover:bg-slate-800 light:hover:bg-gray-100 rounded p-2 mb-2">
              <Plus className="w-4 h-4 mr-2" />
              <span className="text-sm">添加日历</span>
            </button>
            
            <div className="space-y-1">
              <div className="text-slate-400 dark:text-slate-400 light:text-gray-600 text-xs font-medium mb-2">我管理的</div>
              
              <label className="flex items-center p-2 hover:bg-slate-800 dark:hover:bg-slate-800 light:hover:bg-gray-100 rounded cursor-pointer">
                <input type="checkbox" defaultChecked className="mr-3 accent-yellow-500" />
                <span className="text-slate-300 dark:text-slate-300 light:text-gray-700 text-sm">黄链 Official</span>
              </label>
              
              <label className="flex items-center p-2 hover:bg-slate-800 dark:hover:bg-slate-800 light:hover:bg-gray-100 rounded cursor-pointer">
                <input type="checkbox" defaultChecked className="mr-3 accent-green-500" />
                <span className="text-slate-300 dark:text-slate-300 light:text-gray-700 text-sm">我的日程</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* 右侧主要内容区域 */}
      <div className="flex-1 flex flex-col">
        {/* 顶部工具栏 */}
        <div className="h-16 bg-slate-800 dark:bg-slate-800 light:bg-gray-100 border-b border-slate-700 dark:border-slate-700 light:border-gray-200 flex items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {['day', 'week', 'month'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode as any)}
                  className={`px-3 py-1 rounded text-sm ${
                    viewMode === mode 
                      ? 'bg-blue-500 text-white' 
                      : 'text-slate-400 dark:text-slate-400 light:text-gray-600 hover:text-white dark:hover:text-white light:hover:text-gray-900'
                  }`}
                >
                  {mode === 'day' ? '日' : mode === 'week' ? '周' : '月'}
                </button>
              ))}
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => navigateDate('prev')}
                className="p-1 text-slate-400 dark:text-slate-400 light:text-gray-600 hover:text-white dark:hover:text-white light:hover:text-gray-900 hover:bg-slate-700 dark:hover:bg-slate-700 light:hover:bg-gray-100 rounded"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => navigateDate('next')}
                className="p-1 text-slate-400 dark:text-slate-400 light:text-gray-600 hover:text-white dark:hover:text-white light:hover:text-gray-900 hover:bg-slate-700 dark:hover:bg-slate-700 light:hover:bg-gray-100 rounded"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <span className="text-white dark:text-white light:text-gray-900 font-medium">{formatDateRange()}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button>创建日程</Button>
            <Button variant="ghost" size="sm">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* 时间表格 */}
        <div className="flex-1 overflow-auto">
          <div className="min-w-full">
            {/* 表头 */}
            <div className="sticky top-0 bg-slate-800 dark:bg-slate-800 light:bg-gray-100 border-b border-slate-700 dark:border-slate-700 light:border-gray-200 z-10">
              <div className="flex">
                <div className="w-20 p-3 text-xs text-slate-400 dark:text-slate-400 light:text-gray-600 font-medium">GMT+8</div>
                {weekDates.map((date, index) => {
                  const isToday = date.toDateString() === new Date().toDateString();
                  const dayNames = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
                  
                  return (
                    <div key={index} className="flex-1 p-3 text-center border-l border-slate-700 dark:border-slate-700 light:border-gray-200">
                      <div className={`text-xs ${isToday ? 'text-blue-400' : 'text-slate-400 dark:text-slate-400 light:text-gray-600'}`}>
                        {dayNames[date.getDay()]}
                      </div>
                      <div className={`text-lg font-medium ${isToday ? 'text-blue-400' : 'text-white dark:text-white light:text-gray-900'}`}>
                        {date.getDate()}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 时间网格 */}
            <div className="relative">
              {timeSlots.map((time, timeIndex) => (
                <div key={timeIndex} className="flex border-b border-slate-800 dark:border-slate-800 light:border-gray-100">
                  <div className="w-20 p-2 text-xs text-slate-400 dark:text-slate-400 light:text-gray-600 text-right">
                    {time}
                  </div>
                  {weekDates.map((date, dateIndex) => {
                    const dateStr = date.toISOString().split('T')[0];
                    const eventsForSlot = todos.filter(todo => {
                      const todoHour = parseInt(todo.time.split(':')[0]);
                      return todo.date === dateStr && todoHour === timeIndex;
                    });

                    return (
                      <div key={dateIndex} className="flex-1 min-h-[50px] border-l border-slate-800 dark:border-slate-800 light:border-gray-100 relative">
                        {eventsForSlot.map((todo) => (
                          <div
                            key={todo.id}
                            onClick={() => handleTodoClick(todo)}
                            className={`absolute left-1 right-1 top-1 p-2 rounded text-xs cursor-pointer transition-colors ${
                              todo.priority === 'high'
                                ? 'bg-red-500/20 border border-red-500/50 text-red-300'
                                : todo.priority === 'medium'
                                ? 'bg-yellow-500/20 border border-yellow-500/50 text-yellow-300'
                                : 'bg-blue-500/20 border border-blue-500/50 text-blue-300'
                            } hover:opacity-80`}
                          >
                            <div className="font-medium truncate">{todo.title}</div>
                            <div className="text-xs opacity-75">{todo.time}</div>
                            {todo.location && (
                              <div className="text-xs opacity-75 truncate">{todo.location}</div>
                            )}
                          </div>
                        ))}
                        
                        {/* 当前时间指示器 */}
                        {date.toDateString() === new Date().toDateString() && 
                         timeIndex === new Date().getHours() && (
                          <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-red-500 z-20">
                            <div className="absolute -left-1 -top-1 w-2 h-2 bg-red-500 rounded-full"></div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 待办事项详情弹窗 */}
      {selectedTodo && (
        <Modal
          isOpen={showTodoDetail}
          onClose={() => setShowTodoDetail(false)}
          title="事件详情"
          footer={
            <>
              <Button variant="ghost" onClick={() => setShowTodoDetail(false)}>
                关闭
              </Button>
              <Button>编辑</Button>
            </>
          }
        >
          <div className="space-y-4">
            <div>
              <label className="block text-slate-400 dark:text-slate-400 light:text-gray-600 text-sm mb-1">标题</label>
              <p className="text-white dark:text-white light:text-gray-900">{selectedTodo.title}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 dark:text-slate-400 light:text-gray-600 text-sm mb-1">日期</label>
                <p className="text-white dark:text-white light:text-gray-900">{selectedTodo.date}</p>
              </div>
              <div>
                <label className="block text-slate-400 dark:text-slate-400 light:text-gray-600 text-sm mb-1">时间</label>
                <p className="text-white dark:text-white light:text-gray-900">{selectedTodo.time}</p>
              </div>
            </div>
            
            {selectedTodo.location && (
              <div>
                <label className="block text-slate-400 dark:text-slate-400 light:text-gray-600 text-sm mb-1">地点</label>
                <p className="text-white dark:text-white light:text-gray-900">{selectedTodo.location}</p>
              </div>
            )}
            
            {selectedTodo.participants && selectedTodo.participants.length > 0 && (
              <div>
                <label className="block text-slate-400 dark:text-slate-400 light:text-gray-600 text-sm mb-1">参与人员</label>
                <p className="text-white dark:text-white light:text-gray-900">{selectedTodo.participants.join(', ')}</p>
              </div>
            )}
            
            {selectedTodo.description && (
              <div>
                <label className="block text-slate-400 dark:text-slate-400 light:text-gray-600 text-sm mb-1">备注</label>
                <p className="text-white dark:text-white light:text-gray-900">{selectedTodo.description}</p>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Calendar;