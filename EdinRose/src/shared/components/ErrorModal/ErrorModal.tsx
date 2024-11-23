import React from 'react';
import { useError } from '@/context/ErrorContext';
import './ErrorModal.module.css';

const ErrorModal: React.FC = () => {
  const { hasError, errorMessage, clearError } = useError();

  if (!hasError) return null;

  return (
    <div className="error-modal">
      <div className="error-modal__content">
        <p>{errorMessage}</p>
        <button onClick={clearError}>Cerrar</button>
      </div>
    </div>
  );
};

export default ErrorModal;
