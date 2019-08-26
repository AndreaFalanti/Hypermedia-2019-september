function createEventCards () {
    addFormatters();
    fetch('/v2/events').then(r => r.json())
        .then(events => {
            console.log(events);
            $("#events-container").loadTemplate($("#eventCardTemplate"), events, {
                append: true
            });
        }).then(setTypeIcons);
    fetch('/v2/seminars').then(r => r.json())
        .then(seminars => {
            console.log(seminars);
            $("#events-container").loadTemplate($("#seminarCardTemplate"), seminars, {
                append: true
            });
        })
}

function setTypeIcons () {
    let iconTags = document.body.querySelectorAll(".type-icon");
    Array.from(iconTags).forEach(i => {
        let type = i.nextElementSibling.innerHTML;
        setEventIcon(i, type);
    })
}