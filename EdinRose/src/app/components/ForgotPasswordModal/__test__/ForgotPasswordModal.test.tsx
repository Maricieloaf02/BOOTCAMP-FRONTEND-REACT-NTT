import { render, screen, fireEvent } from '@testing-library/react';
import ForgotPasswordModal from '../ForgotPasswordModal';
import { getUsernameByEmail } from '@/shared/utils/emailToUsernameMap';

jest.mock('@/shared/utils/emailToUsernameMap', () => ({
  getUsernameByEmail: jest.fn(),
}));

describe('ForgotPasswordModal', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debería mostrar un error si el campo está vacío', () => {
    render(<ForgotPasswordModal onClose={mockOnClose} />);

    fireEvent.click(screen.getByText(/enviar/i));

    expect(screen.getByRole('alert')).toHaveTextContent('Por favor ingrese un correo.');
  });

  it('debería mostrar un error si el formato del correo es inválido', () => {
    render(<ForgotPasswordModal onClose={mockOnClose} />);

    fireEvent.change(screen.getByLabelText(/correo electrónico/i), {
      target: { value: 'correo-invalido' },
    });
    fireEvent.click(screen.getByText(/enviar/i));

    expect(screen.getByRole('alert')).toHaveTextContent('El formato del correo no es válido.');
  });

  it('debería mostrar un error si el correo no está registrado', () => {
    (getUsernameByEmail as jest.Mock).mockReturnValue(undefined);

    render(<ForgotPasswordModal onClose={mockOnClose} />);

    fireEvent.change(screen.getByLabelText(/correo electrónico/i), {
      target: { value: 'nonexistent@example.com' },
    });
    fireEvent.click(screen.getByText(/enviar/i));

    expect(screen.getByRole('alert')).toHaveTextContent('El correo no está registrado.');
  });

  it('debería mostrar un mensaje de éxito si el correo es válido y registrado', () => {
    (getUsernameByEmail as jest.Mock).mockReturnValue('validuser');

    render(<ForgotPasswordModal onClose={mockOnClose} />);

    fireEvent.change(screen.getByLabelText(/correo electrónico/i), {
      target: { value: 'valid@example.com' },
    });
    fireEvent.click(screen.getByText(/enviar/i));

    expect(screen.getByText(/se envió la información al correo ingresado./i)).toBeInTheDocument();
  });
});
