import React from 'react';
import styles from './Selector.module.css'; // Importamos estilos como módulo

export interface SelectorOption {
  value: string;
  label: string;
}

interface SelectorProps {
  options: SelectorOption[];
  onChange: (value: string) => void;
}

const Selector: React.FC<SelectorProps> = ({ options, onChange }) => {
  return (
    <div className={styles['selector']}>
      <select
        className={styles['selector__dropdown']}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Selector;
