const like = document.querySelectorAll('.badge__like');

like.forEach(item => {
    item.addEventListener('click', e => {
        $this = e.currentTarget;   
            
        $this.classList.toggle('active')
    })
});