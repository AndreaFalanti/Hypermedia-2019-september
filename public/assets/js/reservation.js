// Add event data to input tags
function addEventData() {
    $(document).ready(() => {
        const urlParams = new URLSearchParams(window.location.search);
        let idValue = urlParams.get("id");
        if (idValue) {
            fetch('/v2/events/' + idValue).then(r => r.json())
                .then(event => {
                    $("#inputEventName").val(event.name);
                    $("#inputEventLocation").val(event.location);
                    $("#inputEventDate").val(new Date(event.date).toDateString());
                });
        }
        else {
            console.log("id not present");
            // redirect to another page?
        }
    });
}

function reservation() {
}