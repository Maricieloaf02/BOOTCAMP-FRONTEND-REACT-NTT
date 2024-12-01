import React, { useState } from 'react';
import { FaUserAlt, FaShoppingCart, FaSearch } from 'react-icons/fa';
import { useCart } from '@/app/context/useCart';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

interface NavbarProps {
  onSearch: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const [searchText, setSearchText] = useState<string>('');

  const { state } = useCart();
  const cartCount = state.items.reduce((total, item) => total + item.quantity, 0);

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
        <FaUserAlt className={styles['navbar__icon']} />
        <Link to="/cart" className={styles['navbar__cart']} aria-label="Cart">
          <FaShoppingCart className={styles['navbar__icon']} />
          <span className={styles['navbar__cart_count']}>{cartCount}</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
