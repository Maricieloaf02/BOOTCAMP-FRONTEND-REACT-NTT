import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  onClick?: () => void; // Función que se ejecuta al hacer clic
  children: React.ReactNode; // Texto o contenido del botón
  fullWidth?: boolean; // Si el botón debe ocupar todo el ancho
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
