import { Product } from "../types/Product";
import searchIcon from "../assets/icons/search.svg";

/**
 * Clase SearchBar
 * Representa un componente de barra de búsqueda para filtrar productos.
 */
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
   * @returns Formulario completo.
   */
  private createSearchForm(): HTMLFormElement {
    const form = document.createElement("form");
    form.classList.add("search-bar");
    form.setAttribute("role", "search");

    const wrapper = document.createElement("div");
    wrapper.classList.add("search-input-wrapper");

    const icon = this.createSearchIcon();
    const input = this.createSearchInput();

    wrapper.appendChild(icon);
    wrapper.appendChild(input);
    form.appendChild(wrapper);

    return form;
  }

  /**
   * Crea el ícono de búsqueda.
   * @returns Contenedor del ícono de búsqueda.
   */
  private createSearchIcon(): HTMLElement {
    const icon = document.createElement("span");
    icon.classList.add("search-icon");

    const img = document.createElement("img");
    img.src = searchIcon;
    img.alt = "Search Icon";

    icon.appendChild(img);
    return icon;
  }

  /**
   * Crea el input de búsqueda.
   * @returns Input configurado.
   */
  private createSearchInput(): HTMLInputElement {
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Search products...";
    input.setAttribute("aria-label", "Buscar productos");

    // Evento de entrada para filtrar productos
    input.addEventListener("input", () => {
      const query = input.value.trim().toLowerCase(); // Normaliza el texto ingresado
      this.filterProducts(query); // Llama al método para filtrar productos
    });

    return input;
  }

  /**
   * Filtra los productos en el grid según la consulta del usuario.
   * @param query - Texto ingresado por el usuario.
   */
  private filterProducts(query: string): void {
    // Referencia al componente product-grid
    const productGrid = document.querySelector("product-grid") as
      | (HTMLElement & { originalProducts: Product[]; setProducts: (products: Product[]) => void })
      | null;

    if (!productGrid) {
      console.warn("No se encontró el componente ProductGrid.");
      return;
    }

    // Filtrar productos según el texto ingresado
    const allProducts = productGrid.originalProducts;

    const filteredProducts = query
      ? allProducts.filter((product: Product) =>
          product.name.toLowerCase().includes(query)
        )
      : allProducts; // Si no hay texto, muestra todos los productos

    // Actualizar el grid con los productos filtrados
    productGrid.setProducts(filteredProducts);
  }
}

// Registrar el componente como un Custom Element
customElements.define("search-bar", SearchBar);
