
import "./style.css";
import "./components/Header.js";
import "./components/UserCart.js";
import "./components/FilterBar.js";
import "./components/ProductGrid.js";
import "./components/Footer.js";

// Referencia a elementos y variables globales
const productGrid = document.querySelector("product-grid");
let cartCount = 0; // Contador inicial del carrito
let totalAmount = 0; // Monto inicial del carrito
let userCart = null; // Referencia al componente user-cart

/**
 * Función auxiliar para esperar a que un elemento esté disponible en el DOM.
 * @param {string} selector - Selector del elemento que se desea esperar.
 * @returns {Promise<Element>} - Promesa que se resuelve cuando el elemento está disponible.
 */
// podr'ias llevarlo a un archivo independiente llamado utils
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

/**
 * Función auxiliar para esperar a un elemento dentro del Shadow DOM.
 * @param {ShadowRoot} shadow - Shadow DOM donde buscar el elemento.
 * @param {string} selector - Selector del elemento dentro del Shadow DOM.
 * @returns {Promise<Element>} - Promesa que se resuelve cuando el elemento está disponible.
 */
// podr'ias llevarlo a un archivo independiente llamado utils
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

/**
 * Inicializa el componente user-cart esperando a que esté disponible en el DOM.
 */
const initializeUserCart = async () => {
  try {
    // Espera a que main-header esté en el DOM
    const headerElement = await waitForElement("main-header");
    const headerShadow = headerElement.shadowRoot;

    // Espera a que el componente user-cart esté dentro del Shadow DOM
    userCart = await waitForShadowElement(headerShadow, "user-cart");
    console.log("user-cart encontrado y listo:", userCart);
  } catch (error) {
    console.error("Error inicializando user-cart:", error);
  }
};

// Llama a la función inicializadora
initializeUserCart();

/**
 * Función para obtener y configurar los productos en product-grid.
 */
// deber'ia estar en otro archivo para que tu main quede m'as limpio
const fetchAndSetProducts = async () => {
  try {
    const response = await fetch("https://dummyjson.com/products?limit=1000");
    const data = await response.json();

    // Transforma los datos de los productos al formato esperado por product-grid
    const products = data.products.map((product) => ({
      name: product.title,
      price: product.price,
      image: product.thumbnail,
      category: product.category,
    }));

    // Configura los productos en el componente product-grid
    productGrid.setProducts(products);
  } catch (error) {
    console.error("Error al obtener los productos:", error);
  }
};

// Llama a la función para obtener y configurar los productos
fetchAndSetProducts();

/**
 * Escucha y maneja el evento "add-to-cart" para actualizar el carrito.
 */
document.addEventListener("add-to-cart", (event) => {
  try {
    const { product } = event.detail; // Producto agregado al carrito
    cartCount += 1; // Incrementa el contador del carrito
    totalAmount += product.price; // Incrementa el monto total

    // Actualiza el contador y monto en user-cart si está disponible
    if (userCart) {
      console.log("Actualizando user-cart...");
      userCart.updateCartCount(cartCount); // Actualiza el contador
      userCart.updateCartAmount(totalAmount); // Actualiza el monto total
    } else {
      console.warn("user-cart aún no está disponible para actualizar.");
    }
  } catch (error) {
    console.error("Error manejando el evento add-to-cart:", error);
  }
});
