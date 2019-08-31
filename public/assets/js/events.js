function insertData () {
    addFormatters();
    const urlParams = new URLSearchParams(window.location.search);
    let typeValue = urlParams.get("type");
    let dateValue = urlParams.get("date");

    $("#eventTypeSelect").val(typeValue || "all");
    $("#eventDateSelect").val(dateValue || "all");

    if (typeValue === "seminars") {
        let fetchUrl = "/v2/seminars";
        if (dateValue) {
            fetchUrl = fetchUrl.concat("?date=" + dateValue);
        }

        createSeminarCards(fetchUrl);
    }
    else if (typeValue) {
        // Search only events for type (and date if present too)
        let fetchUrl = "/v2/events?type=" + typeValue;
        if (dateValue) {
            fetchUrl = fetchUrl.concat("&date=" + dateValue);
        }

        createEventCards(fetchUrl);
    }
    else if (dateValue) {
        // Search events and seminars for date
        createEventCards('/v2/events?date=' + dateValue);
        createSeminarCards('/v2/seminars?date=' + dateValue);
    }
    else {
        // default case, search any seminar and event
        createEventCards('/v2/events');
        createSeminarCards('/v2/seminars');
    }

    setTimeout(() => {
        $("#noEventsWarning").removeClass("hidden");
    }, 1000);
}

function createEventCards(url) {
    fetch(url).then(r => r.json())
        .then(events => {
            console.log(events);
            createCards($("#eventCardTemplate"), events);
        }).then(setEventTypeIcons);
}

function createSeminarCards(url) {
    fetch(url).then(r => r.json())
        .then(seminars => {
            console.log(seminars);
            createCards($("#seminarCardTemplate"), seminars);
        });
}

function createCards(template, data) {
    if (data.length > 0) {
        $("#noEventsWarning").remove();
    }
    $("#events-container").loadTemplate(template, data, {
        append: true
    });
}

function setEventTypeIcons () {
    let iconTags = document.body.querySelectorAll(".type-icon");
    Array.from(iconTags).forEach(i => {
        let type = i.nextElementSibling.innerHTML;
        setEventIcon(i, type);
    })
}

function populateDateFilterOptions () {
    for (let day = 1; day < 31; day++) {
        let option = $("<option></option>");
        option.html(day + " Sep 2019");
        option.val("2019-09-" + day);
        $("#septemberDateFilter").append(option);
    }
}

function handleTypeFilter () {
    let type = $("#eventTypeSelect").val();
    if (type === "all") {
        removeQueryParamFromUrl("type");
    }
    else {
        addQueryParamToUrl("type", type);
    }
}

function handleDateFilter () {
    let date = $("#eventDateSelect").val();
    if (date === "all") {
        removeQueryParamFromUrl("date");
    }
    else {
        addQueryParamToUrl("date", date);
    }
}