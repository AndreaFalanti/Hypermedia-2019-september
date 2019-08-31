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
            });
    }
    else {
        // redirect to another page?
    }
}

function checkIfReservationIsAlreadyPresent() {
    fetch('/v2/users/reservations').then(r => r.json())
        .then(reservations => {
            if (reservations.some(e => e.event_id === parseInt(idValue))) {
                $("#reservationWarning").removeClass("hidden");
            }
        }).catch(error => {
        // Redirect to login page
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
        success: function(data){document.location.href = "../index.html";},
        error: function(errMsg) {
            $("#emailError").removeClass("hidden");
            alert(JSON.stringify(errMsg, null, 4));
            return false;
        }
    });
}