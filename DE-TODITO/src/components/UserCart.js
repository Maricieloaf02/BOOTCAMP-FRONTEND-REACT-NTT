class UserCart extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    // Contenedor principal
    const container = document.createElement('div');
    container.classList.add('user-cart-container');

    // Botón del usuario
    const userButton = document.createElement('button');
    userButton.classList.add('user-button');
    userButton.setAttribute('aria-label', 'Usuario');

    const userImg = document.createElement('img');
    userImg.src = './assets/icons/user.svg'; // Ruta al ícono del usuario
    userImg.alt = 'User Icon';

    userButton.appendChild(userImg);

    // Contenedor del carrito
    const cartContainer = document.createElement('div');
    cartContainer.classList.add('cart-container');

    // Botón del carrito
    const cartButton = document.createElement('button');
    cartButton.classList.add('cart-button');
    cartButton.setAttribute('aria-label', 'Carrito');

    const cartImg = document.createElement('img');
    cartImg.src = './assets/icons/carrito.svg'; // Ruta al ícono del carrito
    cartImg.alt = 'Shopping Cart';

    const cartCount = document.createElement('span');
    cartCount.classList.add('cart-count');
    cartCount.textContent = '2'; // Contador inicial

    cartButton.appendChild(cartImg);
    cartButton.appendChild(cartCount);

    // Información del carrito (texto y monto)
    const cartInfo = document.createElement('div');
    cartInfo.classList.add('cart-info');

    const cartText = document.createElement('span');
    cartText.textContent = 'Carrito de compra:';

    const cartAmount = document.createElement('strong');
    cartAmount.textContent = '$57.00'; // Monto inicial

    cartInfo.appendChild(cartText);
    cartInfo.appendChild(cartAmount);

    // Ensamblar contenedor del carrito
    cartContainer.appendChild(cartButton);
    cartContainer.appendChild(cartInfo);

    // Agregar el botón del usuario y el carrito al contenedor principal
    container.appendChild(userButton);
    container.appendChild(cartContainer);

    // Estilos
    const style = document.createElement('style');
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

    shadow.appendChild(style);
    shadow.appendChild(container);
  }
}

// Registrar el componente
customElements.define('user-cart', UserCart);
