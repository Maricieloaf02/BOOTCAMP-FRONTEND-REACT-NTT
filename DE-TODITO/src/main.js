import './assets/css/global.css';
import './assets/css/variables.css';
import './components/Header.js';
import './components/UserCart.js';
import './components/FilterBar.js';
import './components/ProductGrid.js';
import './components/Pagination.js';
import './components/Footer.js';

const productGrid = document.querySelector('product-grid');
const pagination = document.querySelector('pagination-bar');

const products = [
  { name: 'Red Chili', price: 14.99, image: './assets/images/aji.jpg' },
  { name: 'Big Potatoes', price: 14.99, image: './assets/images/papa.jpg' },
  { name: 'Chanise Cabbage', price: 14.99, image: './assets/images/col-china.jpg' },
  { name: 'Ladies Finger', price: 14.99, image: './assets/images/choclo.jpg' },
  // agregararé más productos
];

// Aquí configuro los productos y paginación inicial
productGrid.setProducts(products);
pagination.setPagination(Math.ceil(products.length / 4), 1);

// Con esto se escu eventos de cambio de página
pagination.addEventListener('page-change', (event) => {
  productGrid.changePage(event.detail);
  pagination.setPagination(
    Math.ceil(products.length / 4),
    event.detail
  );
});

