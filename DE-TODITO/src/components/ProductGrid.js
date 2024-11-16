class ProductGrid extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.products = []; // Define los productos
  }

  setProducts(products) {
    if (!this.originalProducts) {
      this.originalProducts = products;
    }
    this.products = products;
    this.render();
  }

  render() {
    const shadow = this.shadowRoot;
    shadow.innerHTML = ""; // Limpia el contenido anterior

    const container = document.createElement("div");
    container.classList.add("product-grid");

    this.products.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.classList.add("product-card");

      const productImage = document.createElement("img");
      productImage.src = product.image;
      productImage.alt = product.name;

      const productInfo = document.createElement("div");
      productInfo.classList.add("product-info");

      const productName = document.createElement("h3");
      productName.textContent = product.name;

      const productPrice = document.createElement("p");
      productPrice.classList.add("price");
      productPrice.textContent = `$${product.price}`;

      const cartButton = document.createElement("button");
      cartButton.classList.add("cart-button");
      cartButton.setAttribute("aria-label", "Add to cart");

      const cartIcon = document.createElement("img");
      cartIcon.src = "./assets/icons/carrito.svg";
      cartIcon.alt = "Add to cart icon";
      cartIcon.style.width = "var(--icon-size)";
      cartIcon.style.height = "var(--icon-size)";

      cartButton.appendChild(cartIcon);

      // Evento para el botón del carrito
      cartButton.addEventListener("click", () => {
        console.log(`Producto agregado al carrito: ${product.name}, Precio: ${product.price}`);
        
        const event = new CustomEvent("add-to-cart", {
          detail: { product },
          bubbles: true, // Permite que el evento se propague
          composed: true // Permite atravesar Shadow DOM
        });
        document.dispatchEvent(event); // Emitir el evento a nivel global
      });
      
      

      const textContainer = document.createElement("div");
      textContainer.appendChild(productName);
      textContainer.appendChild(productPrice);

      productInfo.appendChild(textContainer);
      productInfo.appendChild(cartButton);

      productCard.appendChild(productImage);
      productCard.appendChild(productInfo);
      container.appendChild(productCard);
    });

    const style = document.createElement("style");
    style.textContent = `
    .product-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); /* Estilo base para ajustar automáticamente */
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
    @media (min-width: 400px) and (max-width: 768px) {
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
  

    shadow.appendChild(style);
    shadow.appendChild(container);
  }
}

customElements.define("product-grid", ProductGrid);
