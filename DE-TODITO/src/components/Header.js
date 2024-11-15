// Asegúrate de importar tus subcomponentes
import './SearchBar.js';
import './UserCart.js';

class Header extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    // Contenedor principal del header
    const header = document.createElement('header');
    header.classList.add('main-header');

    // Logo
    const logoLink = document.createElement('a');
    logoLink.href = '/';
    logoLink.classList.add('logo');

    const logoImg = document.createElement('img');
    logoImg.src = '../assets/images/logo.png'; // Ruta a tu logo
    logoImg.alt = 'De Todito Logo';

    const logoText = document.createElement('span');
    logoText.textContent = 'De Todito';

    logoLink.appendChild(logoImg);
    logoLink.appendChild(logoText);

    // Barra de búsqueda y carrito/usuario
    const headerTop = document.createElement('div');
    headerTop.classList.add('header-top');

    const searchBar = document.createElement('search-bar');
    const userCart = document.createElement('user-cart');

    headerTop.appendChild(logoLink);
    headerTop.appendChild(searchBar);
    headerTop.appendChild(userCart);

    // Navegación principal
    const nav = document.createElement('nav');
    nav.classList.add('main-nav');

    const navLinks = document.createElement('ul');
    navLinks.classList.add('nav-links');

    const links = [
      { href: '../index.html', text: 'Inicio' },
      { href: 'shop.html', text: 'Tienda' },
      { href: '#', text: 'Sobre nosotros' },
      { href: '#', text: 'Contáctanos' },
    ];

    links.forEach(link => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = link.text;
      li.appendChild(a);
      navLinks.appendChild(li);
    });

    nav.appendChild(navLinks);

    // Ensamblar el header
    header.appendChild(headerTop);
    header.appendChild(nav);

    // Estilos encapsulados
    const style = document.createElement('style');
    style.textContent = `
      .main-header {
        display: flex;
        flex-direction: column;
        border-bottom: 1px solid #ddd;
        background-color: #fff;
      }
      .header-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 24px;
      }
      .logo {
        display: flex;
        align-items: center;
        gap: 10px;
        text-decoration: none;
      }
      .logo img {
        width: 40px;
        height: 40px;
      }
      .logo span {
        font-size: 20px;
        font-weight: bold;
        color: #28a745;
      }
      .main-nav {
        background-color: #333;
        margin-top: 10px; /* Separación entre header-top y nav */
        padding: 12px 24px;
      }
      .nav-links {
        display: flex;
        justify-content: left;
        gap: 20px;
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .nav-links li a {
        text-decoration: none;
        color: white;
        font-size: 14px;
      }
      .nav-links li a:hover {
        text-decoration: none;
        color: #28a745;
      }
    `;

    shadow.appendChild(style);
    shadow.appendChild(header);
  }
}

// Registrar el Web Component
customElements.define('main-header', Header);
