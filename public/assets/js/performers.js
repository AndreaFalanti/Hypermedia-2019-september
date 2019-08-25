function insertData () {
    addFormatters();
    let fetch1 = fetch('/v2/companies').then(r => r.json())
        .then(companies => {
            console.log(companies);
            $("#cont").loadTemplate($("#companyCardTemplate"), companies, {append: true})
        });
    let fetch2 = fetch('/v2/artists').then(r => r.json())
        .then(artists => {
            console.log(artists);
            $("#cont").loadTemplate($("#artistCardTemplate"), artists, {append: true})
        });
    Promise.all([fetch1, fetch2]).then(() => setTypeIcons());
}

function setTypeIcons () {
    let iconTags = document.body.querySelectorAll(".type-icon");
    Array.from(iconTags).forEach(i => {
        let type = i.nextElementSibling.innerHTML;
        setEventIcon(i, type);
    })
}