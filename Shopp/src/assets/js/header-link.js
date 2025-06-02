const headerNav = document.querySelector('[data-headerNav]');
const navLinks = headerNav.querySelectorAll('.nav__link');

navLinks.forEach(link => {
    const linkPath = link.getAttribute('href').slice(2);
    
    if (linkPath === window.location.pathname.slice(1)) {
        link.closest('.nav__item').classList.add('active');
    }
});


const blog = document.querySelector('[href="./blog.html"]')
console.log(blog);

if (window.location.pathname.slice(1) === "post.html") {
    blog.closest('.nav__item').classList.add('active')
}
