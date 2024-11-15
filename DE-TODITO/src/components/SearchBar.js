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
        align-items: center;
        border: 1px solid #ddd;
        border-radius: 25px;
        overflow: hidden;
        background-color: #fff;
        flex: 1;
      }
      .search-icon img {
        width: 20px;
        height: 20px;
        margin: 5px 10px 0px 10px;
      }
      .search-input-wrapper input {
        border: none;
        outline: none;
        font-size: 14px;
        flex: 1;
        padding: 10px 10px;
      }
      .search-button {
        background-color: #28a745;
        color: white;
        border: none;
        border-radius: 0; /* Eliminamos bordes del botón para que se alinee */
        flex-shrink: 0; /* Evitamos que el botón cambie de tamaño */
        padding: 10px 20px;
        font-size: 14px;
        cursor: pointer;
        transition: background-color 0.3s;
      }
      .search-button:hover {
        background-color: #218838;
      }
    `;

    // Adjuntar todo al Shadow DOM
    shadow.appendChild(style);
    shadow.appendChild(form);
  }
}

// Registrar el componente
customElements.define('search-bar', SearchBar);
