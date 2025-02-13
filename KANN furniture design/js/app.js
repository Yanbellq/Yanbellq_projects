document.querySelector('#cart-count').textContent = '0';

document.querySelector('.add-to-cart').addEventListener('click', function () {
    let count = document.querySelector('#cart-count').textContent;
    document.querySelector('#cart-count').textContent = ++count;
});

document.querySelector('#count-reset').addEventListener('click', function () {
    let count = document.querySelector('#cart-count').textContent;
    if (count > 0) {
        document.querySelector('#cart-count').textContent = '0';
    }
});