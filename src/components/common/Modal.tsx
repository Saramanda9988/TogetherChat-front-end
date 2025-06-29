import React from 'react';
import { X } from 'lucide-react';
import Button from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md'
}) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl'
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`bg-slate-800 dark:bg-slate-800 light:bg-white rounded-lg p-6 w-full ${sizeClasses[size]} mx-4`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white dark:text-white light:text-gray-900 text-lg font-medium">{title}</h3>
          <button
            onClick={onClose}
            className="text-slate-400 dark:text-slate-400 light:text-gray-600 hover:text-white dark:hover:text-white light:hover:text-gray-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="mb-6">
          {children}
        </div>
        
        {footer && (
          <div className="flex items-center justify-end space-x-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;