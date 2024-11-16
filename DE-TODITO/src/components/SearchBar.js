class SearchBar extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    // Crear el formulario
    const form = document.createElement("form");
    form.classList.add("search-bar");
    form.setAttribute("role", "search");

    // Contenedor del input y el ícono
    const wrapper = document.createElement("div");
    wrapper.classList.add("search-input-wrapper");

    // Ícono de búsqueda
    const icon = document.createElement("span");
    icon.classList.add("search-icon");

    const img = document.createElement("img");
    img.src = "./assets/icons/search.svg"; // Ruta al ícono de búsqueda
    img.alt = "Search Icon";

    icon.appendChild(img);

    // Input de búsqueda
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "mi producto";
    input.setAttribute("aria-label", "Buscar productos");

    // Evento para búsqueda en tiempo real
    input.addEventListener("input", () => {
      const query = input.value.trim().toLowerCase(); // Obtener el texto en minúsculas
      console.log("Texto ingresado:", query); // Debug
      this.filterProducts(query); // Llama a la función de filtrado
    });

    // Ensamblar los elementos
    wrapper.appendChild(icon);
    wrapper.appendChild(input);
    form.appendChild(wrapper);

    // Estilos del componente
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

    // Adjuntar todo al Shadow DOM
    shadow.appendChild(style);
    shadow.appendChild(form);
  }

  // Método para filtrar productos
  // Método para filtrar productos
  filterProducts(query) {
    const productGrid = document.querySelector("product-grid");

    // Verificar si el productGrid y los productos originales existen
    if (!productGrid || !productGrid.originalProducts) {
      console.error(
        "No se encontró el product-grid o los productos originales están vacíos."
      );
      return;
    }

    // Filtrar sobre los productos originales
    const allProducts = productGrid.originalProducts;

    const filteredProducts = query
      ? allProducts.filter((product) =>
          product.name.toLowerCase().includes(query.toLowerCase().trim())
        )
      : allProducts; // Si no hay texto, muestra todos los productos

    // Actualizar los productos en el grid
    productGrid.setProducts(filteredProducts);
  }
}

// Registrar el componente
customElements.define("search-bar", SearchBar);
