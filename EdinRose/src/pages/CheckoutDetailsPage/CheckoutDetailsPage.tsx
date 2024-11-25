import React, { useRef, useState } from 'react';
import OrderProgress from '@/components/OrderProgress/OrderProgress';
import ContactForm from '@/components/Checkout/ContactForm';
import ShippingAddressForm from '@/components/Checkout/ShippingAddressForm';
import Button from '@/shared/components/Button/Button';
import { ContactFormData } from '@/domain/ContactForm';
import { ShippingAddressFormData } from '@/domain/ShippingAddress';
import { useNavigate } from 'react-router-dom';
import styles from './CheckoutDetailsPage.module.css';

const CheckoutDetailsPage: React.FC = () => {
  const [contactData, setContactData] = useState<ContactFormData | null>(null);
  const [shippingData, setShippingData] = useState<ShippingAddressFormData | null>(null);

  const navigate = useNavigate();

  // Referencia para ShippingAddressForm
  const shippingFormRef = useRef<{ validateForm: () => boolean }>(null);

  const handlePlaceOrder = () => {
    const isShippingValid = shippingFormRef.current?.validateForm(); // Validar formulario de dirección

    if (!contactData || !isShippingValid) {
      alert('Por favor, completa todos los campos requeridos.');
      return;
    }

    console.log('Datos de Contacto:', contactData);
    console.log('Datos de Envío:', shippingData);

    navigate('/order-complete'); // Redirige a la página final
  };

  return (
    <div className={styles['checkout-page']}>
      <OrderProgress
        currentStep={2}
        steps={['Shopping cart', 'Checkout details', 'Order complete']}
      />

      <div className={styles['checkout-page__forms']}>
        <ContactForm onChange={(data) => setContactData(data)} />
        <ShippingAddressForm
          ref={shippingFormRef}
          onChange={(data) => setShippingData(data)} // Captura los datos en el estado
        />
      </div>

      <Button onClick={handlePlaceOrder} fullWidth>
        Place Order
      </Button>
    </div>
  );
};

export default CheckoutDetailsPage;
