import React, { useState } from 'react';
import ForgotPasswordModal from '@/app/components/ForgotPasswordModal/ForgotPasswordModal';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '@/app/routes';
import { getUsernameByEmail } from '@/shared/utils/emailToUsernameMap'; // Importamos el mapeo
import './LoginPage.module.css';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Por favor complete todos los campos.');
      return;
    }

    // Buscar el username asociado al email
    const username = getUsernameByEmail(email);

    if (!username) {
      setError('El correo electrónico no está registrado.');
      return;
    }

    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }), // Enviamos el username obtenido
      });

      if (!response.ok) {
        throw new Error('Credenciales inválidas');
      }

      const data = await response.json();
      localStorage.setItem('accessToken', data.token);
      localStorage.setItem('username', username);
      navigate(AppRoutes.SHOP);
    } catch (err) {
      setError((err as Error).message || 'Error al iniciar sesión.');
    }
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

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
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Iniciar Sesión</button>
      </form>
      <a href="#forgot-password" onClick={openModal}>
        Olvidé mi contraseña
      </a>
      {showModal && <ForgotPasswordModal onClose={closeModal} />}
    </div>
  );
};

export default LoginPage;
