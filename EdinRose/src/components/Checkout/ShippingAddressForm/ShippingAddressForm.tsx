import React, { useState } from 'react';
import Form from '@/shared/components/Form';
import Selector, { SelectorOption } from '@/components/Selector';
import useDistricts from '@/shared/hooks/useDistricts';
import { ShippingAddressFormData } from '@/domain/ShippingAddress';

interface ShippingAddressFormProps {
  onChange: (data: ShippingAddressFormData) => void;
}

const ShippingAddressForm: React.FC<ShippingAddressFormProps> = ({ onChange }) => {
  const { districts, loading, error } = useDistricts('/districts.json'); // Desestructuramos correctamente
  const [formData, setFormData] = useState<ShippingAddressFormData>({
    address: '',
    district: '',
    reference: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
    onChange(updatedData);
  };

  if (loading) return <p>Cargando distritos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Form title="Shipping Address">
      <input
        type="text"
        name="address"
        placeholder="Street Address"
        value={formData.address}
        onChange={handleChange}
      />
      <Selector
        options={districts.map((district: string) => ({
          value: district,
          label: district,
        })) as SelectorOption[]}
        onChange={(value) =>
          handleChange({ target: { name: 'district', value } } as React.ChangeEvent<
            HTMLSelectElement
          >)
        }
      />
      <input
        type="text"
        name="reference"
        placeholder="Reference"
        value={formData.reference}
        onChange={handleChange}
      />
    </Form>
  );
};

export default ShippingAddressForm;
