import React, { createContext, useState, useContext, ReactNode } from 'react';

interface ErrorContextProps {
  hasError: boolean;
  errorMessage: string;
  setError: (message: string) => void;
  clearError: () => void;
}

const ErrorContext = createContext<ErrorContextProps | undefined>(undefined);

export const ErrorProvider = ({ children }: { children: ReactNode }) => {
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const setError = (message: string) => {
    setHasError(true);
    setErrorMessage(message);
  };

  const clearError = () => {
    setHasError(false);
    setErrorMessage('');
  };

  return (
    <ErrorContext.Provider value={{ hasError, errorMessage, setError, clearError }}>
      {children}
    </ErrorContext.Provider>
  );
};

export const useError = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error('useError debe usarse dentro de un ErrorProvider');
  }
  return context;
};
