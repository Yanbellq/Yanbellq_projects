const tabsBtn = document.querySelectorAll(".button-portfolio");
const tabsItems = document.querySelectorAll(".port-list-item");

let products = [];

tabsItems.forEach(function (item) { 
    products.push(item);
})

tabsBtn.forEach(onTabClick);

function onTabClick(item) {
    item.addEventListener("click", function () {
        let currentBtn = item;
        let tabId = currentBtn.getAttribute("data-tab");

        if (!currentBtn.classList.contains('active-button')) {
            tabsBtn.forEach(function (item) {
                item.classList.remove('active-button');
            });

            currentBtn.classList.add('active-button');
        }

        products.forEach(function (item) {
            item.classList.add("hidden");
        });
        switch (tabId) {
            case 'tab1':
                products.forEach(function (item) {
                    item.classList.remove("hidden");
                });
                break;
            case 'tab2':
                filtered = products.filter(p => p.hasAttribute("name") && p.getAttribute("name") === "web");
                filtered.forEach(function (item) {
                    item.classList.remove("hidden");
                });
                break;
            case 'tab3':
                filtered = products.filter(p => p.hasAttribute("name") && p.getAttribute("name") === "app");
                filtered.forEach(function (item) {
                    item.classList.remove("hidden");
                });
                break;
            case 'tab4':
                filtered = products.filter(p => p.hasAttribute("name") && p.getAttribute("name") === "design");
                filtered.forEach(function (item) {
                    item.classList.remove("hidden");
                });
                break;
            case 'tab5':
                filtered = products.filter(p => p.hasAttribute("name") && p.getAttribute("name") === "marketing");
                filtered.forEach(function (item) {
                    item.classList.remove("hidden");
                });
                break;
        } 
    });
}
