// Set correct icon class based on event type value to <i> tag element
function setEventIcon(i, type) {
    type = type.toLowerCase();
    switch (type) {
        case "music":
            i.classList.add("fa-headphones");
            break;
        case "theater":
            i.classList.add("fa-theater-masks");
            break;
        case "opera":
            i.classList.add("fa-music");
            break;
        case "dance":
            i.classList.add("fa-shoe-prints");
            break;
        default:
            console.log("Error while setting icon");
            break;
    }
}