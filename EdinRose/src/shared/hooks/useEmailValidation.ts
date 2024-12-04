import { useState } from "react";
import { authService } from "@/app/service/auth.service";

export const useEmailValidation = () => {
  const [isValidating, setIsValidating] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const validateEmail = async (email: string): Promise<boolean> => {
    setIsValidating(true);
    setValidationError(null);

    try {
      const username = await authService.validateEmail(email);
      setIsValidating(false);
      if (!username) {
        setValidationError("El correo no está registrado.");
        return false;
      }
      return true;
    } catch (err) {
      setIsValidating(false);
      setValidationError((err as Error).message || "Error al validar el correo.");
      return false;
    }
  };

  return { isValidating, validationError, validateEmail };
};
