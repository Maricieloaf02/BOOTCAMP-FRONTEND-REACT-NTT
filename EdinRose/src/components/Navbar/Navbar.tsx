import React, { useState } from 'react';
import { FaUserAlt, FaShoppingCart, FaSearch } from 'react-icons/fa';
import './Navbar.module.css';

interface NavbarProps {
  onSearch: (query: string) => void; // Prop para manejar la búsqueda
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const [searchText, setSearchText] = useState<string>(''); // Estado para el texto de búsqueda

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchText(value);
    console.log('Search triggered with:', value); // Validar entrada del usuario
    onSearch(value);
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar__logo">EdinRose</div>

      {/* Barra de búsqueda */}
      <div className="navbar__search">
        <input
          type="text"
          className="navbar__search_bar"
          placeholder="Search for products..."
          value={searchText}
          onChange={handleInputChange} // Manejar cambios en el texto
        />
        <FaSearch className="navbar__search_icon" />
      </div>

      {/* Íconos */}
      <div className="navbar__icons">
        <FaUserAlt className="navbar__icon" />
        <div className="navbar__cart">
          <FaShoppingCart className="navbar__icon" />
          <span className="navbar__cart_count">3</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
