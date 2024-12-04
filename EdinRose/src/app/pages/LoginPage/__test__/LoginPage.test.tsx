import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { authService } from '@/app/service/auth.service';
import { ERROR_MESSAGES } from '@/app/domain/constants/errorMessages';
import { useEmailValidation } from '@/shared/hooks/useEmailValidation';
import LoginPage from '../LoginPage';

interface UseEmailValidationMock {
  validateEmail: jest.Mock<Promise<boolean>, [string]>;
  isValidating: boolean;
  validationError: string | null;
}

jest.mock('@/app/service/auth.service');
jest.mock('@/shared/hooks/useEmailValidation');

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('LoginPage', () => {
  let mockUseEmailValidation: UseEmailValidationMock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseEmailValidation = {
      validateEmail: jest.fn(),
      isValidating: false,
      validationError: null,
    };
    (useEmailValidation as jest.Mock).mockReturnValue(mockUseEmailValidation);
  });

  it('debería mostrar errores si los campos están vacíos', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));

    expect(screen.getByRole('alert')).toHaveTextContent(ERROR_MESSAGES.FIELDS_REQUIRED);
  });

  it('debería mostrar error si el correo no está registrado', async () => {
    mockUseEmailValidation.validateEmail.mockResolvedValue(false);
    mockUseEmailValidation.validationError = ERROR_MESSAGES.EMAIL_NOT_REGISTERED;

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

    fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));

    expect(await screen.findByRole('alert')).toHaveTextContent(ERROR_MESSAGES.EMAIL_NOT_REGISTERED);
  });

  it('debería manejar un inicio de sesión exitoso', async () => {
    mockUseEmailValidation.validateEmail.mockResolvedValue(true);
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

    fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));

    expect(await screen.findByText(/redireccionando/i)).toBeInTheDocument();
    expect(mockNavigate).toHaveBeenCalledWith('/shop');
  });

  it('debería manejar un error de credenciales inválidas', async () => {
    mockUseEmailValidation.validateEmail.mockResolvedValue(true);
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

    fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));

    expect(await screen.findByRole('alert')).toHaveTextContent(ERROR_MESSAGES.INVALID_CREDENTIALS);
  });

  it('debería manejar el estado de validación del correo', () => {
    mockUseEmailValidation.isValidating = true;

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeDisabled();
    expect(screen.getByText(/validando/i)).toBeInTheDocument();
  });
});
  