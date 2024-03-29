// Set active element in navbar based on address
function setActiveItem () {
    let navItems = document.body.querySelectorAll(".nav-item");
    Array.from(navItems).forEach(navItem => {
        let href = navItem.firstElementChild.getAttribute("href");

        if (window.location.pathname === href) {
            navItem.classList.add("active");
        }
    });
}

/*
<ul class="navbar-nav ml-auto">
    <li class="nav-item">
        <a class="nav-link" href="/pages/user_reservations.html">Welcome asd fgh</a>
    </li>
    <li class="nav-item">
        <a class="nav-link" onclick="logOut()">Logout</a>
    </li>
</ul>
 */
function setUserActions () {
    //let user = sessionStorage.getItem("userData");
    fetch('/v2/users/data').then(r => r.json())
        .then(user => {
            if (user) {
                let actionsContainer = $("#userActions");
                actionsContainer.empty();

                let welcome = createNavLink("Welcome " + user.firstname + " " + user.lastname);
                welcome.attr("href", "/pages/user_reservations.html");

                let logout = createNavLink("Logout");
                logout.click(() => logOut());

                actionsContainer.append(createNavItem().append(welcome));
                actionsContainer.append(createNavItem().append(logout));
            }
        }).catch(err => console.log("401 error is expected because header checks if user is" +
            " logged in"));
}

function logOut() {
    $.ajax({
        type: "POST",
        url: "/v2/users/logout",
        contentType: "application/json; charset=utf-8",
        success: function(data){
            sessionStorage.removeItem("userData");
            location.reload();
        }
    });
}

function createNavLink (text) {
    return $("<a></a>").addClass("nav-link").html(text);
}

function createNavItem() {
    return $("<li></li>").addClass("nav-item");
}