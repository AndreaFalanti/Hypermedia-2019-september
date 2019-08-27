function createEventCards () {
    addFormatters();
    const urlParams = new URLSearchParams(window.location.search);
    let typeValue = urlParams.get("type");
    let dateValue = urlParams.get("date");
    if (typeValue) {
        // Search only events ofr type (and date if present too)
        let fetchUrl = "/v2/events?type=" + typeValue;
        $("#eventTypeDropdown").html(typeValue);
        if (dateValue) {
            fetchUrl = fetchUrl.concat("&date=" + dateValue);
            $("#eventDateDropdown").html(dateValue);
        }

        fetch(fetchUrl).then(r => r.json())
            .then(events => {
                console.log(events);
                $("#events-container").loadTemplate($("#eventCardTemplate"), events, {
                    append: true
                });
            }).then(setEventTypeIcons);
    }
    else if (dateValue) {
        // Search events and seminars for date
        fetch('/v2/events?date=' + dateValue).then(r => r.json());
        fetch('/v2/seminars?date=' + dateValue).then(r => r.json());
    }
    else {
        // default case, search any seminar and event
        fetch('/v2/events').then(r => r.json())
            .then(events => {
                console.log(events);
                $("#events-container").loadTemplate($("#eventCardTemplate"), events, {
                    append: true
                });
            }).then(setEventTypeIcons);
        fetch('/v2/seminars').then(r => r.json())
            .then(seminars => {
                console.log(seminars);
                $("#events-container").loadTemplate($("#seminarCardTemplate"), seminars, {
                    append: true
                });
            })
    }
}

function setEventTypeIcons () {
    let iconTags = document.body.querySelectorAll(".type-icon");
    Array.from(iconTags).forEach(i => {
        let type = i.nextElementSibling.innerHTML;
        setEventIcon(i, type);
    })
}