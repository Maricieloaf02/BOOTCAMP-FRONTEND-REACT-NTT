import React from 'react';
import styles from './OrderProgress.module.css';

interface OrderProgressProps {
  currentStep: number; // Paso actual (1, 2 o 3)
  steps: string[]; // Nombres de los pasos
}

const OrderProgress: React.FC<OrderProgressProps> = ({ currentStep, steps }) => {
  return (
    <div className={styles.progressContainer}>
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = currentStep === stepNumber; // Paso activo
        const isCompleted = currentStep > stepNumber; // Paso completado

        return (
          <div
            key={step}
            className={`${styles.step} ${isCompleted ? styles.completed : ''} ${
              isActive ? styles.active : ''
            }`}
          >
            <div className={styles.circle}>{stepNumber}</div>
            <p className={styles.label}>{step}</p>
          </div>
        );
      })}
    </div>
  );
};

export default OrderProgress;
