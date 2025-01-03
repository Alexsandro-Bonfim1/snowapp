import { useState, useEffect } from 'react';

interface Notification {
  id: string;
  message: string;
  timestamp: number;
  read: boolean;
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      message: 'Warehouse COMPUTE_WH is now running',
      timestamp: Date.now() - 1000 * 60 * 5,
      read: false
    },
    {
      id: '2',
      message: 'Query execution completed successfully',
      timestamp: Date.now() - 1000 * 60 * 30,
      read: true
    }
  ]);

  const addNotification = (message: string) => {
    const notification: Notification = {
      id: Date.now().toString(),
      message,
      timestamp: Date.now(),
      read: false
    };
    setNotifications(prev => [notification, ...prev]);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return {
    notifications,
    addNotification,
    markAsRead,
    clearAll
  };
}