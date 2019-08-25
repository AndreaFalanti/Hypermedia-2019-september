function addFormatters() {
    $.addTemplateFormatter("eventHrefFormatter",
        function(value, template) {
            return "/pages/event.html?id=" + value;
        });
    $.addTemplateFormatter("seminarHrefFormatter",
        function(value, template) {
            return "/pages/seminar.html?id=" + value;
        });
    $.addTemplateFormatter("reservationHrefFormatter",
        function(value, template) {
            return "/pages/reservation.html?id=" + value;
        });
    $.addTemplateFormatter("companyHrefFormatter",
        function(value, template) {
            return "/pages/company.html?id=" + value;
        });
    $.addTemplateFormatter("artistHrefFormatter",
        function(value, template) {
            return "/pages/artist.html?id=" + value;
        });
    // Return first 'x' words as a text, 'x' value is provided by template variable
    $.addTemplateFormatter("firstWordsFormatter",
        function(value, template) {
            return value.split(/\s+/).slice(0, template).join(" ") + "...";
        });
    // Capitalize first letter
    $.addTemplateFormatter("capitalizeFormatter",
        function(value, template) {
            return value.charAt(0).toUpperCase() + value.slice(1);
        });
    // More readable date format (day mon gg yyyy)
    $.addTemplateFormatter("dateFormatter",
        function(value, template) {
            return new Date(value).toDateString();
        });
    // Take first image path from the array
    $.addTemplateFormatter("firstImageFormatter",
        function(value, template) {
            return value[0];
        });
    $.addTemplateFormatter("spacedFormatter",
        function(value, template) {
            return " " + value;
        });
}