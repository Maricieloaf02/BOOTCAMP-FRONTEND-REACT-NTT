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
    const categoriesDropdown = this.createDropdown('Categoría');

    filters.appendChild(categoriesDropdown);

    // Filtros activos
    const activeFilters = document.createElement('div');
    activeFilters.classList.add('active-filters');

    const activeFiltersText = document.createElement('span');
    activeFiltersText.textContent = 'Filtros activos:';

    activeFilters.appendChild(activeFiltersText);

    // Filtros dinámicos
    const filterItemsContainer = document.createElement('div');
    filterItemsContainer.classList.add('filter-items');
    activeFilters.appendChild(filterItemsContainer);

    // Ensamblar todo
    container.appendChild(filters);
    container.appendChild(activeFilters);

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
      .active-filters {
        display: flex;
        gap: var(--gap-small);
        font-size: var(--font-size-small);
        color: var(--secondary-color);
      }
      .active-filters span {
        padding: var(--padding-small);
      } 

      .filter-items {
        display: flex;
        gap: var(--gap-small);
        flex-wrap: wrap;
      }
      .filter-item {
        display: flex;
        align-items: center;
        background-color: var(--background-color);
        padding: var(--padding-small);
        border-radius: var(--border-radius-small);
        font-size: var(--font-size-small);
        color: var(--secondary-color);
      }
      .filter-item button {
        margin-left: var(--gap-small);
        border: none;
        background: none;
        color: var(--secondary-color);
        cursor: pointer;
      }
      .filter-item button:hover {
        color: var(--primary-color-hover);
      }
    `;

    shadow.appendChild(style);
    shadow.appendChild(container);

    // Guardar referencias
    this.filterItemsContainer = filterItemsContainer;
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

  // Método para agregar filtros activos dinámicamente
  addFilterItem(label) {
    const filterItem = document.createElement('div');
    filterItem.classList.add('filter-item');
    filterItem.textContent = label;

    const removeButton = document.createElement('button');
    removeButton.textContent = '✖';
    removeButton.addEventListener('click', () => {
      filterItem.remove();
    });

    filterItem.appendChild(removeButton);
    this.filterItemsContainer.appendChild(filterItem);
  }
}

// Registrar el componente
customElements.define('filter-bar', FilterBar);

//  Agregar dinámicamente filtros activos
document.querySelector('filter-bar')?.addFilterItem('Categoría: Frutas');
