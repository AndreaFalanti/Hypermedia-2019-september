function insertData () {
    const urlParams = new URLSearchParams(window.location.search);
    let idValue = urlParams.get("id");
    if (idValue) {
        addFormatters();
        fetch('/v2/artists/' + idValue).then(r => r.json())
            .then(data => {
                console.log(data);
                $("#cont").loadTemplate($("#artistTemplate"), data, {async: false});
                $("#artistTitle").html(data.name + " " + data.surname);
                populatePhotoGalleryCarousel(data.images, $("#carousel"), $("#carouselIndicators"));
                if (data.affiliation) {
                    fetch('/v2/companies/' + data.affiliation).then(r => r.json())
                        .then(company => $("#companyLink").html(company.name));
                }
                else {
                    $("#companyPara").append("none");
                }
            });
    }
    else {
        console.log("Prototype page, delete this in the future");
        // Maybe redirect to performers page? If id is not set no info can be fetched
    }
}