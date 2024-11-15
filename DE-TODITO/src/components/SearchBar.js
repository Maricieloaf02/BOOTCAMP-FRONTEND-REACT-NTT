class SearchBar extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    // Crear el formulario
    const form = document.createElement('form');
    form.classList.add('search-bar');
    form.setAttribute('role', 'search');

    // Contenedor del input y el ícono
    const wrapper = document.createElement('div');
    wrapper.classList.add('search-input-wrapper');

    // Ícono de búsqueda
    const icon = document.createElement('span');
    icon.classList.add('search-icon');

    const img = document.createElement('img');
    img.src = './assets/icons/search.svg'; // Ruta al ícono de búsqueda
    img.alt = 'Search Icon';

    icon.appendChild(img);

    // Input de búsqueda
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'mi producto';
    input.setAttribute('aria-label', 'Buscar productos');

    // Botón de búsqueda
    const button = document.createElement('button');
    button.type = 'submit';
    button.textContent = 'Buscar';
    button.classList.add('search-button');

    // Ensamblar los elementos
    wrapper.appendChild(icon);
    wrapper.appendChild(input);
    wrapper.appendChild(button);

    form.appendChild(wrapper);

    // Estilos del componente
    const style = document.createElement('style');
    style.textContent = `
      .search-bar {
        display: flex;
        align-items: center;
      }
      .search-input-wrapper {
        display: flex;
        border: 1px solid var(--light-gray);
        border-radius: var(--border-radius-medium);
        overflow: hidden;
        background-color: var(--background-color);
        flex: 1;
      }
      .search-icon img {
        width: var(--icon-size);
        height: var(--icon-size);
        margin: 4px 0px 0 4px;
      }
      .search-input-wrapper input {
        border: none;
        outline: none;
        font-size: var(--font-size-medium);
        flex: 1;
        padding: var(--padding-small);
        font-family: var(--font-family);
      }
      .search-button {
        background-color: var(--primary-color);
        color: var(--text-light);
        border: none;
        border-radius: 0; /* Eliminamos bordes del botón para que se alinee */
        flex-shrink: 0; /* Evitamos que el botón cambie de tamaño */
        padding: var(--padding-small) var(--padding-medium);
        font-size: var(--font-size-medium);
        cursor: pointer;
        transition: background-color 0.3s;
      }
      .search-button:hover {
        background-color: var(--primary-color-hover);
      }
    `;

    // Adjuntar todo al Shadow DOM
    shadow.appendChild(style);
    shadow.appendChild(form);
  }
}

// Registrar el componente
customElements.define('search-bar', SearchBar);
