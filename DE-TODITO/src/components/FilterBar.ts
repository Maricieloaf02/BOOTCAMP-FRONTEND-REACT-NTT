import { ProductService } from "../services/ProductService";
import { CategoryService } from "../services/CategoryService";
import { Product } from "../types/Product";
import { Category } from "../types/Category";

class FilterBar extends HTMLElement {
  private productService = new ProductService();
  private categoryService = new CategoryService();
  private categoriesDropdown: HTMLSelectElement;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    // Contenedor principal de la barra de filtros
    const container = document.createElement("div");
    container.classList.add("filter-bar");

    // Contenedor para los elementos de filtro
    const filters = document.createElement("div");
    filters.classList.add("filters");

    // Dropdown para seleccionar categorías
    this.categoriesDropdown = this.createDropdown("Category");
    filters.appendChild(this.categoriesDropdown);

    // Ensambla los elementos de la barra de filtros
    container.appendChild(filters);

    // Estilos del componente utilizando variables CSS globales
    const style = document.createElement("style");
    style.textContent = `
      .filter-bar {
        display: flex;
        padding: var(--padding-medium);
        border-bottom: 1px solid var(--light-gray);
      }
      .filters {
        display: flex;
        gap: var(--gap-medium);
        margin-bottom: var(--gap-small);
      }
      .dropdown {
        padding: var(--padding-small);
        border: 1px solid var(--light-gray);
        border-radius: var(--border-radius-medium);
        font-size: var(--font-size-medium);
        color: var(--secondary-color);
        cursor: pointer;
        outline: none;
      }
    `;

    // Agrega los estilos y el contenedor al Shadow DOM
    shadow.appendChild(style);
    shadow.appendChild(container);

    // Carga las categorías dinámicamente desde el servicio
    this.loadCategories();
  }

  /**
   * Crea un elemento dropdown con una opción inicial como placeholder.
   * @param placeholder - Texto de la opción inicial del dropdown.
   * @returns Dropdown creado.
   */
  private createDropdown(placeholder: string): HTMLSelectElement {
    const dropdown = document.createElement("select");
    dropdown.classList.add("dropdown");

    // Placeholder inicial
    const option = document.createElement("option");
    option.textContent = placeholder;
    option.disabled = true;
    option.selected = true;

    dropdown.appendChild(option);
    return dropdown;
  }

  /**
   * Carga las categorías utilizando el servicio y las agrega al dropdown.
   */
  private async loadCategories(): Promise<void> {
    try {
      const categories: Category[] = await this.categoryService.fetchCategories();

      // Limpia las opciones existentes antes de cargar las nuevas
      this.categoriesDropdown.innerHTML = "";
      const defaultOption = document.createElement("option");
      defaultOption.textContent = "Category";
      defaultOption.disabled = true;
      defaultOption.selected = true;
      this.categoriesDropdown.appendChild(defaultOption);

      // Agrega las categorías al dropdown
      categories.forEach((category) => {
        const option = document.createElement("option");
        option.value = category.slug; // Slug usado como valor
        option.textContent = category.name; // Nombre mostrado en el dropdown
        this.categoriesDropdown.appendChild(option);
      });

      // Listener para manejar cambios de selección
      this.categoriesDropdown.addEventListener("change", (event) => {
        const selectedCategory = (event.target as HTMLSelectElement).value;
        this.loadProductsByCategory(selectedCategory);
      });
    } catch (error) {
      console.error("Error al cargar categorías:", error);
    }
  }

  /**
   * Carga productos desde una categoría seleccionada utilizando el servicio.
   * @param category - Categoría seleccionada.
   */
  private async loadProductsByCategory(category: string): Promise<void> {
    try {
      const products: Product[] = await this.productService.fetchProductsByCategory(category);
      console.log("Productos obtenidos:", products);

      // Actualiza el componente ProductGrid con los productos filtrados
      const productGrid = document.querySelector("product-grid") as
        | (HTMLElement & { setProducts: (products: Product[]) => void })
        | null;
      if (productGrid) {
        productGrid.setProducts(products);
      } else {
        console.warn("No se encontró el componente ProductGrid.");
      }
    } catch (error) {
      console.error("Error al cargar productos:", error);
    }
  }
}

// Registrar el componente como un Custom Element
customElements.define("filter-bar", FilterBar);
