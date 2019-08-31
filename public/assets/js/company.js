function insertData () {
    const urlParams = new URLSearchParams(window.location.search);
    let idValue = urlParams.get("id");
    if (idValue) {
        addFormatters();
        fetch('/v2/companies/' + idValue).then(r => r.json())
            .then(data => {
                console.log(data);
                $("#cont").loadTemplate($("#companyTemplate"), data, {async: false});
                populatePhotoGalleryCarousel(data.images, $("#carousel"), $("#carouselIndicators"));

                fetch('/v2/companies/' + idValue + "/events").then(r => r.json())
                    .then(events => {
                        console.log(events);
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
        console.log("Prototype page, delete this in the future");
        // Maybe redirect to perfomers page? If id is not set no info can be fetched
    }
}