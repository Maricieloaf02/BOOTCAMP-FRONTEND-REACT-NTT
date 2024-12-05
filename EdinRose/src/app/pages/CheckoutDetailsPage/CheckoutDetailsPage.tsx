import React, { useState, useRef, useEffect } from 'react';
import OrderProgress from '@/app/components/OrderProgress/OrderProgress';
import ContactForm from '@/app/components/Checkout/ContactForm';
import ShippingAddressForm from '@/app/components/Checkout/ShippingAddressForm';
import Button from '@/shared/components/Button/Button';
import { AppRoutes } from '@/app/routes';
import { ContactFormData } from '@/app/domain/ContactForm';
import { ShippingAddressFormData } from '@/app/domain/ShippingAddress';
import { useNavigate } from 'react-router-dom';
import styles from './CheckoutDetailsPage.module.css';

const CheckoutDetailsPage: React.FC = () => {
  const [contactData, setContactData] = useState<ContactFormData | null>(null);
  const [shippingData, setShippingData] = useState<ShippingAddressFormData | null>(null);
  const [contactErrors, setContactErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();
  const shippingFormRef = useRef<{ validateForm: () => boolean }>(null);

  const isPhoneValid = (phone: string) => /^\d{9}$/.test(phone); 

  const handlePlaceOrder = () => {
    const isShippingValid = shippingFormRef.current?.validateForm();
    const isContactValid =
      contactData &&
      contactData.firstName &&
      contactData.lastName &&
      isPhoneValid(contactData.phone);

    const errors: { [key: string]: string } = {};

    if (!isContactValid) {
      if (!contactData?.firstName) errors.firstName = 'Este campo es obligatorio';
      if (!contactData?.lastName) errors.lastName = 'Este campo es obligatorio';
      if (!isPhoneValid(contactData?.phone || '')) errors.phone = 'El número de teléfono debe contener exactamente 9 dígitos';
    }

    if (!isShippingValid) {
      alert('Por favor, completa todos los campos de envío.');
      return;
    }

    if (Object.keys(errors).length > 0) {
      setContactErrors(errors); // Actualizamos los errores en el estado
      alert('Por favor, completa todos los campos requeridos correctamente.');
      return;
    }

    console.log('Datos de Contacto:', contactData);
    console.log('Datos de Envío:', shippingData);

    navigate(AppRoutes.ORDER_COMPLETE);
  };

  // Usamos useEffect para evitar el warning por cambios de estado en el renderizado
  useEffect(() => {
    if (contactData) {
      setContactErrors({});
    }
  }, [contactData]); // Se ejecutará cuando los datos de contacto cambien

  return (
    <div className={styles['checkout-page']}>
      <OrderProgress
        currentStep={2}
        steps={['Shopping cart', 'Checkout details', 'Order complete']}
      />

      <div className={styles['checkout-page__forms']}>
        <ContactForm 
          onChange={(data) => setContactData(data)} 
          errors={contactErrors}
        />
        <ShippingAddressForm
          ref={shippingFormRef}
          onChange={(data) => setShippingData(data)}
        />
      </div>

      <Button onClick={handlePlaceOrder} fullWidth>
        Place Order
      </Button>
    </div>
  );
};

export default CheckoutDetailsPage;
