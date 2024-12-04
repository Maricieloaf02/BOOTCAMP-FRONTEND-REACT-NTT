import React, { useState } from "react";
import { useEmailValidation } from "@/shared/hooks/useEmailValidation";
import "./ForgotPasswordModal.module.css";

interface ForgotPasswordModalProps {
  onClose: () => void;
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { validateEmail, isValidating, validationError } = useEmailValidation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage("");

    const isValidEmail = await validateEmail(email);
    if (!isValidEmail) {
      return;
    }

    setSuccessMessage("Se envió la información al correo ingresado.");
    setEmail("");
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Restablecer Contraseña</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Correo Electrónico</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ingrese su correo electrónico"
            disabled={isValidating}
          />
          {validationError && <p className="error-message">{validationError}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}
          <button type="submit" disabled={isValidating}>
            {isValidating ? "Validando..." : "Enviar"}
          </button>
          <button type="button" onClick={onClose}>
            Cerrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
