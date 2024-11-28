import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  onClick?: () => void; 
  children: React.ReactNode;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, fullWidth }) => {
  return (
    <button
      className={`${styles['button']} ${fullWidth ? styles['button--full'] : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
