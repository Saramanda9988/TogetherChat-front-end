import type { ChatMessageRequest } from "./models/ChatMessageRequest";
import type { ChatMessageResponse } from "./models/ChatMessageResponse";
import { getLocalStorageValue } from "@/hooks/useLocalStorage";
import { formatLocalDateTime } from "@/utils/dataUtil";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useRef, useState } from "react";
import { useImmer } from "use-immer";

// type WsMessageType =
//     | 2 // 心跳
//     | 3 // 聊天消息
//     | 4 // 聊天消息同步

interface WsMessage<T> {
  type: number;
  data?: T;
}

export interface WebsocketUtils {
  connect: () => void;
  send: (request: ChatMessageRequest) => void;
  getTempMessagesByRoomId: (roomId: number, cleanTemp: boolean) => ChatMessageResponse[];
  isConnected: () => boolean;
  messagesNumber: Record<number, number>; // roomId to messagesNumber,统计到目前为止接受了多少条新消息,用于通知下游组件接受到了新消息
  unreadMessagesNumber: Record<number, number>; // 存储未读消息数
  updateUnreadMessagesNumber: (roomId: number, newNumber: number,) => void;
}

const WS_URL = (import.meta as any).env?.VITE_API_WS_URL as string || "ws://localhost:8090";
// const WS_URL = "ws://39.103.58.31:8090"
export function useWebSocket() {
  // let token = "-1"
  const wsRef = useRef<WebSocket | null>(null);
  const isConnected = () => wsRef.current?.readyState === WebSocket.OPEN;

  const heartbeatTimer = useRef<ReturnType<typeof setTimeout>>(setTimeout(() => {}));
  const reconnectTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 5;
  const reconnectDelay = useRef(1000); // 初始重连延迟1秒
  // 接受消息的存储
  const [tempMessages, updateTempMessages] = useImmer<Record<number, ChatMessageResponse[]>>({});
  const [messagesNumber, updateMessagesNumber] = useImmer<Record<number, number>>({});
  const queryClient = useQueryClient();

  // 新消息数记录，用于显示红点
  const [unreadMessagesNumber, setUnreadMessagesNumber] = useState<Record<number, number>>({});

  const token = getLocalStorageValue<number>("token", -1);
  // 配置参数
  const HEARTBEAT_INTERVAL = 25000;

  // ========== WebRTC 信令相关 =============
  // 信令回调注册表
  const signalListeners = useRef<Partial<{
    onOffer: (data: any) => void;
    onAnswer: (data: any) => void;
    onCandidate: (data: any) => void;
    onEnter: (data: any) => void;
    onLeave: (data: any) => void;
    onJoin: (data: any) => void;
    onReject: (data: any) => void;
    onCancel: (data: any) => void;
    // ...可扩展
  }>>({});

  // 注册信令回调
  function registerSignalListener(type: keyof typeof signalListeners.current, cb: (data: any) => void) {
    signalListeners.current[type] = cb;
  }

  // 发送信令
  function sendSignal(signal: any) {
    if (!isConnected()) {
      connect();
    }
    for (let i = 0; i < 1000; i++) {
      if (wsRef.current?.readyState === WebSocket.OPEN) break;
    }
    try {
      wsRef.current?.send(JSON.stringify(signal));
      console.log('Sent signal:', signal);
    } catch (e) {
      console.error('Signal send failed:', e);
    }
  }

  // 核心连接逻辑
  const connect = useCallback(() => {
    if (isConnected()) {
      return;
    }
    
    // 如果已达到最大重连次数，停止重连
    if (reconnectAttempts.current >= maxReconnectAttempts) {
      console.error('WebSocket 重连次数已达上限，停止重连');
      return;
    }
    
    // 连接前，先重置消息
    queryClient.resetQueries({ queryKey: ["getMsgPage"] });
    
    try {
      console.log(`WebSocket 连接尝试 ${reconnectAttempts.current + 1}/${maxReconnectAttempts}`);
      wsRef.current = new WebSocket(`${WS_URL}?token=${token}`);
      
      wsRef.current.onopen = () => {
        console.log("WebSocket connected");
        // 连接成功，重置重连计数器和延迟
        reconnectAttempts.current = 0;
        reconnectDelay.current = 1000;
        startHeartbeat();
      };

      wsRef.current.onclose = (event) => {
        console.log(`WebSocket 关闭: Code ${event.code}, Reason: ${event.reason}`);
        stopHeartbeat();
        
        // 如果不是手动关闭，则尝试重连
        if (event.code !== 1000 && reconnectAttempts.current < maxReconnectAttempts) {
          reconnectAttempts.current++;
          console.log(`将在 ${reconnectDelay.current}ms 后尝试重连...`);
          
          reconnectTimer.current = setTimeout(() => {
            connect();
          }, reconnectDelay.current);
          
          // 指数退避策略：每次重连延迟翻倍，最大30秒
          reconnectDelay.current = Math.min(reconnectDelay.current * 2, 30000);
        }
      };

      wsRef.current.onmessage = (event) => {
        try {
          const message: WsMessage<any> = JSON.parse(event.data);
          console.log("Received message:", JSON.stringify(message));
          // ========== 信令分发 =============
          switch (message.type) {
            case 3: {
              message.data && handleChatMessage(message.data as import("./models/ChatMessageResponse").ChatMessageResponse);
              break;
            }
            case 4: // ENTER
              signalListeners.current.onEnter?.(message);
              break;
            case 5: // OFFER
              signalListeners.current.onOffer?.(message);
              break;
            case 6: // ANSWER
              signalListeners.current.onAnswer?.(message);
              break;
            case 7: // CANDIDATE
              signalListeners.current.onCandidate?.(message);
              break;
            case 8: // LEAVE
              signalListeners.current.onLeave?.(message);
              break;
            case 10: // JOIN
              signalListeners.current.onJoin?.(message);
              break;
            case 11: // REJECT
              signalListeners.current.onReject?.(message);
              break;
            case 12: // CANCEL
              signalListeners.current.onCancel?.(message);
              break;
            // ...可扩展
          }
        }
        catch (error) {
          console.error("Message parsing failed:", error);
        }
      };
      
      wsRef.current.onerror = (error) => {
        console.error("WebSocket error:", error);
        wsRef.current?.close();
      };
    }
    catch (error) {
      console.error("Connection failed:", error);
    }
  }, [token, queryClient]);

  // 初始化和清理 useEffect
  useEffect(() => {
    connect();
    
    // 清理函数
    return () => {
      if (reconnectTimer.current) {
        clearTimeout(reconnectTimer.current);
        reconnectTimer.current = null;
      }
      stopHeartbeat();
      if (wsRef.current) {
        wsRef.current.close(1000, 'Component unmounting'); // 正常关闭
        wsRef.current = null;
      }
    };
  }, [connect]);

  // 页面可见性变化处理
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && wsRef.current?.readyState !== WebSocket.OPEN) {
        // 页面重新可见时，重置重连计数器，允许重新连接
        reconnectAttempts.current = 0;
        reconnectDelay.current = 1000;
        connect();
      }
    };
    
    if (typeof window !== "undefined") {
      window.addEventListener("visibilitychange", handleVisibilityChange);
      return () => {
        window.removeEventListener("visibilitychange", handleVisibilityChange);
      };
    }
  }, [connect]);

  const handleChatMessage = (chatMessageResponse: ChatMessageResponse) => {
    if (!(chatMessageResponse?.message.createTime) && chatMessageResponse != undefined) {
      chatMessageResponse.message.createTime = formatLocalDateTime(new Date());
    }
    if (chatMessageResponse != undefined && chatMessageResponse) {
      const roomId = chatMessageResponse.message.groupId;
      updateMessagesNumber((draft) => {
        if (roomId in draft) {
          draft[roomId] += 1;
        }
        else {
          draft[roomId] = 1;
        }
      });
      if (chatMessageResponse.message.status === 0) {
        setUnreadMessagesNumber(prev => ({
          ...prev,
          [roomId]: (prev[roomId] || 0) + 1,
        }));
      }

      updateTempMessages((draft) => {
        if (roomId in draft) {
          // 查找已存在消息的索引
          const existingIndex = draft[roomId].findIndex(
            msg => msg.message.messageID === chatMessageResponse.message.messageID,
          );
          if (existingIndex !== -1) {
            // 更新已存在的消息
            draft[roomId][existingIndex] = chatMessageResponse;
          }
          else {
            draft[roomId].push(chatMessageResponse);
          }
        }
        else {
          draft[roomId] = [chatMessageResponse];
        }
      });
    }
  };

  // 心跳机制
  const startHeartbeat = useCallback(() => {
    stopHeartbeat();
    heartbeatTimer.current = setInterval(() => {
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify({ 
            type: 2,
            data: "ping"
         })); // 发送标准心跳
      }
    }, HEARTBEAT_INTERVAL);
  }, []);

  const stopHeartbeat = useCallback(() => {
    heartbeatTimer.current && clearInterval(heartbeatTimer.current);
  }, []);

  async function send(request: ChatMessageRequest) {
    if (!isConnected) {
      connect()
    }
    for (let i = 0; i < 1000; i++) {
      if (wsRef.current?.readyState === WebSocket.OPEN)
        break;
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    try {
      const message: WsMessage<ChatMessageRequest> = {
        type: 3, // 聊天消息类型
        data: request,
      };
      wsRef?.current?.send(JSON.stringify(message));
      console.log("Sent message:", JSON.stringify(message));
    }
    catch (e) {
      console.error("Message Serialization Failed:", e);
    }
  }

  //
  const getTempMessagesByRoomId = (roomId: number, _cleanTemp: boolean): ChatMessageResponse[] => {
    // return tempMessages[roomId] || []
    if (!tempMessages[roomId]) {
      return [];
    }
    // updateTempMessages(draft => {draft[roomId] = []})
    return tempMessages[roomId] || [];
  };

  const updateUnreadMessagesNumber
        = (roomId: number, newNumber: number) => {
          setUnreadMessagesNumber(prev => ({
            ...prev,
            [roomId]: newNumber,
          }));
        };

  // 导出信令相关方法
  const webSocketUtils: WebsocketUtils & {
    sendSignal: typeof sendSignal,
    registerSignalListener: typeof registerSignalListener,
  } = {
    isConnected,
    getTempMessagesByRoomId,
    connect,
    send,
    messagesNumber,
    unreadMessagesNumber,
    updateUnreadMessagesNumber,
    sendSignal,
    registerSignalListener,
  };
  return webSocketUtils;
}