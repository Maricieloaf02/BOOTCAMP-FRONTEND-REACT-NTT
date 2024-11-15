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

    // Crear los dropdowns
    const categoriesDropdown = this.createDropdown('Select Category');
    const priceDropdown = this.createDropdown('Select Price');
    const ratingDropdown = this.createDropdown('Select Rating');

    filters.appendChild(categoriesDropdown);
    filters.appendChild(priceDropdown);
    filters.appendChild(ratingDropdown);

    // Contenedor de filtros activos
    const activeFilters = document.createElement('div');
    activeFilters.classList.add('active-filters');

    // Texto de Active Filters
    const activeFiltersText = document.createElement('span');
    activeFiltersText.textContent = 'Active Filters:';
    activeFilters.appendChild(activeFiltersText);

    // Crear filtro activo: Wing Chair
    const filter1 = this.createActiveFilter('Wing Chair');
    activeFilters.appendChild(filter1);

    // Crear filtro activo: Min $300 - Max $500
    const filter2 = this.createActiveFilter('Min $300 - Max $500');
    activeFilters.appendChild(filter2);

    // Ensamblar todo
    container.appendChild(filters);
    container.appendChild(activeFilters);

    // Estilos
    const style = document.createElement('style');
    style.textContent = `
      .filter-bar {
        display: flex;
        flex-direction: column;
        padding: 10px 20px;
        border-bottom: 1px solid #ddd;
        background-color: #fff;
      }
      .filters {
        display: flex;
        gap: 15px;
        margin: 4px 12px 12px 0px
      }
      .dropdown {
        padding: 8px 20px 8px 13px;
        border: 1px solid #cccccc96;
        border-radius: 5px;
        background-color: #fff;
        font-size: 14px;
        color: #555;
        cursor: pointer;
      }
      .active-filters {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 14px;
        color: #555;
      }
      .active-filters > span:first-child {
        font-weight: bold;
        margin-right: 10px;
      }
      .filter-item {
        display: flex;
        align-items: center;
        padding: 5px 10px;
      }
      .filter-item button {
        margin-left: 5px;
        border: none;
        background: none;
        color: #555;
        cursor: pointer;
        font-size: 14px;
      }
      .filter-item button:hover {
        color: red;
      }
    `;

    shadow.appendChild(style);
    shadow.appendChild(container);
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

  // Método para crear un filtro activo
  createActiveFilter(label) {
    const filterItem = document.createElement('span');
    filterItem.classList.add('filter-item');

    const filterText = document.createElement('span');
    filterText.textContent = label;

    const removeButton = document.createElement('button');
    removeButton.textContent = '✖';
    removeButton.classList.add('remove-filter');
    removeButton.addEventListener('click', () => {
      filterItem.remove(); // Elimina el filtro al hacer clic
    });

    filterItem.appendChild(filterText);
    filterItem.appendChild(removeButton);

    return filterItem;
  }
}

// Registrar el componente
customElements.define('filter-bar', FilterBar);
