// Interval structure: {from: 12, to: 18, disable: true}
function createCalendar(...intervals) {
    let cellIndex = 0;
    let ul;

    for (let intervalIndex = 0; intervalIndex < intervals.length; intervalIndex++) {
        let actualInterval = intervals[intervalIndex];

        for (let day = actualInterval.from; day <= actualInterval.to; day++) {
            if (cellIndex % 7 === 0) {
                ul = $("<ul></ul>");
                ul.addClass("days");
                $("#calendarContainer").append(ul);
            }

            let cell = createCalendarCell(day, actualInterval.disable);
            ul.append(cell);
            cellIndex++;
        }
    }
}

/*
<li>
    <h5>6</h5>
    <a href="event.html"><i class="fas fa-headphones" aria-hidden="true"></i> Imagine Dragons's Tour</a>
</li>
 */
function createCalendarCell(day, disabled) {
    let li = $("<li></li>");
    let h = $("<h5>" + day + "</h5>");
    li.append(h);

    if (disabled) {
        li.addClass("day-not-included");
        h.addClass("text-muted");
    }
    else {
        fetch('/v2/events?date=2019-09-' + day).then(r => r.json())
            .then(events => {
                events.forEach(e => li.append($("<p></p>").append(createEventLinkTag(e))));
            });
        fetch('/v2/seminars?date=2019-09-' + day).then(r => r.json())
            .then(seminars => {
                seminars.forEach(s => li.append($("<p></p>").append(createSeminarLinkTag(s))));
            });
    }

    return li;
}

// Create Font Awesome tag without icon set
function createFasTag() {
    /*let i = $("<i></i>");
    i.addClass("fas");
    i.attr("aria-hidden", "true");*/
    let i = document.createElement("i");
    i.classList.add("fas");
    i.setAttribute("aria-hidden", "true");

    return i;
}

function createEventLinkTag(e) {
    let a = $("<a></a>");
    a.attr("href", "event.html?id=" + e.id);

    let i = createFasTag();
    setEventIcon(i, e.type);

    a.append(i);
    a.append(" " + e.name);

    return a;
}

function createSeminarLinkTag(s) {
    let a = $("<a></a>");
    a.attr("href", "seminar.html?id=" + s.id);

    let i = createFasTag();
    i.classList.add("fa-chalkboard-teacher");

    a.append(i);
    a.append(" " + s.title);

    return a;
}