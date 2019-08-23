function createEventCards () {
    fetch('/v2/events').then(r => r.json())
        .then(events => {
            events.map(e => {
                e.type = e.type.charAt(0).toUpperCase() + e.type.slice(1);
                e.date = new Date(e.date).toDateString();
            });
            $("#events-container").loadTemplate($("#eventCardTemplate"), events, {
                append: true
            });
        }).then(setTypeIcons);
}

function setTypeIcons () {
    let iconTags = document.body.querySelectorAll(".type-icon");
    Array.from(iconTags).map(i => {
        let type = i.nextElementSibling.innerHTML;
        switch (type) {
            case "Music":
                i.classList.add("fa-headphones");
                break;
            case "Theater":
                i.classList.add("fa-theater-masks");
                break;
            case "Opera":
                i.classList.add("fa-music");
                break;
            case "Dance":
                i.classList.add("fa-shoe-prints");
                break;
            default:
                console.log("Error while setting icon");
                break;
        }
    })
}