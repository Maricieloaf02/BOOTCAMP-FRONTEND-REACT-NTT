import { renderHook, act } from "@testing-library/react-hooks";
import { useEmailValidation } from "@/shared/hooks/useEmailValidation";
import { authService } from "@/app/service/auth.service";

jest.mock("@/app/service/auth.service");

describe("useEmailValidation", () => {
  const mockValidateEmail = authService.validateEmail as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("debería devolver true si el email está registrado", async () => {
    mockValidateEmail.mockResolvedValueOnce("testuser");

    const { result } = renderHook(() => useEmailValidation());

    await act(async () => {
      const isValid = await result.current.validateEmail("test@example.com");
      expect(isValid).toBe(true);
    });

    expect(result.current.isValidating).toBe(false);
    expect(result.current.validationError).toBeNull();
    expect(mockValidateEmail).toHaveBeenCalledWith("test@example.com");
  });

  it("debería devolver false si el email no está registrado", async () => {
    mockValidateEmail.mockResolvedValueOnce(null);

    const { result } = renderHook(() => useEmailValidation());

    await act(async () => {
      const isValid = await result.current.validateEmail("nonexistent@example.com");
      expect(isValid).toBe(false);
    });

    expect(result.current.isValidating).toBe(false);
    expect(result.current.validationError).toBe("El correo no está registrado.");
    expect(mockValidateEmail).toHaveBeenCalledWith("nonexistent@example.com");
  });

  it("debería manejar errores correctamente", async () => {
    mockValidateEmail.mockRejectedValueOnce(new Error("Network Error"));

    const { result } = renderHook(() => useEmailValidation());

    await act(async () => {
      const isValid = await result.current.validateEmail("error@example.com");
      expect(isValid).toBe(false);
    });

    expect(result.current.isValidating).toBe(false);
    expect(result.current.validationError).toBe("Network Error");
    expect(mockValidateEmail).toHaveBeenCalledWith("error@example.com");
  });

  it("debería manejar varios intentos de validación", async () => {
    mockValidateEmail
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce("testuser");

    const { result } = renderHook(() => useEmailValidation());

    // Primer intento fallido
    await act(async () => {
      const isValid = await result.current.validateEmail("nonexistent@example.com");
      expect(isValid).toBe(false);
    });
    expect(result.current.validationError).toBe("El correo no está registrado.");

    // Segundo intento exitoso
    await act(async () => {
      const isValid = await result.current.validateEmail("test@example.com");
      expect(isValid).toBe(true);
    });
    expect(result.current.validationError).toBeNull();
  });
});
