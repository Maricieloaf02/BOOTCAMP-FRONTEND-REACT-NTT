import './assets/css/global.css';
import './assets/css/variables.css';
import './assets/css/header.css';
import './assets/css/hero.css';
import './assets/css/benefits.css';
import './assets/css/categories.css';
import './assets/css/shop.css'; 
import './assets/css/footer.css';
import './components/SearchBar.js';
import './components/Header.js';
import './components/UserCart.js';

// Código de interactividad básica
document.addEventListener('DOMContentLoaded', () => {
  console.log('¡De Todito está listo!');

  // Ejemplo: Evento al hacer clic en el botón de carrito
  const cartButton = document.querySelector('.cart-button');
  if (cartButton) {
    cartButton.addEventListener('click', () => {
      alert('¡Carrito de compras abierto!');
    });
  }
});
