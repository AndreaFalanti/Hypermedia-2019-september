function createEventCards () {
    addFormatters();
    fetch('/v2/events').then(r => r.json())
        .then(events => {
            $("#events-container").loadTemplate($("#eventCardTemplate"), events, {
                append: true
            });
        }).then(setTypeIcons);
}

function setTypeIcons () {
    let iconTags = document.body.querySelectorAll(".type-icon");
    Array.from(iconTags).forEach(i => {
        let type = i.nextElementSibling.innerHTML;
        setEventIcon(i, type);
    })
}