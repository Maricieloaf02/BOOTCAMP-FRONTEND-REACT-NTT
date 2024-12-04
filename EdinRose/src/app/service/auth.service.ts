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
};
