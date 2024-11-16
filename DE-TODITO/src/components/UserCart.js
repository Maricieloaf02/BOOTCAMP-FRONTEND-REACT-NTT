class UserCart extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    // Contenedor principal del componente
    const container = document.createElement("div");
    container.classList.add("user-cart-container");

    // Botón del usuario
    const userButton = this.createButton(
      "user-button",
      "./assets/icons/user.svg",
      "User Icon",
      "Usuario"
    );

    // Contenedor del carrito
    const cartContainer = document.createElement("div");
    cartContainer.classList.add("cart-container");

    // Botón del carrito con contador
    const cartButton = this.createButton(
      "cart-button",
      "./assets/icons/carrito.svg",
      "Shopping Cart",
      "Carrito"
    );
    const cartCount = this.createCartCount(); // Contador del carrito
    cartButton.appendChild(cartCount);

    // Información del carrito (texto y monto total)
    const cartInfo = this.createCartInfo();

    // Ensamblar contenedor del carrito
    cartContainer.appendChild(cartButton);
    cartContainer.appendChild(cartInfo);

    // Agregar botones al contenedor principal
    container.appendChild(userButton);
    container.appendChild(cartContainer);

    // Estilos encapsulados
    const style = document.createElement("style");
    style.textContent = `
      .user-cart-container {
        display: flex;
        align-items: center;
        gap: var(--gap-medium);
      }

      .user-button, .cart-button {
        display: flex;
        align-items: center;
        justify-content: center;
        background: none;
        border: none;
        cursor: pointer;
        padding: 0;
      }

      .user-button img, .cart-button img {
        width: var(--icon-size);
        height: var(--icon-size);
      }

      .cart-container {
        display: flex;
        align-items: center;
        gap: var(--gap-medium);
      }

      .cart-button {
        position: relative;
      }

      .cart-count {
        position: absolute;
        top: -8px;
        right: -8px;
        background: var(--cart-badge-bg);
        color: var(--cart-badge-text);
        border-radius: 50%;
        font-size: var(--font-size-small);
        font-weight: var(--font-weight-bold);
        padding: 2px;
        min-width: 16px;
        text-align: center;
        transition: transform 0.3s ease-in-out;
      }

      .cart-count.update {
        animation: scaleUp 0.3s ease-in-out;
      }

      @keyframes scaleUp {
        0% { transform: scale(1); }
        50% { transform: scale(1.5); }
        100% { transform: scale(1); }
      }

      .cart-info {
        display: flex;
        flex-direction: column;
        gap: var(--gap-small);
        font-size: var(--font-size-small);
        color: var(--secondary-color);
      }

      .cart-info strong {
        font-size: var(--font-size-medium);
        font-weight: var(--font-weight-bold);
        color: var(--secondary-color);
      }
    `;

    // Ensamblar elementos en el Shadow DOM
    shadow.appendChild(style);
    shadow.appendChild(container);

    // Guardar referencias para actualizaciones dinámicas
    this.cartCountElement = cartCount; // Contador del carrito
    this.cartAmountElement = cartInfo.querySelector("strong"); // Monto total
  }

  /**
   * Crea un botón con una imagen y atributos de accesibilidad.
   * @param {string} className - Clase CSS del botón.
   * @param {string} imgSrc - Ruta de la imagen.
   * @param {string} imgAlt - Texto alternativo para la imagen.
   * @param {string} ariaLabel - Etiqueta ARIA del botón.
   * @returns {HTMLElement} - Botón creado.
   */
  createButton(className, imgSrc, imgAlt, ariaLabel) {
    const button = document.createElement("button");
    button.classList.add(className);
    button.setAttribute("aria-label", ariaLabel);

    const img = document.createElement("img");
    img.src = imgSrc;
    img.alt = imgAlt;

    button.appendChild(img);
    return button;
  }

  /**
   * Crea el contador del carrito.
   * @returns {HTMLElement} - Elemento del contador del carrito.
   */
  createCartCount() {
    const cartCount = document.createElement("span");
    cartCount.classList.add("cart-count");
    cartCount.textContent = "0"; // Valor inicial del contador
    return cartCount;
  }

  /**
   * Crea el contenedor con la información del carrito.
   * @returns {HTMLElement} - Contenedor con texto y monto total.
   */
  createCartInfo() {
    const cartInfo = document.createElement("div");
    cartInfo.classList.add("cart-info");

    const cartText = document.createElement("span");
    cartText.textContent = "Carrito de compra:";

    const cartAmount = document.createElement("strong");
    cartAmount.textContent = "$0.00"; // Monto inicial

    cartInfo.appendChild(cartText);
    cartInfo.appendChild(cartAmount);
    return cartInfo;
  }

  /**
   * Actualiza el contador del carrito.
   * @param {number} newCount - Nuevo valor del contador.
   */
  updateCartCount(newCount) {
    this.cartCountElement.textContent = newCount;

    // Agrega una animación al contador
    this.cartCountElement.classList.add("update");
    setTimeout(() => this.cartCountElement.classList.remove("update"), 300);
  }

  /**
   * Actualiza el monto total del carrito.
   * @param {number} newAmount - Nuevo monto total. 
   */
  updateCartAmount(newAmount) {
    this.cartAmountElement.textContent = `$${newAmount.toFixed(2)}`;
  }
}

// Registrar el componente
customElements.define("user-cart", UserCart);
