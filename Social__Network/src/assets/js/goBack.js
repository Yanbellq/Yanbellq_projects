const backBtn = document.querySelectorAll('[data-back]')

backBtn.forEach(item => {
    item.addEventListener('click', function() {
        history.back(); // або history.go(-1)
    });
})