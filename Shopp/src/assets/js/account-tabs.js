document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll('.tab__item');
    const contents = document.querySelectorAll('.tab__content');

    // Активуємо перший таб і контент при завантаженні
    if (tabs.length > 0) {
        tabs[0].classList.add('active');
    }
    if (contents.length > 0) {
        contents[0].classList.remove('disabled');
    }

    tabs.forEach((tab, idx) => {
        tab.addEventListener('click', function () {
            // Якщо це не перший таб, дозволяємо перемикання
            if (idx !== 0) {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                contents.forEach(content => content.classList.add('disabled'));
                const contentId = `tab-content${idx + 1}`;
                const contentToShow = document.getElementById(contentId);
                if (contentToShow) {
                    contentToShow.classList.remove('disabled');
                }
            }
            // Якщо це перший таб, завжди залишаємо його активним
            else {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                contents.forEach(content => content.classList.add('disabled'));
                if (contents[0]) {
                    contents[0].classList.remove('disabled');
                }
            }

            if (idx === 5) {
                window.location.href = './login.html';
            }
        });
    });


    const billingLink = document.getElementById('billing-address-link');
    const billingForm = document.getElementById('billing-address-form');
    const shippingLink = document.getElementById('shipping-address-link');
    const shippingForm = document.getElementById('shipping-address-form');

    billingLink.addEventListener('click', e => {
        billingForm.classList.remove('disabled');
        e.currentTarget.parentElement.classList.add('disabled');
    })
    shippingLink.addEventListener('click', e => {
        shippingForm.classList.remove('disabled');
        e.currentTarget.parentElement.classList.add('disabled');
    })


    const orderLink = document.getElementById('order-link');
    const orderTable = document.getElementById('order-table');
    const downloadLink = document.getElementById('download-link');
    const downloadTable = document.getElementById('download-table');

    orderLink.addEventListener('click', e => {
        orderTable.classList.remove('disabled');
        e.currentTarget.parentElement.classList.add('disabled');
    })
    downloadLink.addEventListener('click', e => {
        downloadTable.classList.remove('disabled');
        e.currentTarget.parentElement.classList.add('disabled');
    })
});