const searchBtn = document.getElementById("searchBtn");
const searchBlock = document.getElementById("searchBlock");
const searchInput = document.getElementById("searchInput");

searchBtn.addEventListener("click", function () { 
    searchBlock.classList.toggle("disabled");
});

searchInput.addEventListener("input", function () {
    if (searchInput.value.trim() === "") {
        searchBtn.type = "button";
    } else {
        searchBtn.type = "submit";
    }
});


const listItemNum = document.querySelectorAll(".list-item-num");
listItemNum.forEach((item, index) => { 
    item.innerText = `0${index + 1}`;
});

const listItemStatus = document.querySelectorAll(".list-item-status");
listItemStatus.forEach(item => { 
    item.innerText = '+'
})

const faqCardTitle = document.querySelectorAll(".list-item-title");

faqCardTitle.forEach(item => { 
    item.addEventListener('click', () => {
        const answer = item.nextElementSibling;
        answer.classList.toggle("disabled");
        
        const status = item.parentElement.querySelector(".list-item-status");
        const faqCard = item.parentElement;
        if (answer.classList.contains("disabled")) {
            status.innerText = '+';
            faqCard.style.transform = "scale(1)";
        } else {
            status.innerText = '-';
            faqCard.style.transform = "scale(1.05)";
        }
    });
})

const subscriptionBtn = document.querySelectorAll(".subscription-time-btn");

subscriptionBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
        subscriptionBtn.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
    });
});

const seasonsTitle = document.querySelectorAll('.seasons-head');

seasonsTitle.forEach(item => {
    item.addEventListener('click', () => {
        const episodes = item.nextElementSibling;
        episodes.classList.toggle('disabled');

        const status = item.querySelector('.season-status');
        if (episodes.classList.contains('disabled')) {
            status.classList.remove('fa-arrow-up');
            status.classList.add('fa-arrow-down')
        } else {
            status.classList.remove('fa-arrow-down');
            status.classList.add('fa-arrow-up')
        }
    });
});

const introBtn = document.getElementById("introBtn");

introBtn.addEventListener("click", function () { 
    window.location.href = "/pages/movies-and-shows.html";
});

