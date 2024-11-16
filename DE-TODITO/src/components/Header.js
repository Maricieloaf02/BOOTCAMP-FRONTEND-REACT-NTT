import './SearchBar.js';
import './UserCart.js';

class Header extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    // Contenedor principal del header
    const header = document.createElement('header');
    header.classList.add('main-header');

    // Logo de la marca con enlace a la página principal
    const logoLink = document.createElement('a');
    logoLink.href = '/';
    logoLink.classList.add('logo');

    // Imagen y texto del logo
    const logoImg = document.createElement('img');
    logoImg.src = '../assets/images/logo.png';
    logoImg.alt = 'De Todito Logo';

    const logoText = document.createElement('span');
    logoText.textContent = 'De Todito';

    // Ensambla el enlace del logo
    logoLink.appendChild(logoImg);
    logoLink.appendChild(logoText);

    // Contenedor superior: incluye logo, barra de búsqueda y carrito
    const headerTop = document.createElement('div');
    headerTop.classList.add('header-top');

    // Barra de búsqueda (Web Component) y carrito/usuario (Web Component)
    const searchBar = document.createElement('search-bar');
    const userCart = document.createElement('user-cart');

    // Ensambla el contenedor superior
    headerTop.appendChild(logoLink);
    headerTop.appendChild(searchBar);
    headerTop.appendChild(userCart);

    // Navegación principal con enlaces
    const nav = document.createElement('nav');
    nav.classList.add('main-nav');

    // Lista de enlaces de navegación
    const navLinks = document.createElement('ul');
    navLinks.classList.add('nav-links');

    // Definición de los enlaces de navegación
    const links = [
      { href: '../index.html', text: 'Sesión' },
      { href: 'shop.html', text: 'Tienda' },
      { href: '#', text: 'Contáctanos' },
    ];

    // Genera y agrega cada enlace a la lista de navegación
    links.forEach(link => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = link.text;
      li.appendChild(a);
      navLinks.appendChild(li);
    });

    // Ensambla la navegación principal
    nav.appendChild(navLinks);

    // Ensambla el header completo con sus componentes
    header.appendChild(headerTop);
    header.appendChild(nav);

    // Estilos encapsulados para el Shadow DOM
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


    // Agrega estilos y el contenedor principal al Shadow DOM
    shadow.appendChild(style);
    shadow.appendChild(header);
  }
}

// Registra el componente como un Custom Element
customElements.define('main-header', Header);