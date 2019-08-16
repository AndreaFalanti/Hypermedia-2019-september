// Used for registering a user into server database
function register() {
    let firstname = $("#inputFirstname").val();
    let lastname = $("#inputLastname").val();
    let email = $("#inputEmail").val();
    let password = $("#inputPassword").val();
    let confirmPassword = $("#inputConfirmPassword").val();

    if (password !== confirmPassword) {
        alert("Passwords don't match");
    }
    else {
        let json = JSON.stringify({firstname, lastname, email, password});
        console.log(json);

        $.ajax({
            type: "POST",
            url: "/v2/users/register",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data){alert(data + "ok");},
            failure: function(errMsg) {
                alert(errMsg + "error");
            }
        });
    }
}