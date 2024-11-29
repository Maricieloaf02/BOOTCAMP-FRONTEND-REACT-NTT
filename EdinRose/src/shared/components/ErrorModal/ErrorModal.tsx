import React from 'react';
import { useError } from '@/app/context/ErrorContext';
import styles from './ErrorModal.module.css';

const ErrorModal: React.FC = () => {
  const { hasError, errorMessage, clearError } = useError();

  if (!hasError) return null;

  return (
    <div className={styles['error-modal']}>
      <div className={styles['error-modal__content']}>
        <p>{errorMessage}</p>
        <button onClick={clearError} className={styles['error-modal__button']}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;
