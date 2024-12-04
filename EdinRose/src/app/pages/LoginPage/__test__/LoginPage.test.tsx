/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import fetchMock from 'jest-fetch-mock';
import LoginPage from '@/app/pages/LoginPage';
import { ERROR_MESSAGES } from '@/app/domain/constants/errorMessages';

beforeEach(() => {
  fetchMock.resetMocks();
  jest.clearAllMocks();
});

describe('LoginPage', () => {
  it('debería renderizar correctamente los elementos del formulario', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    expect(screen.getByText(/iniciar sesión/i)).toBeInTheDocument();
    expect(screen.getByText(/olvidé mi contraseña/i)).toBeInTheDocument();
  });

  it('debería mostrar un error si los campos están vacíos', async () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/iniciar sesión/i));

    expect(
      await screen.findByText(ERROR_MESSAGES.FIELDS_REQUIRED)
    ).toBeInTheDocument();
  });

  it('debería mostrar un error si el correo no está registrado', async () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/correo electrónico/i), {
      target: { value: 'notregistered@test.com' },
    });
    fireEvent.change(screen.getByLabelText(/contraseña/i), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByText(/iniciar sesión/i));

    expect(
      await screen.findByText(ERROR_MESSAGES.EMAIL_NOT_REGISTERED)
    ).toBeInTheDocument();
  });

  it('debería manejar un inicio de sesión exitoso', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({ token: 'fake-token', username: 'testuser' })
    );

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/correo electrónico/i), {
      target: { value: 'user@test.com' },
    });
    fireEvent.change(screen.getByLabelText(/contraseña/i), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByText(/iniciar sesión/i));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        'https://dummyjson.com/auth/login',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ username: 'user@test.com', password: 'password123' }),
        })
      );
    });
  });

  it('debería manejar un error de credenciales inválidas', async () => {
    fetchMock.mockRejectOnce(new Error(ERROR_MESSAGES.INVALID_CREDENTIALS));

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/correo electrónico/i), {
      target: { value: 'user@test.com' },
    });
    fireEvent.change(screen.getByLabelText(/contraseña/i), {
      target: { value: 'wrongpassword' },
    });
    fireEvent.click(screen.getByText(/iniciar sesión/i));

    expect(
      await screen.findByText(ERROR_MESSAGES.INVALID_CREDENTIALS)
    ).toBeInTheDocument();
  });

  it('debería manejar un error genérico del servidor', async () => {
    fetchMock.mockRejectOnce(new Error(ERROR_MESSAGES.LOGIN_FAILED));

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/correo electrónico/i), {
      target: { value: 'user@test.com' },
    });
    fireEvent.change(screen.getByLabelText(/contraseña/i), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByText(/iniciar sesión/i));

    expect(
      await screen.findByText(ERROR_MESSAGES.LOGIN_FAILED)
    ).toBeInTheDocument();
  });
});
