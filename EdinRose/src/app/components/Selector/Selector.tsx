import React from 'react';
import styles from './Selector.module.css';

export interface SelectorOption {
  value: string;
  label: string;
}

interface SelectorProps {
  options: SelectorOption[];
  onChange: (value: string) => void;
  value?: string;
  label?: string; // Añadimos la prop opcional "label"
}

const Selector: React.FC<SelectorProps> = ({ options, onChange, value, label }) => {
  return (
    <div className={styles['selector']}>
      {label && <label className={styles['selector__label']}>{label}</label>}
      <select
        className={styles['selector__dropdown']}
        onChange={(e) => onChange(e.target.value)}
        value={value}
        aria-label={label} // Asignamos el nombre accesible
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
