function insertData () {
    addFormatters();
    const urlParams = new URLSearchParams(window.location.search);
    let typeValue = urlParams.get("type");
    $("#performersTypeSelect").val(typeValue || "all");

    switch (typeValue) {
        case "artists":
            fetchArtists().then(setTypeIcons);
            break;
        case "companies":
            fetchCompanies().then(setTypeIcons);
            break;
        default:
            Promise.all([fetchArtists(), fetchCompanies()]).then(() => setTypeIcons());
            break;
    }

}

function fetchCompanies() {
    return fetch('/v2/companies').then(r => r.json())
        .then(companies => {
            $("#cont").loadTemplate($("#companyCardTemplate"), companies, {append: true})
        });
}

function fetchArtists() {
    return fetch('/v2/artists').then(r => r.json())
        .then(artists => {
            $("#cont").loadTemplate($("#artistCardTemplate"), artists, {append: true})
        });
}

function setTypeIcons () {
    let iconTags = document.body.querySelectorAll(".type-icon");
    Array.from(iconTags).forEach(i => {
        let type = i.nextElementSibling.innerHTML;
        setEventIcon(i, type);
    })
}

function handleTypeFilter () {
    let type = $("#performersTypeSelect").val();
    if (type === "all") {
        removeQueryParamFromUrl("type");
    }
    else {
        addQueryParamToUrl("type", type);
    }
}