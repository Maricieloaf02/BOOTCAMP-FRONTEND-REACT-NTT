/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { authService } from '@/app/service/auth.service';
import { ERROR_MESSAGES } from '@/app/domain/constants/errorMessages';
import { getUsernameByEmail } from '@/shared/utils/emailToUsernameMap';
import LoginPage from '../LoginPage';

jest.mock('@/app/service/auth.service');
jest.mock('@/shared/utils/emailToUsernameMap');

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('LoginPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debería mostrar errores si los campos están vacíos', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
    fireEvent.click(submitButton);

    expect(screen.getByRole('alert')).toHaveTextContent(ERROR_MESSAGES.FIELDS_REQUIRED);
  });

  it('debería mostrar error si el correo no está registrado', () => {
    (getUsernameByEmail as jest.Mock).mockReturnValue(undefined);

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/correo electrónico/i), {
      target: { value: 'nonexistent@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/contraseña/i), {
      target: { value: 'password123' },
    });

    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
    fireEvent.click(submitButton);

    expect(screen.getByRole('alert')).toHaveTextContent(ERROR_MESSAGES.EMAIL_NOT_REGISTERED);
  });

  it('debería manejar un inicio de sesión exitoso', async () => {
    (getUsernameByEmail as jest.Mock).mockReturnValue('testuser');
    (authService.login as jest.Mock).mockResolvedValue({
      token: 'fake-token',
      username: 'testuser',
    });
  
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );
  
    fireEvent.change(screen.getByLabelText(/correo electrónico/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/contraseña/i), {
      target: { value: 'password123' },
    });
  
    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
    fireEvent.click(submitButton);
  
    // Esperar que se muestre el texto "Redireccionando..."
    expect(await screen.findByText(/redireccionando/i)).toBeInTheDocument();
  
    // Verificar que la navegación ocurrió
    expect(mockNavigate).toHaveBeenCalledWith('/shop');
  });
  
  it('debería manejar un error de credenciales inválidas', async () => {
    (getUsernameByEmail as jest.Mock).mockReturnValue('testuser');
    (authService.login as jest.Mock).mockRejectedValue(
      new Error(ERROR_MESSAGES.INVALID_CREDENTIALS)
    );

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/correo electrónico/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/contraseña/i), {
      target: { value: 'wrongpassword' },
    });

    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
    fireEvent.click(submitButton);

    expect(await screen.findByRole('alert')).toHaveTextContent(ERROR_MESSAGES.INVALID_CREDENTIALS);
  });
});
