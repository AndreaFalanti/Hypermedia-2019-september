// Set correct icon class based on event type value to <i> tag element
function setEventIcon(i, type) {
    type = type.toLowerCase();
    console.log(type);
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
            console.log("Error while setting icon");
            break;
    }
}

// Given an image paths array, carousel and its indicators, populate them with images dynamically
function populateCarousel(imgArray, carousel, indicators) {
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
    img.attr("alt", "TODO");
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