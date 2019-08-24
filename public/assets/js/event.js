// get tags with attribute: $("[myAttribute=value]"))

function insertData () {
    const urlParams = new URLSearchParams(window.location.search);
    let idValue = urlParams.get("id");
    if (idValue) {
        addFormatters();
        fetch('/v2/events/' + idValue).then(r => r.json())
            .then(data => {
                console.log(data);
                $("#container").loadTemplate($("#eventTemplate"), data, {async: false});
                setEventIcon(document.body.querySelector("#eventIcon"), data.type);
                if (data.seminar_id !== null) {
                    fetch('/v2/seminars/' + data.seminar_id).then(r => r.json())
                        .then(seminar => $("#seminarName").html(seminar.title));
                }
                else {
                    $("#seminarName").html("No seminar for this event");
                    $("#seminarButton").remove();
                }
            })
    }
    else {
        console.log("Prototype page, delete this in the future");
        // Maybe redirect to events page? If id is not set no info can be fetched
    }

}