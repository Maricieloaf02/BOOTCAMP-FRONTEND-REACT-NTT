import React from 'react';
import styles from './Form.module.css';

interface FormProps {
  title: string; 
  children: React.ReactNode;
}

const Form: React.FC<FormProps> = ({ title, children }) => {
  return (
    <div className={styles['form']}>
      <h2 className={styles['form__title']}>{title}</h2>
      <div className={styles['form__content']}>{children}</div>
    </div>
  );
};

export default Form;
