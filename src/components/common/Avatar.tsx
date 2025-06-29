import React from 'react';
import { Users } from 'lucide-react';

interface AvatarProps {
  name: string;
  avatar?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isOnline?: boolean;
  isGroup?: boolean;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  name,
  avatar,
  size = 'md',
  isOnline,
  isGroup = false,
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-20 h-20 text-2xl'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8'
  };

  const onlineIndicatorSizes = {
    sm: 'w-2 h-2 -bottom-0.5 -right-0.5',
    md: 'w-3 h-3 -bottom-0.5 -right-0.5',
    lg: 'w-3 h-3 -bottom-0.5 -right-0.5',
    xl: 'w-4 h-4 -bottom-1 -right-1'
  };

  const bgColor = isGroup ? 'bg-green-500' : 'bg-blue-500';

  return (
    <div className={`relative inline-block ${className}`}>
      <div className={`${sizeClasses[size]} ${bgColor} rounded-full flex items-center justify-center text-white font-medium flex-shrink-0`}>
        {isGroup ? (
          <Users className={iconSizes[size]} />
        ) : (
          name.charAt(0).toUpperCase()
        )}
      </div>
      {isOnline && !isGroup && (
        <div className={`absolute ${onlineIndicatorSizes[size]} bg-green-400 border-2 border-slate-900 dark:border-slate-900 light:border-white rounded-full`}></div>
      )}
    </div>
  );
};

export default Avatar;