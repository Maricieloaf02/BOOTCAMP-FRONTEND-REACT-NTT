import React, { useState } from 'react';
import { FaUserAlt, FaShoppingCart, FaSearch } from 'react-icons/fa';
import { useCart } from '@/context/useCart'; 
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
      <div className={styles['navbar__logo']}>EdinRose</div>

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

      <div className={styles['navbar__icons']}>
        <FaUserAlt className={styles['navbar__icon']} />
        <div className={styles['navbar__cart']}>
          <FaShoppingCart className={styles['navbar__icon']} />
          <span className={styles['navbar__cart_count']}>{cart.length}</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
