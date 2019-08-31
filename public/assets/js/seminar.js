function insertData () {
    const urlParams = new URLSearchParams(window.location.search);
    let idValue = urlParams.get("id");
    if (idValue) {
        addFormatters();
        fetch('/v2/seminars/' + idValue).then(r => r.json())
            .then(data => {
                $("#cont").loadTemplate($("#seminarTemplate"), data, {async: false});
                fetch('/v2/seminars/' + idValue + '/events').then(r => r.json())
                    .then(events => {
                        events.forEach(e => {
                            $("#eventsList").append(createEventLi(e));
                        });
                    });
            })
            .catch(err => handleInvalidId("/pages/events.html"));
    }
    else {
        // Redirect to events page
        handleAbsentId("/pages/events.html");
    }
}

/*
    <li><a href="#">Event 1</a></li>
 */
function createEventLi (e) {
    let li = $("<li></li>");
    let a = $("<a></a>");
    a.html(e.name);
    a.attr("href", "/pages/event.html?id=" + e.id);
    li.append(a);

    return li;
}