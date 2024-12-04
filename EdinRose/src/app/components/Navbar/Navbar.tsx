import React, { useState, useEffect } from 'react';
import { FaUserAlt, FaShoppingCart, FaSearch } from 'react-icons/fa';
import { useCart } from '@/app/context/useCart';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoutes } from '@/app/routes';
import styles from './Navbar.module.css';

interface NavbarProps {
  onSearch: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const [searchText, setSearchText] = useState<string>('');
  const [username, setUsername] = useState<string | null>(null); // Estado para almacenar el username
  const navigate = useNavigate();

  const { state } = useCart();
  const cartCount = state.items.reduce((total, item) => total + item.quantity, 0);

  // Recuperar el username desde localStorage al cargar el componente
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    setUsername(storedUsername);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken'); // Eliminar el token
    localStorage.removeItem('username'); // Eliminar el username
    setUsername(null); // Limpiar el estado del username
    navigate(AppRoutes.LOGIN); // Redirigir al login
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchText(value);
    onSearch(value);
  };

  return (
    <nav className={styles['navbar']}>
      <Link to="/shop" className={styles['navbar__logo']}>
        EdinRose
      </Link>

      <div className={styles['navbar__search']}>
        <input
          type="text"
          className={styles['navbar__search_bar']}
          placeholder="Search for products..."
          aria-label="Search for products..."
          value={searchText}
          onChange={handleInputChange}
        />
        <FaSearch
          className={styles['navbar__search_icon']}
          role="img"
          aria-label="Search"
        />
      </div>

      <div className={styles['navbar__icons']}>
        {username ? (
          <>
            <span className={styles['navbar__welcome']}>
              Bienvenido: {username}
            </span>
            <button
              className={styles['navbar__logout']}
              onClick={handleLogout}
            >
              Cerrar Sesión
            </button>
          </>
        ) : (
          <FaUserAlt className={styles['navbar__icon']} />
        )}
        <Link to="/cart" className={styles['navbar__cart']} aria-label="Cart">
          <FaShoppingCart className={styles['navbar__icon']} />
          <span className={styles['navbar__cart_count']}>{cartCount}</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
