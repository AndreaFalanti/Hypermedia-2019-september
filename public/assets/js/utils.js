// Set correct icon class based on event type value to <i> tag element
function setEventIcon(i, type) {
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
}