import React from 'react';
import styles from './OrderProgress.module.css';

interface OrderProgressProps {
  currentStep: number;
  steps: string[];
}

const OrderProgress: React.FC<OrderProgressProps> = ({ currentStep, steps }) => {
  return (
    <div className={styles.progressContainer}>
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = currentStep === stepNumber;
        const isCompleted = currentStep > stepNumber;

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
