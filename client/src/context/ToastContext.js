import React, { createContext, useContext, useState, useCallback } from 'react';
import './ToastContext.css';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ toast, showToast }}>
      {children}
      {toast && <div className={`toast toast-${toast.type}`}>{toast.message}</div>}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
