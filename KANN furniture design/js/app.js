// document.querySelector('#cart-count-pc').textContent = '0';

// document.querySelector('.add-to-cart').addEventListener('click', function () {
//     let count = document.querySelector('#cart-count').textContent;
//     document.querySelector('#cart-count').textContent = ++count;
// });

// document.querySelector('#count-reset').addEventListener('click', function () {
//     let count = document.querySelector('#cart-count').textContent;
//     if (count > 0) {
//         document.querySelector('#cart-count').textContent = '0';
//     }
// });

// app.js
let cartCount = 0;
let cartCountPC = 0;
const cartCountElement = document.getElementById('cart-count');
const cartCountElementPC = document.getElementById('cart-count-pc');
const addToCartButtons = document.querySelectorAll('.add-to-cart');

// Initialize cart count from localStorage if available
if (localStorage.getItem('cartCount')) {
  cartCount = parseInt(localStorage.getItem('cartCount'));
}

if (localStorage.getItem('cartCountPC')) {
  cartCountPC = parseInt(localStorage.getItem('cartCountPC'));
}

updateCartCount(); // Display initial count
updateCartCountPC(); // Display initial count

addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    cartCount++;
    updateCartCount();
    localStorage.setItem('cartCount', cartCount); // Store updated count
  });
});

addToCartButtons.forEach(button => { 
  button.addEventListener('click', () => {
    cartCountPC++;
    updateCartCountPC();
    localStorage.setItem('cartCountPC', cartCountPC); 
  });
});

const countReset = document.getElementById('count-reset');
const countResetPC = document.getElementById('count-reset-pc');

if (countReset) {
  countReset.addEventListener('click', () => {
    cartCount = 0;
    updateCartCount();
    localStorage.setItem('cartCount', cartCount);
  })
}

if (countResetPC) {
  countResetPC.addEventListener('click', () => {
    cartCountPC = 0;
    updateCartCountPC();
    localStorage.setItem('cartCountPC', cartCountPC);
  })
}

function updateCartCount() {
  cartCountElement.textContent = cartCount;
}
function updateCartCountPC() {
  cartCountElementPC.textContent = cartCountPC;
}

window.addEventListener('scroll', function () {
  const header = document.getElementById('header');
  if (window.scrollY > 50) {
    header.classList.add('blur', 'line');
  } else {
    header.classList.remove('blur', 'line');
  }
});


