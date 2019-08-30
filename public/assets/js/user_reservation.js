function insertData () {
    addFormatters();
    fetch('/v2/users/reservations').then(r => r.json())
        .then(data => {
            console.log(data);
            let cardContainer;
            for (let count = 0; count < data.length; count++) {
                if (count % 3 === 0) {
                    cardContainer = createCardContainer();
                    $("#cont").append(cardContainer);
                }
                cardContainer.loadTemplate($("#reservationCardTemplate"), data[count], {async: false, append: true});
            }

            // This array have the same length, selectors are in document order
            let priceTags = Array.from(document.body.querySelectorAll(".res-cost"));
            let iconTags = Array.from(document.body.querySelectorAll(".event-icon"));
            let cancelButtons = Array.from(document.body.querySelectorAll(".res-cancel"));
            for (let count = 0; count < priceTags.length; count++) {
                priceTags[count].appendChild(document.createTextNode(5 * data[count].tickets + ".00"));
                setEventIcon(iconTags[count], data[count].type);
                cancelButtons[count].addEventListener("click", () => cancelReservation(data[count].event_id));
            }
        });
}

function createCardContainer () {
    return $("<div></div>").addClass("row my-4");
}

function cancelReservation (id) {
    $.ajax({
        type: "POST",
        url: "/v2/users/reservations/cancel/" + id,
        contentType: "application/json; charset=utf-8",
        success: function(data){
            location.reload();
        },
        error: function(errMsg) {
            alert(JSON.stringify(errMsg, null, 4));
            return false;
        }
    });
}