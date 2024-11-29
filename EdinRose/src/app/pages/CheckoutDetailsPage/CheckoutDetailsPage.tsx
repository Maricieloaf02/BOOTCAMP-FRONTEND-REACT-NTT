import React, { useRef, useState } from 'react';
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
  const [contactErrors, setContactErrors] = useState<{ [key: string]: string }>({}); // Para los errores de ContactForm

  const navigate = useNavigate();
  const shippingFormRef = useRef<{ validateForm: () => boolean }>(null);

  // Validar el teléfono
  const isPhoneValid = (phone: string) => {
    return /^\d{9}$/.test(phone); // Validar que tenga exactamente 9 dígitos
  };

  const handlePlaceOrder = () => {
    // Verificar que los datos de contacto y envío estén completos y validados
    const isShippingValid = shippingFormRef.current?.validateForm();
    const isContactValid =
      contactData &&
      contactData.firstName &&
      contactData.lastName &&
      isPhoneValid(contactData.phone); // Validamos solo el teléfono en ContactForm

    const errors: { [key: string]: string } = {};

    if (!isContactValid) {
      if (!contactData?.firstName) {
        errors.firstName = 'Este campo es obligatorio';
      }
      if (!contactData?.lastName) {
        errors.lastName = 'Este campo es obligatorio';
      }
      if (!isPhoneValid(contactData?.phone || '')) {
        errors.phone = 'El número de teléfono debe contener exactamente 9 dígitos';
      }
    }

    if (!isShippingValid) {
      // Aquí validamos los campos del formulario de dirección si es necesario
      alert('Por favor, completa todos los campos de envío.');
      return;
    }

    if (Object.keys(errors).length > 0) {
      setContactErrors(errors); // Actualizamos los errores en el estado
      alert('Por favor, completa todos los campos requeridos correctamente.');
      return;
    }

    // Si la validación es correcta, procedemos a la siguiente página
    console.log('Datos de Contacto:', contactData);
    console.log('Datos de Envío:', shippingData);

    navigate(AppRoutes.ORDER_COMPLETE);
  };

  return (
    <div className={styles['checkout-page']}>
      <OrderProgress
        currentStep={2}
        steps={['Shopping cart', 'Checkout details', 'Order complete']}
      />

      <div className={styles['checkout-page__forms']}>
        <ContactForm 
          onChange={(data) => setContactData(data)} 
          errors={contactErrors} // Le pasamos los errores al formulario de contacto
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
