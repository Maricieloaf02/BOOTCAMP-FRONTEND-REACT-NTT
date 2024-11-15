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
    logoImg.src = '../assets/images/logo.png';
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
      { href: '../index.html', text: 'Sesión' },
      { href: 'shop.html', text: 'Tienda' },
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
        border-bottom: 1px solid var(--light-gray);
        background-color: var(--header-bg);
      }
      .header-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--padding-medium) var(--padding-large);
      }
      .logo {
        display: flex;
        align-items: center;
        gap: var(--gap-small);
        text-decoration: none;
      }
      .logo img {
        width: var(--logo-size);
      }
      .logo span {
        font-size: var(--font-size-xlarge);
        font-weight: var(--font-weight-bold);
        color: var(--primary-color);
      }
      .main-nav {
        background-color: var(--secondary-color);
        margin-top: var(--gap-small); /* Separación entre header-top y nav */
        padding: var(--padding-small) var(--padding-large);
      }
      .nav-links {
        display: flex;
        justify-content: left;
        gap: var(--gap-medium);
        list-style: none;
        padding: 5px;
        margin: 0;
      }
      .nav-links li a {
        text-decoration: none;
        color: var(--footer-text);
        font-size: var(--font-size-small);
      }
      .nav-links li a:hover {
        color: var(--primary-color);
      }
    `;

    shadow.appendChild(style);
    shadow.appendChild(header);
  }
}

// Registro el Web Component
customElements.define('main-header', Header);
