import "./assets/css/global.css";
import "./assets/css/variables.css";
import "./components/Header.js";
import "./components/UserCart.js";
import "./components/FilterBar.js";
import "./components/ProductGrid.js";
import "./components/Footer.js";

const productGrid = document.querySelector("product-grid");

(async function fetchProducts() {
  try {
    // Obtener los productos de la API
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();

    // Mapear los productos a un formato más simple
    const products = data.products.map((product) => ({
      name: product.title,
      price: product.price,
      image: product.thumbnail,
      category: product.category,
    }));

    // Configurar productos y paginación inicial
    productGrid.setProducts(products);

    // Manejar cambio de página
    
  } catch (error) {
    console.error("Error fetching products:", error);
  }
})();
