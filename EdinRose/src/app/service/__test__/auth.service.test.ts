import fetchMock from 'jest-fetch-mock';
import { authService } from '../auth.service';
import { ERROR_MESSAGES } from '@/app/domain/constants/errorMessages';

describe('authService', () => {
  const API_URL = 'https://dummyjson.com/auth/login';

  beforeEach(() => {
    fetchMock.enableMocks();
    fetchMock.resetMocks();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('debería retornar token y username en un inicio de sesión exitoso', async () => {
    const mockResponse = {
      token: 'fake-token',
      username: 'testuser',
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

    const result = await authService.login({ username: 'testuser', password: 'password123' });

    expect(fetchMock).toHaveBeenCalledWith(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'testuser', password: 'password123' }),
    });

    expect(result).toEqual(mockResponse);
  });

  it('debería lanzar un error cuando las credenciales son inválidas (401)', async () => {
    fetchMock.mockResponseOnce('', { status: 401 });

    await expect(
      authService.login({ username: 'wronguser', password: 'wrongpassword' })
    ).rejects.toThrow(ERROR_MESSAGES.INVALID_CREDENTIALS);

    expect(fetchMock).toHaveBeenCalledWith(API_URL, expect.anything());
  });

  it('debería lanzar un error genérico en caso de fallo (500)', async () => {
    fetchMock.mockResponseOnce('', { status: 500, statusText: 'Internal Server Error' });

    await expect(
      authService.login({ username: 'testuser', password: 'password123' })
    ).rejects.toThrow(ERROR_MESSAGES.LOGIN_FAILED);

    expect(fetchMock).toHaveBeenCalledWith(API_URL, expect.anything());
  });

  it('debería manejar errores de red correctamente', async () => {
    fetchMock.mockRejectOnce(new Error('Network Error'));

    await expect(
      authService.login({ username: 'testuser', password: 'password123' })
    ).rejects.toThrow('Network Error');

    expect(fetchMock).toHaveBeenCalledWith(API_URL, expect.anything());
  });
});
