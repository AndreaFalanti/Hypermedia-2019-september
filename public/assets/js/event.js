function insertData () {
    const urlParams = new URLSearchParams(window.location.search);
    let idValue = urlParams.get("id");
    if (idValue) {
        addFormatters();
        fetch('/v2/events/' + idValue).then(r => r.json())
            .then(data => {
                console.log(data);
                $("#container").loadTemplate($("#eventTemplate"), data, {async: false});
                setEventIcon(document.body.querySelector("#eventIcon"), data.type);

                populatePhotoGalleryCarousel(data.images, $("#carousel"), $("#carouselIndicators"));
                populatePerformersList(idValue);

                if (data.seminar_id !== null) {
                    fetch('/v2/seminars/' + data.seminar_id).then(r => r.json())
                        .then(seminar => $("#seminarName").html(seminar.title));
                }
                else {
                    $("#seminarName").html("No seminar for this event");
                    $("#seminarButton").remove();
                }
            });
    }
    else {
        console.log("Prototype page, delete this in the future");
        // Maybe redirect to events page? If id is not set no info can be fetched
    }
}

function populatePerformersList(id) {
    let performersList = $("#performersList");
    fetch('/v2/events/' + id + '/artists').then(r => r.json())
        .then(artists => artists.forEach(e =>
            performersList.append(createListLink("artist.html?id=" + e.id, e.name + " " + e.surname)) ));
    fetch('/v2/events/' + id + '/companies').then(r => r.json())
        .then(companies => companies.forEach(e =>
            performersList.append(createListLink("company.html?id=" + e.id, e.name)) ));
}

/*
DEPRECATED: carousel is no more used because of layout problems and bad
            visual effects when there is only one performer.
<div class="carousel-item">
    <div class="container">
        <div class="row my-3">
        </div>
    </div>
</div>
 */
/*function populatePerformersCarousel(id) {
    let artistFetch = fetch('/v2/events/' + id + '/artists').then(r => r.json());
    let companyFetch = fetch('/v2/events/' + id + '/companies').then(r => r.json());
    Promise.all([artistFetch, companyFetch]).then(values => {
        console.log(values);
        let artists = values[0];
        let companies = values[1];
        let performersCount = artists.length + companies.length;
        console.log(artists);
        console.log(companies);
        console.log(performersCount);

        let row = $("#firstCardContainer");
        for (let i = 0; i < performersCount; i++) {
            if (i > 0 && i % 3 === 0) {
                let item = $("<div></div>");
                item.addClass("carousel-item");
                let container = $("<div></div>");
                container.addClass("container");
                row = $("<div></div>");
                row.addClass("row", "my-3");

                item.append(container).append(row);
                $("#performersCarousel").append(item);

                $("#performersCarouselIndicators").append(createCarouselIndicator(i / 3));
            }

            if (i < artists.length) {
                row.loadTemplate($("#artistCardTemplate"), artists[i], {async: false, append: true});
            }
            else {
                row.loadTemplate($("#companyCardTemplate"), companies[i - artists.length], {async: false, append: true});
            }
        }
    });
}*/