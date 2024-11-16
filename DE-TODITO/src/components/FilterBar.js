class FilterBar extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    // Contenedor principal de la barra de filtros
    const container = document.createElement("div");
    container.classList.add("filter-bar");

    // Contenedor para los elementos de filtro
    const filters = document.createElement("div");
    filters.classList.add("filters");

    // Creación del dropdown para seleccionar categorías
    const categoriesDropdown = this.createDropdown("Category");
    filters.appendChild(categoriesDropdown);

    // Ensambla los elementos de la barra de filtros
    container.appendChild(filters);

    // Define los estilos utilizando variables CSS globales
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
      }
    `;

    // Agrega los estilos y el contenedor al Shadow DOM
    shadow.appendChild(style);
    shadow.appendChild(container);

    // Referencia al dropdown de categorías para su uso posterior
    this.categoriesDropdown = categoriesDropdown;

    // Llama al método para cargar las categorías dinámicamente
    this.fetchCategories();
  }

  // Método para crear un dropdown con un placeholder inicial
  createDropdown(placeholder) {
    const dropdown = document.createElement("select");
    dropdown.classList.add("dropdown");

    // Opción por defecto como placeholder
    const option = document.createElement("option");
    option.textContent = placeholder;
    option.disabled = true;
    option.selected = true;

    dropdown.appendChild(option);
    return dropdown;
  }

  // Método para cargar dinámicamente las categorías desde una API
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
        option.value = category.slug; // Usa el slug como valor de opción
        option.textContent = category.name; // Usa el nombre como texto visible
        this.categoriesDropdown.appendChild(option);
      });

      // Agrega un listener para manejar los cambios de selección en el dropdown
      this.categoriesDropdown.addEventListener("change", (event) => {
        const selectedCategory = event.target.value;
        this.fetchProductsByCategory(selectedCategory); // Carga productos de la categoría seleccionada
      });
    } catch (error) {
      console.error("Error al obtener categorías:", error);
    }
  }

  // Método para cargar productos según la categoría seleccionada
  async fetchProductsByCategory(category) {
    try {
      const response = await fetch(
        `https://dummyjson.com/products/category/${category}`
      );
      const data = await response.json();

      console.log("Productos obtenidos:", data.products);

      // Transforma los productos al formato esperado por el componente ProductGrid
      const transformedProducts = data.products.map((product) => ({
        name: product.title,
        price: product.price,
        image: product.thumbnail,
        category: category,
      }));

      // Actualiza el componente ProductGrid con los productos filtrados
      const productGrid = document.querySelector("product-grid");
      productGrid.setProducts(transformedProducts);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  }
}

// Registra el componente como un Custom Element
customElements.define("filter-bar", FilterBar);
