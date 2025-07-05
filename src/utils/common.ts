// 生成唯一的 UUID (8字节)
export function generateUUID(): string {
  return crypto.randomUUID().replace(/-/g, '').substring(0, 16);
}

// 格式化时间
export function formatTime(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleTimeString('zh-CN', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
}

// 格式化日期时间
export function formatDateTime(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleString('zh-CN', { 
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// 深拷贝对象
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime()) as any;
  if (obj instanceof Array) return obj.map(item => deepClone(item)) as any;
  if (typeof obj === 'object') {
    const clonedObj = {} as any;
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }
  return obj;
}

// 防抖函数
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

// 节流函数
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastExecTime = 0;
  return (...args: Parameters<T>) => {
    const currentTime = Date.now();
    if (currentTime - lastExecTime >= delay) {
      func(...args);
      lastExecTime = currentTime;
    }
  };
}

// 检查是否支持 WebRTC
export function isWebRTCSupported(): boolean {
  return !!(
    window.RTCPeerConnection &&
    navigator.mediaDevices &&
    navigator.mediaDevices.getUserMedia
  );
}

// 获取媒体设备权限
export async function getMediaPermissions(): Promise<{
  audio: boolean;
  video: boolean;
}> {
  try {
    const permissions = await Promise.allSettled([
      navigator.permissions.query({ name: 'microphone' as PermissionName }),
      navigator.permissions.query({ name: 'camera' as PermissionName })
    ]);
    
    return {
      audio: permissions[0].status === 'fulfilled' && permissions[0].value.state === 'granted',
      video: permissions[1].status === 'fulfilled' && permissions[1].value.state === 'granted'
    };
  } catch (error) {
    console.warn('无法查询媒体设备权限:', error);
    return { audio: false, video: false };
  }
}

// 错误处理工具
export function handleError(error: unknown, context: string): string {
  const errorMessage = error instanceof Error ? error.message : String(error);
  console.error(`[${context}] 错误:`, error);
  return errorMessage;
}

// 验证表单数据
export function validateForm(data: Record<string, any>, rules: Record<string, any>): {
  isValid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};
  
  for (const [field, value] of Object.entries(data)) {
    const rule = rules[field];
    if (!rule) continue;
    
    if (rule.required && (!value || value.toString().trim() === '')) {
      errors[field] = `${field}是必填项`;
      continue;
    }
    
    if (rule.minLength && value.toString().length < rule.minLength) {
      errors[field] = `${field}至少需要${rule.minLength}个字符`;
      continue;
    }
    
    if (rule.maxLength && value.toString().length > rule.maxLength) {
      errors[field] = `${field}不能超过${rule.maxLength}个字符`;
      continue;
    }
    
    if (rule.pattern && !rule.pattern.test(value.toString())) {
      errors[field] = rule.message || `${field}格式不正确`;
      continue;
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

// 本地存储工具
export const storage = {
  get: <T>(key: string, defaultValue?: T): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue || null;
    } catch (error) {
      console.warn(`获取本地存储 ${key} 失败:`, error);
      return defaultValue || null;
    }
  },
  
  set: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`设置本地存储 ${key} 失败:`, error);
    }
  },
  
  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn(`删除本地存储 ${key} 失败:`, error);
    }
  },
  
  clear: (): void => {
    try {
      localStorage.clear();
    } catch (error) {
      console.warn('清空本地存储失败:', error);
    }
  }
};
