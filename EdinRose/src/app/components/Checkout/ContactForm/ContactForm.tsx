import React, { useState } from 'react';
import Form from '@/shared/components/Form';
import { ContactFormData } from '@/app/domain/ContactForm';
import styles from './ContactForm.module.css';

interface ContactFormProps {
  onChange: (data: ContactFormData) => void;
  errors: { [key: string]: string }; // Recibimos los errores del formulario
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
    const value = target.value;

    if (name === 'firstName' || name === 'lastName') {
      if (/[^a-zA-Z\s]/.test(value)) {
        // Si hay números o caracteres especiales, no se actualiza el campo
        return;
      }
    }

    if (name === 'phone') {
      // Permitir solo números en el campo phone
      if (/[^0-9]/.test(value)) {
        return; // Si contiene algo que no es un número, no actualizamos el campo
      }
      // Limitar la longitud del teléfono a 9 caracteres
      if (value.length > 9) return;
    }

    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: value };
      onChange(updatedData);
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
          className={errors.firstName ? styles.error : ''} // Aplicamos la clase de error si hay un error
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
          className={errors.lastName ? styles.error : ''} // Clase de error
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
          maxLength={9} // Limita la cantidad de caracteres
        />
        {errors.phone && <p className={styles['error-message']}>{errors.phone}</p>}
      </div>
    </Form>
  );
};

export default ContactForm;
