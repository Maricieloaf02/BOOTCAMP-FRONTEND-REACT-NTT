import { Product } from "../types/Product";
import shopIcon from "../assets/icons/compra.svg";

/**
 * Clase ProductGrid
 * Representa una cuadrícula de productos dinámicamente actualizable.
 */
class ProductGrid extends HTMLElement {
  private products: Product[] = [];
  private originalProducts: Product[] = [];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  /**
   * Establece los productos y renderiza la grid.
   * @param products - Lista de productos a mostrar.
   */
  public setProducts(products: Product[]): void {
    if (!this.originalProducts.length) {
      this.originalProducts = products; // Guarda la lista original de productos para filtros
    }
    this.products = products;
    this.render();
  }

  /**
   * Renderiza el contenido de la grid de productos.
   */
  private render(): void {
    const shadow = this.shadowRoot!;
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
   * @returns Contenedor de la grid.
   */
  private createGridContainer(): HTMLDivElement {
    const container = document.createElement("div");
    container.classList.add("product-grid");
    return container;
  }

  /**
   * Crea una tarjeta de producto.
   * @param product - Información del producto.
   * @returns Tarjeta del producto.
   */
  private createProductCard(product: Product): HTMLDivElement {
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
   * @param product - Información del producto.
   * @returns Contenedor con el nombre, precio y botón.
   */
  private createProductInfo(product: Product): HTMLDivElement {
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
   * @param product - Información del producto.
   * @returns Botón de agregar al carrito.
   */
  private createCartButton(product: Product): HTMLButtonElement {
    const cartButton = document.createElement("button");
    cartButton.classList.add("cart-button");
    cartButton.setAttribute("aria-label", "Add to cart");

    const cartIcon = document.createElement("img");
    cartIcon.src = shopIcon;
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
   * @returns Elemento de estilos.
   */
  private createStyles(): HTMLStyleElement {
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
    `;
    return style;
  }
}

// Registrar el componente como un Custom Element
customElements.define("product-grid", ProductGrid);
