import React, { useState } from 'react';
import { FaUserAlt, FaShoppingCart, FaSearch } from 'react-icons/fa';
import { useCart } from '@/context/useCart'; 
import { Link } from 'react-router-dom'; // Importa Link para navegación
import styles from './Navbar.module.css'; 

interface NavbarProps {
  onSearch: (query: string) => void; 
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const [searchText, setSearchText] = useState<string>(''); 
  const { cart } = useCart();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchText(value);
    onSearch(value);
  };

  return (
    <nav className={styles['navbar']}>
      {/* Navegación al home (ShopPage) */}
      <Link to="/shop" className={styles['navbar__logo']}>
        EdinRose
      </Link>

      {/* Barra de búsqueda */}
      <div className={styles['navbar__search']}>
        <input
          type="text"
          className={styles['navbar__search_bar']}
          placeholder="Search for products..."
          value={searchText}
          onChange={handleInputChange}
        />
        <FaSearch className={styles['navbar__search_icon']} />
      </div>

      {/* Iconos de usuario y carrito */}
      <div className={styles['navbar__icons']}>
        <FaUserAlt className={styles['navbar__icon']} />
        
        {/* Navegación al carrito */}
        <Link to="/cart" className={styles['navbar__cart']}>
          <FaShoppingCart className={styles['navbar__icon']} />
          <span className={styles['navbar__cart_count']}>{cart.length}</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
