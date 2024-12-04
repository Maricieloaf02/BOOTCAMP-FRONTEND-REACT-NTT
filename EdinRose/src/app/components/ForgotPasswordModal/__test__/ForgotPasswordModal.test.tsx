/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent } from "@testing-library/react";
import ForgotPasswordModal from "../ForgotPasswordModal";
import { useEmailValidation } from "@/shared/hooks/useEmailValidation";

jest.mock("@/shared/hooks/useEmailValidation");

const mockUseEmailValidation = useEmailValidation as jest.MockedFunction<typeof useEmailValidation>;

describe("ForgotPasswordModal", () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseEmailValidation.mockReturnValue({
      validateEmail: jest.fn(),
      isValidating: false,
      validationError: null,
    });
  });

  it("debería renderizar el modal correctamente", () => {
    render(<ForgotPasswordModal onClose={mockOnClose} />);

    expect(screen.getByText("Restablecer Contraseña")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Ingrese su correo electrónico")).toBeInTheDocument();
    expect(screen.getByText("Enviar")).toBeInTheDocument();
    expect(screen.getByText("Cerrar")).toBeInTheDocument();
  });

  it("debería mostrar un error si el correo no es válido", async () => {
    const mockValidateEmail = jest.fn().mockResolvedValue(false);
    mockUseEmailValidation.mockReturnValue({
      validateEmail: mockValidateEmail,
      isValidating: false,
      validationError: "El correo no está registrado.",
    });

    render(<ForgotPasswordModal onClose={mockOnClose} />);

    const emailInput = screen.getByPlaceholderText("Ingrese su correo electrónico");
    const submitButton = screen.getByText("Enviar");

    fireEvent.change(emailInput, { target: { value: "correo_invalido" } });
    fireEvent.click(submitButton);

    expect(await screen.findByText("El correo no está registrado.")).toBeInTheDocument();
    expect(mockValidateEmail).toHaveBeenCalledWith("correo_invalido");
  });

  it("debería mostrar un mensaje de éxito si el correo es válido", async () => {
    const mockValidateEmail = jest.fn().mockResolvedValue(true);
    mockUseEmailValidation.mockReturnValue({
      validateEmail: mockValidateEmail,
      isValidating: false,
      validationError: null,
    });

    render(<ForgotPasswordModal onClose={mockOnClose} />);

    const emailInput = screen.getByPlaceholderText("Ingrese su correo electrónico");
    const submitButton = screen.getByText("Enviar");

    fireEvent.change(emailInput, { target: { value: "correo@valido.com" } });
    fireEvent.click(submitButton);

    expect(await screen.findByText("Se envió la información al correo ingresado.")).toBeInTheDocument();
    expect(mockValidateEmail).toHaveBeenCalledWith("correo@valido.com");
  });

  it("debería cerrar el modal al hacer clic en el botón 'Cerrar'", () => {
    render(<ForgotPasswordModal onClose={mockOnClose} />);

    const closeButton = screen.getByText("Cerrar");
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("debería deshabilitar el input y botón cuando se está validando", () => {
    mockUseEmailValidation.mockReturnValue({
      validateEmail: jest.fn(),
      isValidating: true,
      validationError: null,
    });

    render(<ForgotPasswordModal onClose={mockOnClose} />);

    const emailInput = screen.getByPlaceholderText("Ingrese su correo electrónico");
    const submitButton = screen.getByText("Enviar");

    expect(emailInput).toBeDisabled();
    expect(submitButton).toBeDisabled();
  });
});
