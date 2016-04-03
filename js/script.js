var displayTemplate = function(template, element, data) {
    //Replace the body section with the new code.
    $(element).append(template(data));
}

var displayTemplateAndResizeImages = function(template, element, data) {
    displayTemplate(template, element, data);
    $(".flickr img").load(function() {
        $(this).maxSide({maxSide:"300"});
    });
}

function getTemplateAjax(path, element, dict, callback) {
    var source;
    var template;

    $.ajax({
        url: path,
        success: function(data) {
            //Get the Template and compile it
            source    =  data;
            template  = Handlebars.compile(source);

            //execute the callback if passed
            if (callback) {
                callback(template, element, dict);
           }
        }
    });
}

Handlebars.registerHelper("hasTitle", function(feedName, options) {
    var fnTrue=options.fn, fnFalse=options.inverse;
    return (feedName == 'flickr' || feedName == 'instagram' || feedName == 'medium') ? fnTrue() : fnFalse();
});

$(document).ready(function() {
    $('.resize').css('height', window.innerHeight);
    $(window).resize(function() {
        $('.resize').css('height', window.innerHeight);
        $('.content').css('height', "100%");
    });

    $('.main').fullpage({
		//Navigation
		navigationPosition: 'right',
		showActiveTooltip: false,
		slidesNavigation: false,

		//Scrolling
		autoScrolling: false,
		fitToSection: true,
		scrollBar: false,
		scrollOverflow: false,
        loopHorizontal: false,
        normalScrollElements: '#landing-page',

		//Accessibility
		keyboardScrolling: false,
        recordHistory: true,

		//Design
		controlArrows: true,
		verticalCentered: false,

		//Custom selectors
		sectionSelector: '.section',
		slideSelector: '.slide',
	});

    // Load in the images
    for (var i = 0; i < 42; i++) {
        $('#photos-grid').append('<img src="assets/photos/' + i + '.jpg">');
    }

    // Update medium images - they need to be set after load
    $(".medium .itemContent img").css("height", "100%");
});

// http://stackoverflow.com/a/4673436/4629688
if (!String.prototype.format) {
    String.prototype.format = function() {
        var args = arguments;
            return this.replace(/{(\d+)}/g, function(match, number) {
            return typeof args[number] != 'undefined' ? args[number] : match;
        });
    };
}
