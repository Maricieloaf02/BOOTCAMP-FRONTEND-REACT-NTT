import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "@/app/service/auth.service";
import { AppRoutes } from "@/app/routes";
import { ERROR_MESSAGES } from "@/app/domain/constants/errorMessages";
import ForgotPasswordModal from "@/app/components/ForgotPasswordModal/ForgotPasswordModal";
import "./LoginPage.module.css";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError(ERROR_MESSAGES.FIELDS_REQUIRED);
      return;
    }

    try {
      const username = await authService.validateEmail(email);

      if (!username) {
        setError(ERROR_MESSAGES.EMAIL_NOT_REGISTERED);
        return;
      }

      setIsLoading(true);
      const { token } = await authService.login({
        username,
        password,
      });

      localStorage.setItem("accessToken", token);
      localStorage.setItem("username", username);

      navigate(AppRoutes.SHOP);
    } catch (err) {
      setIsLoading(false);
      setError((err as Error).message || ERROR_MESSAGES.LOGIN_FAILED);
    }
  };

  return (
    <div className="login-page">
      <h1>Iniciar Sesión</h1>
      {isLoading ? (
        <p>Redireccionando...</p>
      ) : (
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingrese su correo electrónico"
              disabled={isLoading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingrese su contraseña"
              disabled={isLoading}
            />
          </div>
          {error && <p role="alert" className="error-message">{error}</p>}
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Validando..." : "Iniciar Sesión"}
          </button>
          <p>
            <a
              href="#"
              onClick={() => setShowForgotPasswordModal(true)}
              aria-label="Olvidé mi contraseña"
            >
              Olvidé mi contraseña
            </a>
          </p>
        </form>
      )}
      {showForgotPasswordModal && (
        <ForgotPasswordModal onClose={() => setShowForgotPasswordModal(false)} />
      )}
    </div>
  );
};

export default LoginPage;
