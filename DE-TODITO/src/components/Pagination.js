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
        gap: 10px;
        margin-top: 20px;
      }
      .page-number {
        padding: 8px 12px;
        border: 1px solid #ccc;
        border-radius: 5px;
        background-color: #fff;
        cursor: pointer;
      }
      .page-number.active {
        background-color: #28a745;
        color: #fff;
        font-weight: bold;
      }
      button {
        padding: 8px 12px;
        border: 1px solid #ccc;
        border-radius: 5px;
        background-color: #fff;
        cursor: pointer;
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
