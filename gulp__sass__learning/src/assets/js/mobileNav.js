const burger = document.getElementById('sidebarToggle');
const sidebar = document.getElementById('sidebar');
const page = document.getElementById('page');
const body = document.body;
let subnav = document.getElementById('sidebar-subnav');

burger.addEventListener('click', e => {
    if( body.classList.contains('show-sidebar') ) {
        closeSidebar();
    } else {
        showSidebar();
    }
});

document.getElementById('subnav-dropdown').addEventListener('click', function() {
    const dropdown = this;
    const isActive = subnav.classList.toggle('subnav--active');

    this.classList.toggle('is-rotated');
});

function showSidebar() {
    let mask = document.createElement('div');
    mask.classList.add('page__mask');
    mask.addEventListener('click', closeSidebar);
    page.appendChild(mask);

    body.classList.add('show-sidebar');
}

function closeSidebar() {
    body.classList.remove('show-sidebar');
    document.querySelector('.page__mask').remove();
    subnav.classList.remove('subnav--active');
}

