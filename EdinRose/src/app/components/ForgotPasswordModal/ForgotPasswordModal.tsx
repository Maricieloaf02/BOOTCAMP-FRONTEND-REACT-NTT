import React, { useState } from 'react';
import './ForgotPasswordModal.module.css';

interface ForgotPasswordModalProps {
  onClose: () => void;
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!email) {
      setError('Por favor ingrese un correo.');
      return;
    }

    if (!validateEmail(email)) {
      setError('El formato del correo no es válido.');
      return;
    }

    // Simulamos el envío de un correo (puedes reemplazar esto con un fetch)
    setSuccessMessage('Se envió la información al correo ingresado.');
    setEmail('');
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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
          />
          {error && <p className="error-message">{error}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}
          <button type="submit">Enviar</button>
          <button type="button" onClick={onClose}>
            Cerrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
