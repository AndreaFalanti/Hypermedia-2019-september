function createEventCards () {
    fetch('/v2/events').then(r => r.json())
        .then(events => {
            $("#events-container").loadTemplate($("#eventCardTemplate"), events, {
                append: true
            });
        });
}