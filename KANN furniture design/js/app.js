// document.querySelector('#cart-count').textContent = '0';

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
const cartCountElement = document.getElementById('cart-count');
const addToCartButtons = document.querySelectorAll('.add-to-cart');

// Initialize cart count from localStorage if available
if (localStorage.getItem('cartCount')) {
  cartCount = parseInt(localStorage.getItem('cartCount'));
}

updateCartCount(); // Display initial count

addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    cartCount++;
    updateCartCount();
    localStorage.setItem('cartCount', cartCount); // Store updated count
  });
});



const countReset = document.getElementById('count-reset');

if (countReset) {
  countReset.addEventListener('click', () => {
    cartCount = 0;
    updateCartCount();
    localStorage.setItem('cartCount', cartCount);
  })
}



function updateCartCount() {
  cartCountElement.textContent = cartCount;
}

