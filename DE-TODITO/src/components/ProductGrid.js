class ProductGrid extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.products = [];
    this.currentPage = 1;
    this.productsPerPage = 4;

    this.render();
  }

  setProducts(products) {
    this.products = products;
    this.render();
  }

  changePage(page) {
    this.currentPage = page;
    this.render();
  }

  render() {
    const shadow = this.shadowRoot;
    shadow.innerHTML = ""; // Limpia el contenido anterior

    // Contenedor principal
    const container = document.createElement("div");
    container.classList.add("product-grid");

    const startIndex = (this.currentPage - 1) * this.productsPerPage;
    const endIndex = startIndex + this.productsPerPage;
    const currentProducts = this.products.slice(startIndex, endIndex);

    // Renderiza los productos
    currentProducts.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.classList.add("product-card");

      // Imagen del producto
      const productImage = document.createElement("img");
      productImage.src = product.image;
      productImage.alt = product.name;

      // Contenedor de información
      const productInfo = document.createElement("div");
      productInfo.classList.add("product-info");

      // Nombre del producto
      const productName = document.createElement("h3");
      productName.textContent = product.name;

      // Precio del producto
      const productPrice = document.createElement("p");
      productPrice.classList.add("price");
      productPrice.textContent = `$${product.price}`;

      // Botón del carrito
      const cartButton = document.createElement("button");
      cartButton.classList.add("cart-button");
      cartButton.setAttribute("aria-label", "Add to cart");

      // Imagen SVG del carrito
      const cartIcon = document.createElement("img");
      cartIcon.src = "./assets/icons/carrito.svg"; // Ruta del archivo SVG
      cartIcon.alt = "Add to cart icon";
      cartIcon.style.width = "24px"; // Ajusta el tamaño del ícono si es necesario
      cartIcon.style.height = "24px";

      cartButton.appendChild(cartIcon); // Agrega la imagen al botón

      // Ensamblar información
      const textContainer = document.createElement("div");
      textContainer.appendChild(productName);
      textContainer.appendChild(productPrice);

      productInfo.appendChild(textContainer);
      productInfo.appendChild(cartButton);

      // Ensamblar tarjeta
      productCard.appendChild(productImage);
      productCard.appendChild(productInfo);
      container.appendChild(productCard);
    });

    // Estilos
    const style = document.createElement("style");
    style.textContent = `
      .product-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 20px;
        margin: 20px 20px;
      }
      .product-card {
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 14px;
        text-align: center;
        background-color: #fff;
      }
      .product-card img {
        width: 100%;
        height: auto;
        border-radius: 8px;
      }
      .product-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 10px;
      }
      .product-info h3 {
        margin: 0;
        font-size: 12px;
        color: #333;
      }
      .product-info .price {
        font-size: 12px;
        text-align: left;
        color: #555;
        margin: 2px 6px
      }
      .cart-button {
        padding: 4px 6px;
        border: none;
        background-color: #8bffa5;
        color: #fff;
        border-radius: 50%;
        cursor: pointer;
      }
      .cart-button:hover {
        background-color: #218838;
      }
    `;

    shadow.appendChild(style);
    shadow.appendChild(container);
  }
}

customElements.define("product-grid", ProductGrid);
