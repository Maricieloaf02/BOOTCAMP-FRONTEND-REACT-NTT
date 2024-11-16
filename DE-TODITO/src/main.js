import "./assets/css/global.css";
import "./assets/css/variables.css";
import "./components/Header.js";
import "./components/UserCart.js";
import "./components/FilterBar.js";
import "./components/ProductGrid.js";
import "./components/Footer.js";

const productGrid = document.querySelector("product-grid");
let cartCount = 0; // Inicializa el contador del carrito
let totalAmount = 0; // Inicializa el monto total del carrito
let userCart = null; // Referencia al componente user-cart

// Función para esperar a que el header y user-cart estén listos
const initializeUserCart = async () => {
  // Espera a que main-header esté en el DOM
  const waitForElement = (selector) =>
    new Promise((resolve) => {
      const element = document.querySelector(selector);
      if (element) {
        resolve(element);
        return;
      }
      const observer = new MutationObserver(() => {
        const element = document.querySelector(selector);
        if (element) {
          resolve(element);
          observer.disconnect();
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });
    });

  // Espera a que el main-header esté disponible
  const headerElement = await waitForElement("main-header");
  const headerShadow = headerElement.shadowRoot;

  // Espera a que el user-cart esté disponible dentro del Shadow DOM
  const waitForShadowElement = (shadow, selector) =>
    new Promise((resolve) => {
      const element = shadow.querySelector(selector);
      if (element) {
        resolve(element);
        return;
      }
      const observer = new MutationObserver(() => {
        const element = shadow.querySelector(selector);
        if (element) {
          resolve(element);
          observer.disconnect();
        }
      });
      observer.observe(shadow, { childList: true, subtree: true });
    });

  // Obtén el user-cart
  userCart = await waitForShadowElement(headerShadow, "user-cart");
  console.log("user-cart encontrado y listo:", userCart);
};

// Llama la función inicializadora
initializeUserCart();

// Configurar los productos en product-grid
(async function fetchProducts() {
  try {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();

    const products = data.products.map((product) => ({
      name: product.title,
      price: product.price,
      image: product.thumbnail,
      category: product.category,
    }));

    productGrid.setProducts(products);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
})();

// Escucha el evento "add-to-cart" para manejar la lógica de agregar al carrito
document.addEventListener("add-to-cart", (event) => {
  console.log("Evento capturado: ", event.detail);

  const { product } = event.detail; // Obtén el producto desde el evento
  cartCount += 1; // Incrementa el contador
  totalAmount += product.price; // Incrementa el monto total

  // Actualiza el contador y el monto en user-cart
  if (userCart) {
    console.log("Actualizando contador del carrito...");
    userCart.updateCartCount(cartCount); // Actualiza el contador en user-cart
    userCart.updateCartAmount(totalAmount); // Actualiza el monto total
  } else {
    console.warn("user-cart aún no está disponible para actualizar.");
  }
});

