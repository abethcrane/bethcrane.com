$.fn.maxSide = function(settings) {
	//if no paramaters supplied...
	settings = $.extend({maxSide: 100}, settings);		
	return this.each(function(){
		var maximum = settings.maxSide;
		if ($(this).width() > $(this).height()) {
	                $(this).attr({width: maximum});
	        } else { 
	        	$(this).attr({height: maximum});
	        }
	});	
};
