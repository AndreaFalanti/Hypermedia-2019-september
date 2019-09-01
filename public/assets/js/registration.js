// Used for registering a user into server database
function register() {
    let firstname = $("#inputFirstname").val();
    let lastname = $("#inputLastname").val();
    let email = $("#inputEmail").val();
    let password = $("#inputPassword").val();
    let confirmPassword = $("#inputConfirmPassword").val();

    if (password !== confirmPassword) {
        $("#passwordsError").removeClass("hidden");
        $("#emailError").addClass("hidden");
    }
    else {
        $("#passwordsError").addClass("hidden");
        let json = JSON.stringify({firstname, lastname, email, password});

        $.ajax({
            type: "POST",
            url: "/v2/users/register",
            data: json,
            contentType: "application/json; charset=utf-8",
            success: function(data){document.location.href = "/index.html";},
            error: function(errMsg) {
                $("#emailError").removeClass("hidden");
            }
        });
    }
}