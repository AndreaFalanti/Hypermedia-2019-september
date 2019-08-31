function insertData () {
    const urlParams = new URLSearchParams(window.location.search);
    let idValue = urlParams.get("id");
    if (idValue) {
        addFormatters();
        fetch('/v2/artists/' + idValue).then(r => r.json())
            .then(data => {
                $("#cont").loadTemplate($("#artistTemplate"), data, {async: false});
                $("#artistTitle").html(data.name + " " + data.surname);

                populatePhotoGalleryCarousel(data.images, $("#carousel"), $("#carouselIndicators"));
                fetch('/v2/artists/' + idValue + "/events").then(r => r.json())
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

                if (data.affiliation !== null) {
                    fetch('/v2/companies/' + data.affiliation).then(r => r.json())
                        .then(company => $("#companyLink").html(company.name));
                }
                else {
                    $("#companyPara").append("none");
                }
            })
            .catch(err => handleInvalidId("/pages/performers.html"));
    }
    else {
        // Redirect to performers page
        handleAbsentId("/pages/performers.html");
    }
}