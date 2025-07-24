import React from 'react';
import { FaCheckCircle, FaTimesCircle, FaInfoCircle, FaExclamationTriangle } from 'react-icons/fa';
import './Toast.css';

const Toast = ({ message, type = 'success', onClose }) => {
  const icon = {
    success: <FaCheckCircle />,
    error: <FaTimesCircle />,
    info: <FaInfoCircle />,
    warning: <FaExclamationTriangle />,
  }[type];

  return (
    <div className={`toast toast-${type}`}>
      <span className="toast-icon">{icon}</span>
      <span className="toast-message">{message}</span>
      {onClose && (
        <button className="toast-close" onClick={onClose} aria-label="Close">
          ✖
        </button>
      )}
    </div>
  );
};

export default Toast;
