const DELIVERY_FEE = 40;
const COD_FEE_SERVICE = 0.05;
const CURRENCY = 'THB';
const CURRENCY_SYMBOL = '฿';
const CURRENCY_FIXED = 0;

// Estructura simplificada para el carrito
let cart = [];
let currentCategory = undefined;

// Cargar carrito del localStorage (ahora solo contiene id y quantity)
if (localStorage.getItem('cart')) {
  const savedCart = JSON.parse(localStorage.getItem('cart'));
  // Reconstruir el carrito completo obteniendo los detalles de PRODUCTS
  cart = savedCart
    .map((item) => {
      const productDetails = PRODUCTS.find((p) => p.id === item.id);
      // Solo devolver el producto si existe en PRODUCTS
      return productDetails ? { ...productDetails, quantity: item.quantity } : null;
    })
    .filter((item) => item !== null); // Eliminar productos que ya no existen
}

const categoryTabs = document.querySelector('.categories');
CATEGORIES.forEach(({ id, name }) => {
  const tab = document.createElement('div');
  tab.classList.add('category');
  tab.textContent = name;
  tab.addEventListener('click', () => {
    currentCategory = id;
    renderProducts(id ? PRODUCTS.filter((p) => p.category === id) : PRODUCTS);
    document.querySelectorAll('.category').forEach((t) => t.classList.remove('active'));
    tab.classList.add('active');
  });
  categoryTabs.appendChild(tab);
});

categoryTabs.firstChild.classList.add('active');

function renderProducts(products) {
  const productGrid = document.querySelector('.products');
  productGrid.innerHTML = '';
  products.forEach((product) => {
    const card = document.createElement('div');
    card.classList.add('product');
    card.setAttribute('data-id', product.id);
    card.innerHTML = `
    <img src="./images/${product.image}" alt="${product.name}">
    <div>
      <p>${product.name}</p>
      <span>
        <strong>${product.price} ${CURRENCY_SYMBOL}</strong>
        <small class="tiny"> / ${product.quantity > 1 ? product.quantity : ''}${product.unit}</small>
      </span>
    </div>
  `;
    card.addEventListener('click', () => addToCart(product));
    productGrid.appendChild(card);
  });
}

renderProducts(PRODUCTS);
updateCartSummary();

function addToCart(product) {
  const existingItem = cart.find((item) => item.id === product.id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  updateCartSummary();
  saveCartToLocalStorage();

  const card = document.querySelector(`.product[data-id="${product.id}"]`);
  if (card) {
    card.classList.add('selected');
    setTimeout(() => card.classList.remove('selected'), 1000);
  }
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id != productId);
  updateCartSummary();
  saveCartToLocalStorage();
}

// Función para guardar solo id y quantity en localStorage
function saveCartToLocalStorage() {
  const simplifiedCart = cart.map((item) => ({
    id: item.id,
    quantity: item.quantity,
  }));
  localStorage.setItem('cart', JSON.stringify(simplifiedCart));
}

function updateCartSummary() {
  const cartSummary = document.querySelector('.cart-summary');
  cartSummary.innerHTML = '';
  cart.forEach((item) => {
    const div = document.createElement('div');
    div.classList.add('cart-item');
    div.innerHTML = `
    <img src="./images/${item.image}" alt="${item.name}">
      <p>${item.name}</p>
    <div class="quantity-controls">
      <button class="secondary decrement" data-product-id="${item.id}">-</button>
      <span>${item.quantity}</span>
      <button class="secondary increment" data-product-id="${item.id}">+</button>
    </div>
  `;

    cartSummary.appendChild(div);
  });

  // Show or hide footer based on cart contents
  const footer = document.querySelector('footer');
  if (cart.length > 0) {
    footer.classList.remove('hidden');
  } else {
    footer.classList.add('hidden');
  }
}

// Handle clicks on quantity buttons and delete
const cartSummary = document.querySelector('.cart-summary');
cartSummary.addEventListener('click', (e) => {
  const productId = e.target.dataset.productId;
  if (!productId) return;

  const item = cart.find((item) => item.id == productId);

  if (e.target.classList.contains('increment')) {
    if (item) {
      item.quantity += 1;
    }
  } else if (e.target.classList.contains('decrement')) {
    if (item) {
      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        if (confirm('Do you want to remove this product from your cart?')) {
          removeFromCart(productId);
          return;
        }
      }
    }
  }

  updateCartSummary();
  saveCartToLocalStorage();
});

// Calculate subtotal
function calculateSubtotal() {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

// Calculate total with delivery fee
function calculateTotal() {
  return calculateSubtotal() + DELIVERY_FEE;
}

// Calculate COD surcharge (5% with no limit)
function calculateCODSurcharge(total) {
  return total * COD_FEE_SERVICE;
}

// Search functionality
const searchInput = document.querySelector('#search-input');
searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  if (query) {
    const filteredProducts = PRODUCTS.filter((p) => p.name.toLowerCase().includes(query));
    renderProducts(filteredProducts);
  } else {
    renderProducts(PRODUCTS.filter((p) => p.category === currentCategory));
  }
});

// Function to render order summary in checkout
function renderCheckoutSummary() {
  const checkoutItems = document.querySelector('#checkout-items');
  checkoutItems.innerHTML = '';

  cart.forEach((item) => {
    const div = document.createElement('div');
    div.classList.add('summary-item');
    div.innerHTML = `
    <small>${item.name} x${item.quantity}</small>
    <small>${item.price * item.quantity} ${CURRENCY}</small>
  `;
    checkoutItems.appendChild(div);
  });

  document.querySelector('#checkout-subtotal').textContent = `${calculateSubtotal()} ${CURRENCY}`;
  document.querySelector('#checkout-total').textContent = `${calculateTotal()} ${CURRENCY}`;
}

// Checkout button
const checkoutBtn = document.querySelector('#checkout-btn');
const checkoutSection = document.querySelector('#checkout');
checkoutBtn.addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }

  renderCheckoutSummary();

  checkoutSection.style.display = 'flex';
  document.querySelector('header').style.display = 'none';
  document.querySelector('#search-container').style.display = 'none';
  document.querySelector('main').style.display = 'none';
  document.querySelector('footer').style.display = 'none';
});

// Back button from checkout to cart
document.querySelector('#back-to-cart').addEventListener('click', () => {
  checkoutSection.style.display = 'none';
  document.querySelector('header').style.display = 'flex';
  document.querySelector('#search-container').style.display = 'flex';
  document.querySelector('main').style.display = 'flex';
  document.querySelector('footer').style.display = 'flex';
});

// Payment options
const codBtn = document.querySelector('#cod-btn');
const stripeBtn = document.querySelector('#stripe-btn');
codBtn.addEventListener('click', () => showCODForm());
stripeBtn.addEventListener('click', () => {
  alert('Redirecting to Stripe (simulated)...');
  showConfirmation();
});

// Back button from COD form to checkout
document.querySelector('#back-to-checkout').addEventListener('click', () => {
  document.querySelector('#cod').style.display = 'none';
  checkoutSection.style.display = 'flex';
});

function showCODForm() {
  const total = calculateTotal();
  const surcharge = parseInt(total * COD_FEE_SERVICE);
  const totalWithSurcharge = total + surcharge;
  document.querySelector('#total-amount').textContent = `${total} ${CURRENCY}`;
  document.querySelector('#surcharge').textContent = `${surcharge} ${CURRENCY}`;
  document.querySelector('#total-with-surcharge').textContent = `${totalWithSurcharge} ${CURRENCY}`;

  const savedData = JSON.parse(localStorage.getItem('personalData')) || {};
  document.querySelector('#name').value = savedData.name || '';
  document.querySelector('#address').value = savedData.address || '';
  document.querySelector('#phone').value = savedData.phone || '';

  document.querySelector('#cod').style.display = 'flex';
  checkoutSection.style.display = 'none';
}

const form = document.querySelector('#cod form');
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const button = document.querySelector('#cod form button');
  button.disabled = true;
  button.textContent = 'Wait a moment...';

  const name = document.querySelector('#name').value;
  const address = document.querySelector('#address').value;
  const phone = document.querySelector('#phone').value;

  const formData = new FormData();
  formData.append('name', name);
  formData.append('address', address);
  formData.append('phone', phone);
  formData.append('total', parseInt(calculateTotal() * (1 + COD_FEE_SERVICE)) + CURRENCY);
  formData.append(
    'products',
    JSON.stringify(
      cart.map(
        (item) => `${item.name} x${item.quantity} - ${item.price * item.quantity} ${CURRENCY}`
      )
    )
  );

  fetch(
    'https://script.google.com/macros/s/AKfycbwYY4fAYW4eyKTsqH46F1U4A8XZd-l-YdSG4CWqafzzmUkJiuWZ_LNvg43cPmjaslEB/exec',
    { method: 'POST', body: formData }
  )
    .then((response) => response.json())
    .then((data) => {
      form.reset();

      if (name && address && phone) {
        localStorage.setItem('personalData', JSON.stringify({ name, address, phone }));
        showConfirmation();

        button.disabled = false;
        button.textContent = 'Confirm Order';
      } else {
        alert('Please complete all fields, especially the phone number.');
      }
    })
    .catch((error) => {
      alert('Hubo un error al procesar tu pedido. Por favor, intenta de nuevo.');
    });
});

// Show confirmation and clear cart
function showConfirmation() {
  document.querySelector('#cod').style.display = 'none';
  document.querySelector('#checkout').style.display = 'none';
  document.querySelector('#confirmation').style.display = 'flex';
  cart = [];
  localStorage.removeItem('cart');
  updateCartSummary();
}

// Back to home
const backToHomeBtn = document.querySelector('#back-to-home');
backToHomeBtn.addEventListener('click', () => {
  document.querySelector('#confirmation').style.display = 'none';
  document.querySelector('main').style.display = 'flex';
  // renderProducts(PRODUCTS.filter((p) => p.category === currentCategory));
  // searchInput.value = '';
});
