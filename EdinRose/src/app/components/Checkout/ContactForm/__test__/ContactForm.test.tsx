/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent } from '@testing-library/react';
import ContactForm from '@/app/components/Checkout/ContactForm';

describe('ContactForm', () => {
  let mockOnChange: jest.Mock;

  beforeEach(() => {
    mockOnChange = jest.fn();
  });

  it('debería renderizar el formulario con campos vacíos inicialmente', () => {
    render(<ContactForm onChange={mockOnChange} errors={{}} />);

    const firstNameInput = screen.getByPlaceholderText('First name');
    const lastNameInput = screen.getByPlaceholderText('Last name');
    const phoneInput = screen.getByPlaceholderText('Phone number');

    expect(firstNameInput).toHaveValue('');
    expect(lastNameInput).toHaveValue('');
    expect(phoneInput).toHaveValue('');
  });

  it('debería llamar a onChange al ingresar datos válidos', () => {
    render(<ContactForm onChange={mockOnChange} errors={{}} />);

    const firstNameInput = screen.getByPlaceholderText('First name');
    fireEvent.change(firstNameInput, { target: { value: 'John', name: 'firstName' } });

    expect(mockOnChange).toHaveBeenCalledWith({
      firstName: 'John',
      lastName: '',
      phone: '',
    });
  });

  it('debería mostrar errores si los datos son inválidos', () => {
    render(<ContactForm onChange={mockOnChange} errors={{ firstName: 'Required' }} />);

    const errorText = screen.getByText('Required');
    expect(errorText).toBeInTheDocument();
  });

  it('debería prevenir caracteres no válidos en el campo phone', () => {
    render(<ContactForm onChange={mockOnChange} errors={{}} />);

    const phoneInput = screen.getByPlaceholderText('Phone number');
    fireEvent.change(phoneInput, { target: { value: '123abc' } });

    expect(mockOnChange).toHaveBeenCalledWith({
      firstName: '',
      lastName: '',
      phone: '123', // Solo números válidos
    });
    expect(phoneInput).toHaveValue('123');
  });

  it('debería limitar el campo phone a 9 caracteres', () => {
    render(<ContactForm onChange={mockOnChange} errors={{}} />);

    const phoneInput = screen.getByPlaceholderText('Phone number');
    fireEvent.change(phoneInput, { target: { value: '1234567890' } });

    expect(mockOnChange).toHaveBeenCalledWith({
      firstName: '',
      lastName: '',
      phone: '123456789', // Máximo 9 caracteres
    });
    expect(phoneInput).toHaveValue('123456789');
  });
});
