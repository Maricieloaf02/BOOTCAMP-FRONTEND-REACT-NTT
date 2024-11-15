class Pagination extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.totalPages = 1;
    this.currentPage = 1;

    this.container = document.createElement('div');
    this.container.classList.add('pagination');

    const style = document.createElement('style');
    style.textContent = `
      .pagination {
        display: flex;
        justify-content: center;
        gap: var(--gap-small);
        margin: var(--gap-medium);
      }
      .page-number {
        padding: var(--padding-small) var(--padding-medium);
        border: 1px solid var(--light-gray);
        border-radius: 50%;
        background-color: var(--background-color);
        color: var(--text-color);
        cursor: pointer;
        font-family: var(--font-family);
        font-size: var(--font-size-small);
      }
      .page-number.active {
        background-color: var(--primary-color);
        color: var(--text-light);
        font-weight: var(--font-weight-bold);
      }
      button {
        padding: var(--padding-small) 12px;
        border: 1px solid var(--light-gray);
        border-radius: 50%;
        margin-top: var(--gap-small);
        background-color: var(--background-color);
        color: var(--text-color);
        cursor: pointer;
        font-family: var(--font-family);
        font-size: var(--font-size-small);
        transition: background-color 0.3s, color 0.3s;
      }
      button:hover:not(:disabled) {
        background-color: var(--primary-color-hover);
        color: var(--text-light);
      }
      button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    `;

    this.shadowRoot.append(style, this.container);
  }

  setPagination(totalPages, currentPage) {
    this.totalPages = totalPages;
    this.currentPage = currentPage;
    this.render();
  }

  render() {
    // Limpia el contenedor sin usar innerHTML
    while (this.container.firstChild) {
      this.container.removeChild(this.container.firstChild);
    }

    // Botón anterior
    const prevButton = document.createElement('button');
    prevButton.textContent = '←';
    prevButton.disabled = this.currentPage === 1;
    prevButton.addEventListener('click', () => {
      this.dispatchEvent(
        new CustomEvent('page-change', { detail: this.currentPage - 1 })
      );
    });

    this.container.appendChild(prevButton);

    // Botones de página
    for (let i = 1; i <= this.totalPages; i++) {
      const pageButton = document.createElement('button');
      pageButton.textContent = i;
      pageButton.classList.add('page-number');
      if (i === this.currentPage) {
        pageButton.classList.add('active');
      }
      pageButton.addEventListener('click', () => {
        this.dispatchEvent(new CustomEvent('page-change', { detail: i }));
      });

      this.container.appendChild(pageButton);
    }

    // Botón siguiente
    const nextButton = document.createElement('button');
    nextButton.textContent = '→';
    nextButton.disabled = this.currentPage === this.totalPages;
    nextButton.addEventListener('click', () => {
      this.dispatchEvent(
        new CustomEvent('page-change', { detail: this.currentPage + 1 })
      );
    });

    this.container.appendChild(nextButton);
  }
}

customElements.define('pagination-bar', Pagination);
