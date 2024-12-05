import React, { useState } from 'react';
import Form from '@/shared/components/Form';
import { ContactFormData } from '@/app/domain/ContactForm';
import styles from './ContactForm.module.css';

interface ContactFormProps {
  onChange: (data: ContactFormData) => void;
  errors: { [key: string]: string };
}

const ContactForm: React.FC<ContactFormProps> = ({ onChange, errors }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    phone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const name = target.name;
    let value = target.value;
  
    if (name === 'firstName' || name === 'lastName') {
      value = value.replace(/[^a-zA-Z\s]/g, ''); // Filtra caracteres no válidos
    }
  
    if (name === 'phone') {
      value = value.replace(/[^0-9]/g, ''); // Solo números
      if (value.length > 9) {
        value = value.slice(0, 9); // Limita a 9 caracteres
      }
    }
  
    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: value };
      onChange(updatedData); // Llamamos a onChange solo después de actualizar el estado
      return updatedData;
    });
  };

  return (
    <Form title="Contact Information">
      <div className={styles['form-field']}>
        <input
          type="text"
          name="firstName"
          placeholder="First name"
          value={formData.firstName}
          onChange={handleChange}
          className={errors.firstName ? styles.error : ''}
        />
        {errors.firstName && <p className={styles['error-message']}>{errors.firstName}</p>}
      </div>
      <div className={styles['form-field']}>
        <input
          type="text"
          name="lastName"
          placeholder="Last name"
          value={formData.lastName}
          onChange={handleChange}
          className={errors.lastName ? styles.error : ''}
        />
        {errors.lastName && <p className={styles['error-message']}>{errors.lastName}</p>}
      </div>
      <div className={styles['form-field']}>
        <input
          type="tel"
          name="phone"
          placeholder="Phone number"
          value={formData.phone}
          onChange={handleChange}
          className={errors.phone ? styles.error : ''}
          maxLength={9}
        />
        {errors.phone && <p className={styles['error-message']}>{errors.phone}</p>}
      </div>
    </Form>
  );
};

export default ContactForm;
