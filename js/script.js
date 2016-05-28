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
        $('body').css('height', "100%");
        $('body').css('background', "adial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%)");
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
        onSlideLeave: function(anchorLink, index, slideIndex, direction, nextSlideIndex) {
            if (slideIndex == 3 && direction == "left") {
              $("#fibseq").removeClass("dark").addClass("white");
              $("#flickr").removeClass("dark").addClass("white");
              $("#github").removeClass("dark").addClass("white");
              $("#instagram").removeClass("dark").addClass("white");
              $(".fp-controlArrow.fp-prev").css("border-color", "transparent white transparent transparent");
              $(".fp-controlArrow.fp-next").css("border-color", "transparent transparent transparent white");
            } else if (slideIndex == 2 && direction == "right") {
              $("#fibseq").removeClass("white").addClass("dark");
              $("#flickr").removeClass("white").addClass("dark");
              $("#github").removeClass("white").addClass("dark");
              $("#instagram").removeClass("white").addClass("dark");
              $(".fp-controlArrow.fp-prev").css("border-color", "transparent black transparent transparent");
              $(".fp-controlArrow.fp-next").css("border-color", "transparent transparent transparent black");
            }
        },

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
    for (var i = 0; i < 25; i++) {
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



