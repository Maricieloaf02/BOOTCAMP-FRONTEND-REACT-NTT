import React from 'react';
import './Navbar.module.css'; // Cambia el uso de CSS modules a un archivo global
import { FaUserAlt, FaShoppingBag, FaSearch } from 'react-icons/fa';

const Navbar: React.FC = () => {
  const cartCount: number = 2; // Cantidad de elementos en el carrito

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar__logo">EdinRose</div>

      {/* Search Bar */}
      <div className="navbar__search">
        <input
          type="text"
          className="navbar__search_bar"
          placeholder="Search for products..."
        />
        <FaSearch className="navbar__search_icon" />
      </div>

      {/* Icons */}
      <div className="navbar__icons">
        <div className="navbar__icon-container">
          <FaUserAlt className="navbar__icon" />
        </div>
        <div className="navbar__icon-container navbar__cart">
          <FaShoppingBag className="navbar__icon" />
          <span className="navbar__cart_count">{cartCount}</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
