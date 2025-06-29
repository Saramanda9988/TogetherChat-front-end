import React from 'react';

interface ToggleProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  size?: 'sm' | 'md';
  disabled?: boolean;
}

const Toggle: React.FC<ToggleProps> = ({
  enabled,
  onChange,
  size = 'md',
  disabled = false
}) => {
  const sizeClasses = {
    sm: 'w-10 h-5',
    md: 'w-12 h-6'
  };

  const thumbSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5'
  };

  const translateClasses = {
    sm: enabled ? 'translate-x-5' : 'translate-x-0.5',
    md: enabled ? 'translate-x-6' : 'translate-x-0.5'
  };

  return (
    <button
      onClick={() => !disabled && onChange(!enabled)}
      disabled={disabled}
      className={`${sizeClasses[size]} rounded-full transition-colors ${
        enabled ? 'bg-blue-500' : 'bg-slate-600 dark:bg-slate-600 light:bg-gray-300'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <div className={`${thumbSizeClasses[size]} bg-white rounded-full transition-transform ${translateClasses[size]}`} />
    </button>
  );
};

export default Toggle;