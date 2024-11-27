import React, { useState } from 'react';
import Form from '@/shared/components/Form';
import { ContactFormData } from '@/domain/ContactForm';
import styles from './ContactForm.module.css';

interface ContactFormProps {
  onChange: (data: ContactFormData) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onChange }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    phone: '',
  });

  // por qu'e no reutilizar ContactFormData?
  const [errors, setErrors] = useState<{ [key: string]: string }>({
    firstName: '',
    lastName: '',
    phone: '',
  });

  // Validar tecla en tiempo real
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { name } = e.currentTarget;
    // los regex deben estar centralizados en enum para reutilizarlos en otros casos
    const allowedPattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/; // Solo letras y espacios

    // no valores fijos usemos types
    if (name === 'firstName' || name === 'lastName') {
      if (!allowedPattern.test(e.key)) {
        e.preventDefault(); // Bloquear entrada si no coincide con el patrón
      }
    }

    if (name === 'phone') {
      // los regex deben estar centralizados en enum para reutilizarlos en otros casos
      if (!/^\d$/.test(e.key)) {
        e.preventDefault(); // Bloquear entrada si no es un número
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let error = '';

    if (name === 'firstName' || name === 'lastName') {
      // los regex deben estar centralizados en enum para reutilizarlos en otros casos
      if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(value)) {
        error = 'Debe ingresar un valor válido (solo letras).';
      }
    }

    if (name === 'phone') {
      // los regex deben estar centralizados en enum para reutilizarlos en otros casos
      if (!/^\d+$/.test(value)) {
        error = 'El número de teléfono debe contener solo dígitos.';
      }
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    onChange(formData);
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
          onKeyPress={handleKeyPress} // Bloquear entrada de caracteres inválidos
        />
        {errors.firstName && <p className={styles['error']}>{errors.firstName}</p>}
      </div>
      <div className={styles['form-field']}>
        <input
          type="text"
          name="lastName"
          placeholder="Last name"
          value={formData.lastName}
          onChange={handleChange}
          onKeyPress={handleKeyPress} // Bloquear entrada de caracteres inválidos
        />
        {errors.lastName && <p className={styles['error']}>{errors.lastName}</p>}
      </div>
      <div className={styles['form-field']}>
        <input
          type="tel"
          name="phone"
          placeholder="Phone number"
          value={formData.phone}
          onChange={handleChange}
          onKeyPress={handleKeyPress} // Bloquear entrada de caracteres no numéricos
        />
        {errors.phone && <p className={styles['error']}>{errors.phone}</p>}
      </div>
    </Form>
  );
};

export default ContactForm;
