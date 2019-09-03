// Set correct icon class based on event type value to <i> tag element
function setEventIcon(i, type) {
    type = type.toLowerCase();
    switch (type) {
        case "music":
        case "music ensemble":
        case "musician":
            i.classList.add("fa-headphones");
            break;
        case "theater":
        case "theater company":
        case "actor":
            i.classList.add("fa-theater-masks");
            break;
        case "opera":
            i.classList.add("fa-music");
            break;
        case "dance":
        case "dance company":
        case "dancer":
            i.classList.add("fa-shoe-prints");
            break;
        case "singer":
            i.classList.add("fa-microphone");
            break;
        default:
            console.log("Unknown type");
            break;
    }
}

// Given an image paths array, carousel and its indicators, populate them with images dynamically
function populatePhotoGalleryCarousel(imgArray, carousel, indicators) {
    imgArray.forEach((imgPath, index) => {
        let item = createCarouselImage(imgPath, index === 0);
        let indicator = createCarouselIndicator(index);
        carousel.append(item);
        indicators.append(indicator);
    });
}

/*
<div class="carousel-item active">
    <img class="w-100 img-fluid" src="../assets/img/image.jpg" alt="...">
</div>
 */
function createCarouselImage(imgPath, active) {
    let item = $("<div></div>");
    item.addClass("carousel-item");
    if (active) {
        item.addClass("active");
    }
    let img = $("<img>");
    img.attr("src", imgPath);
    img.addClass("w-100", "img-fluid");

    let splitPath = imgPath.split("/");
    // cut file extension
    let imageName = splitPath[splitPath.length - 1].split(".")[0];
    img.attr("alt", imageName);
    item.append(img);

    return item;
}

/*
<li data-target="#carouselEvent" data-slide-to="0" class="active"></li>
 */
function createCarouselIndicator(index) {
    let indicator = $("<li></li>");
    indicator.attr("data-target", "#carouselEvent");
    indicator.attr("data-slide-to", index);
    if (index === 0) {
        indicator.addClass("active");
    }

    return indicator;
}

// Add or update given query parameter in actual URL, reloading the page
function addQueryParamToUrl(param, value) {
    if ('URLSearchParams' in window) {
        let searchParams = new URLSearchParams(window.location.search);
        searchParams.set(param, value);
        window.location.search = searchParams.toString();
    }
}

// Remove given query parameter from URL, reloading the page
function removeQueryParamFromUrl(param) {
    let searchParams = new URLSearchParams(window.location.search);
    searchParams.delete(param);
    window.location = window.location.pathname + "?" + searchParams;
}

// Create a LI element with a link with given parameters
function createListLink (href, inner) {
    let li = $("<li></li>");
    let a = $("<a></a>").attr("href", href).html(inner);
    li.append(a);

    return li;
}

// Handle redirects and error messages when object id is invalid
function handleInvalidId (redirectUrl) {
    alert("Unknown id, object not found!");
    document.location.href = redirectUrl;
}

// Handle redirects and error messages when object id is absent
function handleAbsentId (redirectUrl) {
    alert("Id not provided, can't find object!");
    document.location.href = redirectUrl;
}