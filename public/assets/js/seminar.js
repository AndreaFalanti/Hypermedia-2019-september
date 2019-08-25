function insertData () {
    const urlParams = new URLSearchParams(window.location.search);
    let idValue = urlParams.get("id");
    if (idValue) {
        addFormatters();
        fetch('/v2/seminars/' + idValue).then(r => r.json())
            .then(data => {
                console.log(data);
                $("#cont").loadTemplate($("#seminarTemplate"), data, {async: false});
                fetch('/v2/seminars/' + idValue + '/events').then(r => r.json())
                    .then(events => {
                        events.forEach(e => {
                            $("#eventsList").append(createEventLi(e));
                        });
                    });
            });
    }
    else {
        console.log("Prototype page, delete this in the future");
        // Maybe redirect to events page? If id is not set no info can be fetched
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