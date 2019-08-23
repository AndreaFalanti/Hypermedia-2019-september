// get tags with attribute: $("[myAttribute=value]"))

function insertData () {
    const urlParams = new URLSearchParams(window.location.search);
    let idValue = urlParams.get("id");
    if (idValue) {
        fetch('/v2/events/' + idValue).then(r => r.json())
            .then(data => $("[myAttribute=value]"))
    }
    else {
        console.log("Prototype page, delete this in the future");
        // Maybe redirect to events page? If id is not set no info can be fetched
    }

}