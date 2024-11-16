import './SearchBar.js';
import './UserCart.js';

class Header extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    // Crear el header
    const header = this.createHeader();

    // Agregar estilos encapsulados
    const style = this.createStyles();

    // Ensamblar el Shadow DOM
    shadow.appendChild(style);
    shadow.appendChild(header);
  }

  /**
   * Crea el contenedor principal del header.
   * @returns {HTMLElement} - Elemento del header completo.
   */
  createHeader() {
    const header = document.createElement('header');
    header.classList.add('main-header');

    // Contenedor superior: incluye logo, barra de búsqueda y carrito
    const headerTop = this.createHeaderTop();

    // Navegación principal
    const nav = this.createNavigation();

    // Ensamblar el header
    header.appendChild(headerTop);
    header.appendChild(nav);

    return header;
  }

  /**
   * Crea el contenedor superior del header.
   * Incluye logo, barra de búsqueda y carrito.
   * @returns {HTMLElement} - Contenedor superior del header.
   */
  createHeaderTop() {
    const headerTop = document.createElement('div');
    headerTop.classList.add('header-top');

    // Logo
    const logoLink = this.createLogo();

    // Componentes reutilizables (SearchBar y UserCart)
    const searchBar = document.createElement('search-bar');
    const userCart = document.createElement('user-cart');

    // Ensamblar el contenedor superior
    headerTop.appendChild(logoLink);
    headerTop.appendChild(searchBar);
    headerTop.appendChild(userCart);

    return headerTop;
  }

  /**
   * Crea el logo con enlace a la página principal.
   * @returns {HTMLElement} - Elemento del logo.
   */
  createLogo() {
    const logoLink = document.createElement('a');
    logoLink.href = '/';
    logoLink.classList.add('logo');

    const logoImg = document.createElement('img');
    logoImg.src = '../assets/images/logo.png';
    logoImg.alt = 'De Todito Logo';

    const logoText = document.createElement('span');
    logoText.textContent = 'De Todito';

    // Ensamblar el logo
    logoLink.appendChild(logoImg);
    logoLink.appendChild(logoText);

    return logoLink;
  }

  /**
   * Crea la navegación principal con enlaces.
   * @returns {HTMLElement} - Navegación principal.
   */
  createNavigation() {
    const nav = document.createElement('nav');
    nav.classList.add('main-nav');

    const navLinks = document.createElement('ul');
    navLinks.classList.add('nav-links');

    // Lista de enlaces
    const links = [
      { href: '#', text: 'Sesión' },
      { href: '../index.html', text: 'Tienda' },
      { href: '#', text: 'Contáctanos' },
    ];

    // Generar enlaces dinámicamente
    links.forEach(link => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = link.text;
      li.appendChild(a);
      navLinks.appendChild(li);
    });

    // Ensamblar la navegación
    nav.appendChild(navLinks);
    return nav;
  }

  /**
   * Crea y retorna los estilos encapsulados del componente.
   * @returns {HTMLStyleElement} - Elemento de estilos encapsulados.
   */
  createStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .main-header {
        display: flex;
        flex-direction: column;
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

      /* Media Query para pantallas pequeñas */
      @media (max-width: 768px) {
        .header-top {
          flex-direction: column;
          align-items: center;
          gap: var(--gap-medium);
        }
        .main-nav {
          padding: var(--padding-small);
        }
        .nav-links {
          flex-direction: row;
          align-items: center;
        }
        .nav-links li a {
          font-size: var(--font-size-medium);
        }
      }
    `;
    return style;
  }
}

// Registrar el componente como un Custom Element
customElements.define('main-header', Header);