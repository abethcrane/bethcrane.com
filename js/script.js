var nav = [{"url":"/projects", "text": "Projects"},
		   {"url": "http://linkedin.com/in/bethanycrane", "text": "LinkedIn"},
		   {"url": "http://github.com/abethcrane", "text": "Github"}];

var displayTemplate = function(name, data) {
    //Get the Template and compile it
    var source   = $(name).html();
    var template = Handlebars.compile(source);
    //Replace the body section with the new code.
    $(".main").append(template(data));
}

Handlebars.registerHelper("isFlickr", function(feedName, options) {
    var fnTrue=options.fn, fnFalse=options.inverse;
    return (feedName == 'flickr' || feedName == 'instagram' || feedName == 'medium') ? fnTrue() : fnFalse();
});

$(document).ready(function() {
    $('.resize').css('height', window.innerHeight);
    $(window).resize(function() {
        $('.resize').css('height', window.innerHeight);
        $('.content').css('height', "100%");
    });


});

