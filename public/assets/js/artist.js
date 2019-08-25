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
                fetch('/v2/companies/' + data.affiliation).then(r => r.json())
                    .then(company => $("#companyLink").html(company.name));
            });
    }
    else {
        console.log("Prototype page, delete this in the future");
        // Maybe redirect to perfomers page? If id is not set no info can be fetched
    }
}