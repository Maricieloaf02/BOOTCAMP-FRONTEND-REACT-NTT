import { LoginRequest, LoginResponse } from "@/app/domain/Auth";
import { ERROR_MESSAGES } from "@/app/domain/constants/errorMessages";

// auth.service.ts
class AuthError extends Error {
  code?: number;

  constructor(message: string, code?: number) {
    super(message);
    this.code = code;
    this.name = "AuthError";
  }
}

// Exportar AuthError
export { AuthError };

export const authService = {
  login: async ({ username, password }: LoginRequest): Promise<LoginResponse> => {
    const response = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new AuthError(ERROR_MESSAGES.INVALID_CREDENTIALS, 401);
      }
      throw new AuthError("Error al procesar la solicitud.", response.status);
    }

    return response.json();
  },

  // esto no es correcto, no deber'ia validarse de esta manera
  validateEmail: async (email: string): Promise<string | null> => {
    const response = await fetch("https://dummyjson.com/users");
    if (!response.ok) {
      throw new Error("Error al validar el correo electrónico.");
    }

    const data = await response.json();
    const user = data.users.find((user: { email: string }) => user.email === email);

    return user ? user.username : null;
  },
};
