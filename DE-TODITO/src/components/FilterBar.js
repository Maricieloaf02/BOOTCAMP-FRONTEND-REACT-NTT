/**
 * Clase FilterBar
 * Representa una barra de filtros que permite seleccionar categorías y filtrar productos.
 */
class FilterBar extends HTMLElement {
  /**
   * Constructor de FilterBar.
   * Inicializa el componente y configura el Shadow DOM.
   */
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
    const categoriesDropdown = this.createDropdown("Category");
    filters.appendChild(categoriesDropdown);

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

    // Guarda una referencia al dropdown para actualizaciones dinámicas
    this.categoriesDropdown = categoriesDropdown;

    // Carga las categorías dinámicamente desde la API
    this.fetchCategories();
  }

  /**
   * Crea un elemento dropdown con una opción inicial como placeholder.
   * @param {string} placeholder - Texto de la opción inicial del dropdown.
   * @returns {HTMLSelectElement} - Dropdown creado.
   */
  createDropdown(placeholder) {
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
   * Carga dinámicamente las categorías desde la API dummyjson y las agrega al dropdown.
   * Si ocurre un error, se registra en la consola.
   */
  async fetchCategories() {
    try {
      const response = await fetch("https://dummyjson.com/products/categories");
      const categories = await response.json();

      console.log("Categorías obtenidas:", categories);

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
        option.textContent = category.name; // Nombre mostrado
        this.categoriesDropdown.appendChild(option);
      });

      // Listener para manejar cambios de selección
      this.categoriesDropdown.addEventListener("change", (event) => {
        const selectedCategory = event.target.value;
        this.fetchProductsByCategory(selectedCategory);
      });
    } catch (error) {
      console.error("Error al obtener categorías:", error);
    }
  }

  /**
   * Carga productos desde una categoría seleccionada.
   * Los transforma y actualiza la grid de productos.
   * @param {string} category - Categoría seleccionada.
   */
  async fetchProductsByCategory(category) {
    try {
      const response = await fetch(
        `https://dummyjson.com/products/category/${category}`
      );
      const data = await response.json();

      console.log("Productos obtenidos:", data.products);

      // Transforma los productos al formato esperado por ProductGrid
      const transformedProducts = data.products.map((product) => ({
        name: product.title,
        price: product.price,
        image: product.thumbnail,
        category: category,
      }));

      // Actualiza el componente ProductGrid con los productos filtrados
      const productGrid = document.querySelector("product-grid");
      if (productGrid) {
        productGrid.setProducts(transformedProducts);
      } else {
        console.warn("No se encontró el componente ProductGrid.");
      }
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  }
}

// Registra FilterBar como un Custom Element
customElements.define("filter-bar", FilterBar);
