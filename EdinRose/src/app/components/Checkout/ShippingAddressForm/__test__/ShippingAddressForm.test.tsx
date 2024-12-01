/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent, act } from '@testing-library/react';
import ShippingAddressForm from '../ShippingAddressForm';
import useDistricts from '@/shared/hooks/useDistricts';
import { waitFor } from '@testing-library/react';
// import styles from '../ShippingAddressForm.module.css';

jest.mock('@/shared/hooks/useDistricts', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('ShippingAddressForm', () => {
  let mockOnChange: jest.Mock;

  beforeEach(() => {
    mockOnChange = jest.fn();
    (useDistricts as jest.Mock).mockReturnValue({
      districts: ['District 1', 'District 2'],
      loading: false,
      error: null,
    });
  });

  it('debería renderizar campos vacíos inicialmente', () => {
    render(<ShippingAddressForm onChange={mockOnChange} />);

    const addressInput = screen.getByPlaceholderText('Street Address');
    const referenceInput = screen.getByPlaceholderText('Reference');
    const districtSelector = screen.getByRole('combobox');

    expect(addressInput).toHaveValue('');
    expect(referenceInput).toHaveValue('');
    expect(districtSelector).toHaveValue('');
  });

  it('debería mostrar distritos correctamente', () => {
    render(<ShippingAddressForm onChange={mockOnChange} />);

    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(3); // Default + 2 distritos
    expect(options[1]).toHaveTextContent('District 1');
    expect(options[2]).toHaveTextContent('District 2');
  });

  it('debería manejar validación y mostrar errores', async () => {
    // Renderizamos el componente
    render(<ShippingAddressForm onChange={jest.fn()} />);
  
    // Obtenemos el input del address
    const addressInput = screen.getByPlaceholderText('Street Address');
  
    // Simulamos el cambio y la pérdida de foco en el input
    await act(async () => {
      fireEvent.change(addressInput, { target: { value: '' } });
      fireEvent.blur(addressInput);
    });
  
    // Usamos screen.debug para depurar el DOM
    screen.debug();
  
    // Esperamos que aparezca el mensaje de error en el DOM
    await waitFor(() => {
      const errorElement = screen.getByText('Este campo es obligatorio.');
      expect(errorElement).toBeInTheDocument(); // Confirmamos que el error está en el DOM
    });
  
    // Verificamos que el input tiene la clase de error
    expect(addressInput).toHaveClass('error');
  });
  
  
  
  
  it('debería validar todo el formulario correctamente', async () => {
    const refMock = { current: null } as React.MutableRefObject<{ validateForm: () => boolean } | null>; // Ref tipado
  
    // Renderizar el formulario con la referencia mock
    await act(async () => {
      render(<ShippingAddressForm onChange={mockOnChange} ref={refMock} />);
    });
  
    // Simular la entrada de datos válidos
    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText('Street Address'), {
        target: { value: '123 Main St' },
      });
      fireEvent.change(screen.getByPlaceholderText('Reference'), {
        target: { value: 'Near Park' },
      });
      fireEvent.change(screen.getByRole('combobox'), {
        target: { value: 'District 1' },
      });
    });
  
    // Llamar a `validateForm` desde el ref y comprobar el resultado
    const isValid = refMock.current?.validateForm();
    expect(isValid).toBe(true);
  });
  
  
});
