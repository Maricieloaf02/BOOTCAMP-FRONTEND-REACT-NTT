import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/app/service/auth.service';
import { AppRoutes } from '@/app/routes';
import { ERROR_MESSAGES } from '@/app/domain/constants/errorMessages';
import { getUsernameByEmail } from '@/shared/utils/emailToUsernameMap';
import './LoginPage.module.css';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
  
    if (!email || !password) {
      setError(ERROR_MESSAGES.FIELDS_REQUIRED);
      return;
    }
  
    const mappedUsername = getUsernameByEmail(email);
    if (!mappedUsername) {
      setError(ERROR_MESSAGES.EMAIL_NOT_REGISTERED);
      return;
    }
  
    try {
      const { token, username } = await authService.login({
        username: mappedUsername,
        password,
      });
  
      localStorage.setItem('accessToken', token);
      localStorage.setItem('username', username);
  
      navigate(AppRoutes.SHOP);
    } catch (err) {
      setError((err as Error).message || ERROR_MESSAGES.LOGIN_FAILED);
    }
  };
  

  return (
    <div className="login-page">
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ingrese su correo electrónico"
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
          />
        </div>
        {error && <p role="alert" className="error-message">{error}</p>}
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default LoginPage;
