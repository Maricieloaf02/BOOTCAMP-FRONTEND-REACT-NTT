class SearchBar extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    // Crear el formulario de búsqueda
    const form = this.createSearchForm();

    // Estilos encapsulados para el componente
    const style = document.createElement("style");
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
    `;

    // Ensamblar los elementos en el Shadow DOM
    shadow.appendChild(style);
    shadow.appendChild(form);
  }

  /**
   * Crea el formulario de búsqueda con el input y el ícono.
   * @returns {HTMLFormElement} - Formulario completo.
   */
  createSearchForm() {
    // Formulario principal
    const form = document.createElement("form");
    form.classList.add("search-bar");
    form.setAttribute("role", "search");

    // Contenedor del input y el ícono
    const wrapper = document.createElement("div");
    wrapper.classList.add("search-input-wrapper");

    // Ícono de búsqueda
    const icon = this.createSearchIcon();

    // Input de búsqueda
    const input = this.createSearchInput();

    // Ensamblar el contenedor
    wrapper.appendChild(icon);
    wrapper.appendChild(input);
    form.appendChild(wrapper);

    return form;
  }

  /**
   * Crea el ícono de búsqueda.
   * @returns {HTMLSpanElement} - Contenedor del ícono de búsqueda.
   */
  createSearchIcon() {
    const icon = document.createElement("span");
    icon.classList.add("search-icon");

    const img = document.createElement("img");
    img.src = "./assets/icons/search.svg"; // Ruta al ícono
    img.alt = "Search Icon";

    icon.appendChild(img);
    return icon;
  }

  /**
   * Crea el input de búsqueda.
   * @returns {HTMLInputElement} - Input configurado.
   */
  createSearchInput() {
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "mi producto";
    input.setAttribute("aria-label", "Buscar productos");

    // Evento para manejar la búsqueda en tiempo real
    input.addEventListener("input", () => {
      const query = input.value.trim().toLowerCase(); // Normaliza el texto ingresado
      this.filterProducts(query); // Llama al método para filtrar productos
    });

    return input;
  }

  /**
   * Filtra los productos en el grid según la consulta del usuario.
   * @param {string} query - Texto ingresado por el usuario.
   */
  filterProducts(query) {
    const productGrid = document.querySelector("product-grid");

    // Filtrar productos según el texto ingresado
    const allProducts = productGrid.originalProducts;

    const filteredProducts = query
      ? allProducts.filter((product) =>
          product.name.toLowerCase().includes(query)
        )
      : allProducts; // Si no hay texto, muestra todos los productos

    // Actualizar el grid con los productos filtrados
    productGrid.setProducts(filteredProducts);
  }
}

// Registrar el componente como un Custom Element
customElements.define("search-bar", SearchBar);
