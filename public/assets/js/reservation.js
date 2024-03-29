let idValue;

// Add event data to input tags
function addEventData() {
    const urlParams = new URLSearchParams(window.location.search);
    idValue = urlParams.get("id");
    if (idValue) {
        $("#eventLink").attr("href", "/pages/event.html?id=" + idValue);
        fetch('/v2/events/' + idValue).then(r => r.json())
            .then(event => {
                $("#inputEventName").val(event.name);
                $("#inputEventLocation").val(event.location);
                $("#inputEventDate").val(new Date(event.date).toDateString());
            })
            .catch(err => handleInvalidId("/index.html"));
    }
    else {
        // Redirect to home page if no id is defined
        handleAbsentId("/index.html")
    }
}

function checkIfReservationIsAlreadyPresent() {
    fetch('/v2/users/reservations').then(r => r.json())
        .then(reservations => {
            if (reservations.some(e => e.event_id === parseInt(idValue))) {
                $("#reservationWarning").removeClass("hidden");
            }
        }).catch(() => {
        // Redirect to login page if not authorized is returned
        document.location.href = "/pages/login.html";
    });
}

function reservation() {
    let tickets = $("#ticketSelector").val();
    let json = JSON.stringify({event_id: parseInt(idValue) , tickets: parseInt(tickets)});

    $.ajax({
        type: "POST",
        url: "/v2/users/reserve",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){document.location.href = "/pages/user_reservations.html";},
        error: function(errMsg) {
            $("#emailError").removeClass("hidden");
            alert(JSON.stringify(errMsg, null, 4));
            return false;
        }
    });
}