// Used for login a user into the web site
function login() {
    let email = $("#inputEmail").val();
    let password = $("#inputPassword").val();

    let json = JSON.stringify({email, password});
    console.log(json);

    $.ajax({
        type: "POST",
        url: "/v2/users/login",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
            document.location.href = "../index.html";
            sessionStorage.setItem("userData", data.firstname + " " + data.lastname);
            },
        error: function(errMsg) {
            $("#loginError").removeClass("hidden");
            alert(JSON.stringify(errMsg, null, 4));
            return false;
        }
    });
}