import "./style.css";
import "./components/Header.ts";
import "./components/UserCart.ts";
import "./components/FilterBar.ts";
import "./components/ProductGrid.ts";
import "./components/Footer.ts";
import { ProductService } from "./services/ProductService";
import { Product } from "./types/Product";

// Inicializamos los servicios y referencias
const productService = new ProductService();
const productGrid = document.querySelector("product-grid") as HTMLElement & {
  setProducts: (products: Product[]) => void;
};
let cartCount = 0; // Contador inicial del carrito
let totalAmount = 0; // Monto inicial del carrito
let userCart: HTMLElement & {
  updateCartCount: (count: number) => void;
  updateCartAmount: (amount: number) => void;
} | null = null;

/**
 * Función auxiliar para esperar a que un elemento esté disponible en el DOM.
 * @param selector - Selector del elemento que se desea esperar.
 * @returns Promesa que se resuelve cuando el elemento está disponible.
 */
const waitForElement = (selector: string): Promise<Element> =>
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
 * @param shadow - Shadow DOM donde buscar el elemento.
 * @param selector - Selector del elemento dentro del Shadow DOM.
 * @returns Promesa que se resuelve cuando el elemento está disponible.
 */
const waitForShadowElement = (
  shadow: ShadowRoot,
  selector: string
): Promise<Element> =>
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
const initializeUserCart = async (): Promise<void> => {
  try {
    // Espera a que main-header esté en el DOM
    const headerElement = (await waitForElement(
      "main-header"
    )) as HTMLElement & { shadowRoot: ShadowRoot };
    const headerShadow = headerElement.shadowRoot;

    // Espera a que el componente user-cart esté dentro del Shadow DOM
    userCart = (await waitForShadowElement(headerShadow, "user-cart")) as HTMLElement & {
      updateCartCount: (count: number) => void;
      updateCartAmount: (amount: number) => void;
    };
    console.log("user-cart encontrado y listo:", userCart);
  } catch (error) {
    console.error("Error inicializando user-cart:", error);
  }
};

// Llama a la función inicializadora
initializeUserCart();

/**
 * Función para obtener y configurar los productos en product-grid utilizando el ProductService.
 */
const fetchAndSetProducts = async (): Promise<void> => {
  try {
    // Usa el servicio para obtener productos
    const products = await productService.fetchProducts();
    console.log("Productos obtenidos:", products);

    // Configura los productos en el componente product-grid
    if (productGrid) {
      productGrid.setProducts(products);
    } else {
      console.warn("No se encontró el componente ProductGrid.");
    }
  } catch (error) {
    console.error("Error al obtener los productos:", error);
  }
};

// Llama a la función para obtener y configurar los productos
fetchAndSetProducts();

/**
 * Escucha y maneja el evento "add-to-cart" para actualizar el carrito.
 */
document.addEventListener(
  "add-to-cart",
  (event: CustomEvent<{ product: Product }>) => {
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
  }
);
