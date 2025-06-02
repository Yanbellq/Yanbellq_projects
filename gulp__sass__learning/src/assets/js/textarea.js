const textArea = document.querySelectorAll('[data-autoresize]');

textArea.forEach(item => {
    let textAreaH = item.offsetHeight;
    item.addEventListener('input', e => {
        let $this = e.currentTarget;

        $this.style.height = (textAreaH / 10) + 'rem';
        $this.style.height = ($this.scrollHeight / 10) + 'rem';
    })
})