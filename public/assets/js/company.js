function insertData () {
    const urlParams = new URLSearchParams(window.location.search);
    let idValue = urlParams.get("id");
    if (idValue) {
        addFormatters();
        fetch('/v2/companies/' + idValue).then(r => r.json())
            .then(data => {
                $("#cont").loadTemplate($("#companyTemplate"), data, {async: false});
                populatePhotoGalleryCarousel(data.images, $("#carousel"), $("#carouselIndicators"));

                fetch('/v2/companies/' + idValue + "/events").then(r => r.json())
                    .then(events => {
                        let eventsList = $("#eventsList");
                        if (events.length > 0) {
                            events.forEach(e =>
                                eventsList.append(createListLink("/pages/event.html?id=" + e.id, e.name)) );
                        }
                        else {
                            eventsList.append("none");
                        }
                    });

                fetch('/v2/companies/' + data.id + '/artists').then(r => r.json())
                    .then(artists => artists.forEach(e => {
                        $("#artistsList").append(createListLink("artist.html?id=" + e.id, e.name + " " + e.surname));
                    }))
            });
    }
    else {
        // Redirect to performers page
        document.location.href = "/pages/performers.html";
    }
}