import { LoginRequest, LoginResponse } from '@/app/domain/Auth';
import { ERROR_MESSAGES } from '@/app/domain/constants/errorMessages';

export const authService = {
  login: async ({ username, password }: LoginRequest): Promise<LoginResponse> => {
    const response = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error(ERROR_MESSAGES.INVALID_CREDENTIALS);
      }
      throw new Error(ERROR_MESSAGES.LOGIN_FAILED);
    }

    return response.json();
  },

  validateEmail: async (email: string): Promise<string | null> => {
    const response = await fetch(`https://dummyjson.com/users`);
    if (!response.ok) {
      throw new Error('Error al validar el correo electrónico.');
    }

    const data = await response.json();
    const user = data.users.find((user: { email: string }) => user.email === email);

    return user ? user.username : null;
  },
};
