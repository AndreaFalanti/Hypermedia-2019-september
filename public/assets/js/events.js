function createEventCards () {
    addFormatters();
    fetch('/v2/events').then(r => r.json())
        .then(events => {
            events.map(e => {
                // Capitalize first letter
                e.type = e.type.charAt(0).toUpperCase() + e.type.slice(1);
                // More readable date format
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

function addFormatters() {
    $.addTemplateFormatter("eventHrefFormatter",
        function(value, template) {
            return "/pages/event.html?id=" + value;
        });
    // Return first 'x' words as a text, 'x' value is provided by template variable
    $.addTemplateFormatter("firstWordsFormatter",
        function(value, template) {
            return value.split(/\s+/).slice(0, template).join(" ") + "...";
        });
}