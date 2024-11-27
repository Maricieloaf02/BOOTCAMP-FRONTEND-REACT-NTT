import React, { useState, useImperativeHandle, forwardRef } from 'react';
import Form from '@/shared/components/Form';
import Selector, { SelectorOption } from '@/components/Selector';
import useDistricts from '@/shared/hooks/useDistricts';
import { ShippingAddressFormData } from '@/domain/ShippingAddress';
import styles from './ShippingAddressForm.module.css';

interface ShippingAddressFormProps {
  onChange: (data: ShippingAddressFormData) => void;
}

const ShippingAddressForm = forwardRef((props: ShippingAddressFormProps, ref) => {
  const { onChange } = props;
  const { districts, loading, error } = useDistricts('/districts.json');

  const [formData, setFormData] = useState<ShippingAddressFormData>({
    address: '',
    district: '',
    reference: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({
    address: '',
    district: '',
    reference: '',
  });

  const validateField = (name: string, value: string) => {
    let error = '';

    // no valores directos
    if (name === 'address' || name === 'reference') {
      if (value.trim() === '') {
        error = 'Este campo es obligatorio.';
      }
    }

    if (name === 'district') {
      if (value === '') {
        error = 'Debe seleccionar un distrito.';
      }
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    return error === ''; // Devuelve true si no hay error
  };

  const validateForm = () => {
    // Validar todos los campos del formulario
    // usemos enums o tipos
    const isValidAddress = validateField('address', formData.address);
    const isValidDistrict = validateField('district', formData.district);
    const isValidReference = validateField('reference', formData.reference);

    return isValidAddress && isValidDistrict && isValidReference;
  };

  // podr'ia solo recibir el name y value y no pasarle todo el evento
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    validateField(name, value); // Validar campo
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
    onChange(updatedData); // Notificar cambios al padre
  };

  useImperativeHandle(ref, () => ({
    validateForm,
  }));

  if (loading) return <p>Cargando distritos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Form title="Shipping Address">
      <div className={styles['form-field']}>
        <input
          type="text"
          name="address"
          placeholder="Street Address"
          value={formData.address}
          onChange={handleChange}
        />
        {errors.address && <p className={styles['error']}>{errors.address}</p>}
      </div>
      <div className={styles['form-field']}>
        <Selector
          options={districts.map((district) => ({
            value: district,
            label: district,
          })) as SelectorOption[]}
          onChange={(value) =>
            handleChange({ target: { name: 'district', value } } as React.ChangeEvent<
              HTMLSelectElement
            >)
          }
        />
        {errors.district && <p className={styles['error']}>{errors.district}</p>}
      </div>
      <div className={styles['form-field']}>
        <input
          type="text"
          name="reference"
          placeholder="Reference"
          value={formData.reference}
          onChange={handleChange}
        />
        {errors.reference && <p className={styles['error']}>{errors.reference}</p>}
      </div>
    </Form>
  );
});

export default ShippingAddressForm;
