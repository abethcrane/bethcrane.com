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
    
    $('.pages').fullpage({
		//Navigation
		menu: false,
		lockAnchors: false,
		navigation: false,
		navigationPosition: 'right',
		showActiveTooltip: false,
		slidesNavigation: true,
		slidesNavPosition: 'bottom',

		//Scrolling
		css3: true,
		scrollingSpeed: 700,
		autoScrolling: true,
		fitToSection: true,
		scrollBar: false,
		easing: 'easeInOutCubic',
		easingcss3: 'ease',
		loopBottom: false,
		loopTop: false,
		loopHorizontal: false,
		continuousVertical: false,
		scrollOverflow: true,
		touchSensitivity: 15,
		normalScrollElementTouchThreshold: 5,

		//Accessibility
		keyboardScrolling: false,
		animateAnchor: true,
		recordHistory: true,

		//Design
		controlArrows: true,
		verticalCentered: true,

		//Custom selectors
		sectionSelector: '.section',
		slideSelector: '.page',
	});
});

// Ahttp://stackoverflow.com/a/4673436/4629688
if (!String.prototype.format) {
    String.prototype.format = function() {
        var args = arguments;
            return this.replace(/{(\d+)}/g, function(match, number) {
            return typeof args[number] != 'undefined' ? args[number] : match;
        });
    };
}