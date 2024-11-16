class ProductGrid extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.products = []; // Almacena los productos
  }

  /**
   * Establece los productos y renderiza la grid.
   * @param {Array} products - Lista de productos a mostrar.
   */
  setProducts(products) {
    if (!this.originalProducts) {
      this.originalProducts = products; // Guarda la lista original de productos para filtros
    }
    this.products = products;
    this.render();
  }

  /**
   * Renderiza el contenido de la grid de productos.
   */
  render() {
    const shadow = this.shadowRoot;
    shadow.innerHTML = ""; // Limpia el contenido previo

    const container = this.createGridContainer();

    // Agregar los productos como tarjetas
    this.products.forEach((product) => {
      const productCard = this.createProductCard(product);
      container.appendChild(productCard);
    });

    // Estilos encapsulados
    const style = this.createStyles();

    // Ensamblar los elementos en el Shadow DOM
    shadow.appendChild(style);
    shadow.appendChild(container);
  }

  /**
   * Crea el contenedor principal de la grid.
   * @returns {HTMLDivElement} - Contenedor de la grid.
   */
  createGridContainer() {
    const container = document.createElement("div");
    container.classList.add("product-grid");
    return container;
  }

  /**
   * Crea una tarjeta de producto.
   * @param {Object} product - Información del producto.
   * @returns {HTMLDivElement} - Tarjeta del producto.
   */
  createProductCard(product) {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");

    // Imagen del producto
    const productImage = document.createElement("img");
    productImage.src = product.image;
    productImage.alt = product.name;

    // Información del producto
    const productInfo = this.createProductInfo(product);

    // Ensamblar la tarjeta
    productCard.appendChild(productImage);
    productCard.appendChild(productInfo);

    return productCard;
  }

  /**
   * Crea el contenedor con la información del producto.
   * @param {Object} product - Información del producto.
   * @returns {HTMLDivElement} - Contenedor con el nombre, precio y botón.
   */
  createProductInfo(product) {
    const productInfo = document.createElement("div");
    productInfo.classList.add("product-info");

    // Nombre y precio del producto
    const textContainer = document.createElement("div");

    const productName = document.createElement("h3");
    productName.textContent = product.name;

    const productPrice = document.createElement("p");
    productPrice.classList.add("price");
    productPrice.textContent = `$${product.price}`;

    textContainer.appendChild(productName);
    textContainer.appendChild(productPrice);

    // Botón para agregar al carrito
    const cartButton = this.createCartButton(product);

    // Ensamblar la información del producto
    productInfo.appendChild(textContainer);
    productInfo.appendChild(cartButton);

    return productInfo;
  }

  /**
   * Crea el botón para agregar al carrito.
   * @param {Object} product - Información del producto.
   * @returns {HTMLButtonElement} - Botón de agregar al carrito.
   */
  createCartButton(product) {
    const cartButton = document.createElement("button");
    cartButton.classList.add("cart-button");
    cartButton.setAttribute("aria-label", "Add to cart");

    const cartIcon = document.createElement("img");
    cartIcon.src = "./assets/icons/carrito.svg";
    cartIcon.alt = "Add to cart icon";
    cartIcon.style.width = "var(--icon-size)";
    cartIcon.style.height = "var(--icon-size)";

    cartButton.appendChild(cartIcon);

    // Agregar evento al botón
    cartButton.addEventListener("click", () => {
      const event = new CustomEvent("add-to-cart", {
        detail: { product },
        bubbles: true,
        composed: true,
      });
      document.dispatchEvent(event);
    });

    return cartButton;
  }

  /**
   * Crea y devuelve los estilos encapsulados del componente.
   * @returns {HTMLStyleElement} - Elemento de estilos.
   */
  createStyles() {
    const style = document.createElement("style");
    style.textContent = `
      .product-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: var(--gap-medium);
        margin: var(--gap-medium);
      }

      .product-card {
        border: 1px solid var(--light-gray);
        border-radius: var(--border-radius-medium);
        padding: var(--padding-medium);
        text-align: center;
        background-color: var(--background-color);
      }

      .product-card img {
        width: 100%;
        height: auto;
        border-radius: var(--border-radius-medium);
      }

      .product-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: var(--gap-small);
      }

      .product-info h3 {
        margin: 0;
        font-size: var(--font-size-small);
        color: var(--secondary-color);
      }

      .product-info .price {
        font-size: var(--font-size-small);
        text-align: left;
        color: var(--text-color);
        margin: var(--gap-small);
      }

      .cart-button {
        padding: 6px var(--padding-small);
        border: none;
        color: var(--text-light);
        border-radius: 50%;
        cursor: pointer;
      }

      .cart-button:hover {
        background-color: var(--primary-color-hover);
      }

      /* Responsive: 1 columna para móviles */
      @media (max-width: 576px) {
        .product-grid {
          grid-template-columns: 1fr;
        }
      }

      /* Responsive: 2 columnas para tablets */
      @media (min-width: 577px) and (max-width: 768px) {
        .product-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      /* Responsive: 3 columnas para pantallas medianas */
      @media (min-width: 769px) and (max-width: 1200px) {
        .product-grid {
          grid-template-columns: repeat(3, 1fr);
        }
      }

      /* Responsive: Más columnas para pantallas grandes */
      @media (min-width: 1201px) {
        .product-grid {
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        }
      }
    `;
    return style;
  }
}

// Registrar el componente
customElements.define("product-grid", ProductGrid);
