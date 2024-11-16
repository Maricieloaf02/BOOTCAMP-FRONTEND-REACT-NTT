class FilterBar extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    // Contenedor principal
    const container = document.createElement('div');
    container.classList.add('filter-bar');

    // Filtros
    const filters = document.createElement('div');
    filters.classList.add('filters');

    // Crear dropdown para categorías
    const categoriesDropdown = this.createDropdown('Selecciona una categoría');
    filters.appendChild(categoriesDropdown);

    // Ensamblar todo
    container.appendChild(filters);

    // Estilos
    const style = document.createElement('style');
    style.textContent = `
      .filter-bar {
        display: flex;
        flex-direction: column;
        padding: var(--padding-medium);
        border-bottom: 1px solid var(--light-gray);
        background-color: var(--background-color);
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
        background-color: var(--background-color);
        font-size: var(--font-size-medium);
        color: var(--secondary-color);
        cursor: pointer;
      }
    `;

    shadow.appendChild(style);
    shadow.appendChild(container);

    // Guardar referencias
    this.categoriesDropdown = categoriesDropdown;

    // Llamar a la función para cargar categorías dinámicamente
    this.fetchCategories();
  }

  // Método para crear un dropdown
  createDropdown(placeholder) {
    const dropdown = document.createElement('select');
    dropdown.classList.add('dropdown');
    const option = document.createElement('option');
    option.textContent = placeholder;
    option.disabled = true;
    option.selected = true;
    dropdown.appendChild(option);
    return dropdown;
  }

  // Método para cargar categorías dinámicamente
  async fetchCategories() {
  try {
    const response = await fetch('https://dummyjson.com/products/categories');
    const categories = await response.json();

    console.log('Categorías obtenidas:', categories);

    // Limpia las opciones existentes en el dropdown antes de agregar nuevas
    this.categoriesDropdown.innerHTML = '';
    const defaultOption = document.createElement('option');
    defaultOption.textContent = 'Selecciona una categoría';
    defaultOption.disabled = true;
    defaultOption.selected = true;
    this.categoriesDropdown.appendChild(defaultOption);

    // Mapear el arreglo de objetos en opciones del dropdown
    categories.forEach((category) => {
      const option = document.createElement('option');
      option.value = category.slug; // Usa el slug como valor
      option.textContent = category.name; // Usa el nombre como texto visible
      this.categoriesDropdown.appendChild(option);
    });

    // Agregar listener al cambio de selección
    this.categoriesDropdown.addEventListener('change', (event) => {
      const selectedCategory = event.target.value;
      this.fetchProductsByCategory(selectedCategory);
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
}


  // Método para cargar productos por categoría
  async fetchProductsByCategory(category) {
    try {
      const response = await fetch(`https://dummyjson.com/products/category/${category}`);
      const data = await response.json();

      console.log('Productos obtenidos:', data.products);

      // Transformar productos a un formato que el ProductGrid pueda manejar
      const transformedProducts = data.products.map((product) => ({
        name: product.title,
        price: product.price,
        image: product.thumbnail,
        category: category,
      }));

      // Actualizar el ProductGrid con los productos filtrados
      const productGrid = document.querySelector('product-grid');
      productGrid.setProducts(transformedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }
}

// Registrar el componente
customElements.define('filter-bar', FilterBar);
