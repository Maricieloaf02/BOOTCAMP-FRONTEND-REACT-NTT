import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService, AuthError } from "@/app/service/auth.service";
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

  // el login solo debe recibir el usuario y password no correo
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError(ERROR_MESSAGES.FIELDS_REQUIRED);
      return;
    }

    try {
      setIsLoading(true);
      const username = await authService.validateEmail(email);

      if (!username) {
        setError(ERROR_MESSAGES.EMAIL_NOT_REGISTERED);
        return;
      }

      try {
        const { token } = await authService.login({
          username,
          password,
        });

        // el access token se guarda como undefined en el storage
        localStorage.setItem("accessToken", token);
        localStorage.setItem("username", username);
        navigate(AppRoutes.SHOP);
      } catch (loginError) {
        if (loginError instanceof AuthError && loginError.code === 400) {
          setError(ERROR_MESSAGES.INVALID_CREDENTIALS);
        } else {
          setError("An unexpected error occurred. Please try again.");
        }
      }
    } catch {
      setError("Error validating email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            disabled={isLoading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            disabled={isLoading}
          />
        </div>
        {error && <p role="alert" className="error-message">{error}</p>}
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Validating..." : "Login"}
        </button>
        <p>
          <a
            href="#"
            onClick={() => setShowForgotPasswordModal(true)}
            aria-label="Forgot my password"
          >
            Forgot my password
          </a>
        </p>
      </form>
      {showForgotPasswordModal && (
        <ForgotPasswordModal onClose={() => setShowForgotPasswordModal(false)} />
      )}
    </div>
  );
};

export default LoginPage;
