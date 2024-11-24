import React, { useState } from 'react';
import Form from '@/shared/components/Form';
import { ContactFormData } from '@/domain/ContactForm';

interface ContactFormProps {
  onChange: (data: ContactFormData) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onChange }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    phone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
    onChange(updatedData); // Notificamos al padre sobre los cambios
  };

  return (
    <Form title="Contact Information">
      <input
        type="text"
        name="firstName"
        placeholder="First name"
        value={formData.firstName}
        onChange={handleChange}
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last name"
        value={formData.lastName}
        onChange={handleChange}
      />
      <input
        type="tel"
        name="phone"
        placeholder="Phone number"
        value={formData.phone}
        onChange={handleChange}
      />
    </Form>
  );
};


export default ContactForm;
