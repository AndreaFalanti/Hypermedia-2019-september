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
                fetch('/v2/companies/' + data.id + '/artists').then(r => r.json())
                    .then(artists => artists.forEach(e => {
                        let artistEl = $("<li><p></p></li>");
                        let a = document.createElement("a");
                        a.innerHTML = e.name + " " + e.surname;
                        a.setAttribute("href", "artist.html?id=" + e.id);
                        artistEl.append(a);
                        $("#artistsList").append(artistEl);
                    }))
            });
    }
    else {
        console.log("Prototype page, delete this in the future");
        // Maybe redirect to perfomers page? If id is not set no info can be fetched
    }
}