import React, { useEffect, useState } from 'react';
import { CheckCircle, X } from 'lucide-react';

interface NotificationProps {
  message: string;
  show: boolean;
  onClose: () => void;
}

export default function Notification({ message, show, onClose }: NotificationProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm">
      <div className="bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-3 animate-slide-in">
        <CheckCircle className="h-5 w-5 flex-shrink-0" />
        <p className="flex-1 text-sm">{message}</p>
        <button
          onClick={onClose}
          className="text-white hover:text-gray-200 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}