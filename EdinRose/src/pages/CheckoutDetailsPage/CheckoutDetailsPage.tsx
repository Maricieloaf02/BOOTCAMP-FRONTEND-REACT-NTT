import React, { useState } from 'react';
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

  const handlePlaceOrder = () => {
    if (!contactData || !shippingData) {
      alert('Por favor, completa todos los campos antes de continuar.');
      return;
    }

    console.log('Datos de Contacto:', contactData);
    console.log('Datos de Envío:', shippingData);

    navigate('/order-complete');
  };

  return (
    <div className={styles['checkout-page']}>
      <OrderProgress
        currentStep={2}
        steps={['Shopping cart', 'Checkout details', 'Order complete']}
      />

      <div className={styles['checkout-page__forms']}>
        <ContactForm onChange={(data: ContactFormData) => setContactData(data)} />
        <ShippingAddressForm onChange={(data: ShippingAddressFormData) => setShippingData(data)} />
      </div>

      <Button onClick={handlePlaceOrder} fullWidth>
        Place Order
      </Button>
    </div>
  );
};

export default CheckoutDetailsPage;
