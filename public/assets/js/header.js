// Set active element in navbar based on address
function setActiveItem () {
    let navItems = document.body.querySelectorAll(".nav-item");
    Array.from(navItems).forEach(navItem => {
        let href = navItem.firstElementChild.getAttribute("href");
        /*console.log(window.location.pathname);
        console.log(href);*/
        if (window.location.pathname === href) {
            navItem.classList.add("active");
        }
    });
}