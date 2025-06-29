import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  icon?: LucideIcon;
  className?: string;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  onKeyPress,
  icon: Icon,
  className = '',
  disabled = false
}) => {
  const baseClasses = 'w-full px-4 py-2 bg-slate-800 dark:bg-slate-800 light:bg-white border border-slate-600 dark:border-slate-600 light:border-gray-300 rounded-lg text-white dark:text-white light:text-gray-900 placeholder-slate-400 dark:placeholder-slate-400 light:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors';
  
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';
  
  const classes = `${baseClasses} ${disabledClasses} ${className}`;

  if (Icon) {
    return (
      <div className="relative">
        <Icon className="absolute left-3 top-3 w-4 h-4 text-slate-400 dark:text-slate-400 light:text-gray-500" />
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyPress={onKeyPress}
          disabled={disabled}
          className={`${classes} pl-10`}
        />
      </div>
    );
  }

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyPress={onKeyPress}
      disabled={disabled}
      className={classes}
    />
  );
};

export default Input;