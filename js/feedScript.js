var getFeed = function(feedName, feedUrl, numEntries) {
	//var url = document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load'
	var url = 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num='+numEntries+'&callback=?&q=' + encodeURIComponent(feedUrl);

	var serverResponse = $.ajax({
		type: "GET",
		url: url,
		/*data: {
			'v': 1.0,
			'num': numEntries,
			'callback': '',
			'q': encodeURIComponent(feedUrl),
		},*/
		dataType: 'json',
	});

	serverResponse.fail(function(){
		alert('Unable to load feed, Incorrect path or invalid feed');
	});
	serverResponse.done(function(data){
		handleData(data.responseData.feed.entries, feedName, numEntries);
	});
};

var handleData = function(xml, feedName, numEntries) {

	var re  = null;
	var img = null;
	var i;

	feeds[numFeeds] = {"name": feedName, "data": xml};

	if (feedName == "flickr") {
		for (i = 0; i < numEntries; i++) {
			// Remove first paragraph of 'abethcrane posted a photo'
			feeds[numFeeds]["data"][i]["content"] = feeds[numFeeds]["data"][i]["content"].replace(/<p>.*?<\/p>/m, "");
		}
	} else if (feedName == "twitter") {
		for (i = 0; i < numEntries; i++) {
			img = feeds[numFeeds]["data"][i]["content"].match(/pic\.twitter\.com[^<]*/);
			feeds[numFeeds]["data"][i]["publishedDate"] = feeds[numFeeds]["data"][i]["publishedDate"].replace(/.*,/m, "");
			feeds[numFeeds]["data"][i]["publishedDate"] = feeds[numFeeds]["data"][i]["publishedDate"].replace(/(:[0-9]{2}):.*/m, "$1");
			feeds[numFeeds]["data"][i]["content"] = feeds[numFeeds]["data"][i]["content"].replace(/.*<br>/m, "");
			feeds[numFeeds]["data"][i]["content"] = feeds[numFeeds]["data"][i]["content"].replace(/(abs.twimg.com\/emoji.*?").*?>/m, "$1 width='20px>'");
		}
	} else if (feedName == "github") {
		for (i = 0; i < numEntries; i++) {
			feeds[numFeeds]["data"][i]["content"] = feeds[numFeeds]["data"][i]["title"];
			feeds[numFeeds]["data"][i]["publishedDate"] = feeds[numFeeds]["data"][i]["publishedDate"].replace(/.*,/m, "");
			feeds[numFeeds]["data"][i]["publishedDate"] = feeds[numFeeds]["data"][i]["publishedDate"].replace(/(:[0-9]{2}):.*/m, "$1");
		}
	} else if (feedName == "instagram") {
	    for (i = 0; i < numEntries; i++) {
	        feeds[numFeeds]["data"][i]["title"] = "";
	        feeds[numFeeds]["data"][i]["content"] = feeds[numFeeds]["data"][i]["content"].replace(/<p>.*<\/p>/m, "");
	        //feeds[numFeeds]["data"][i]["content"] = feeds[numFeeds]["data"][i]["content"].replace(/<\/strong(.|\s)*/m, "");
	        feeds[numFeeds]["data"][i]["content"] = feeds[numFeeds]["data"][i]["content"].replace(/<strong>(.|\s)*/m, "");
	    }
	}

	numFeeds++;
	if (numFeeds == totalFeeds) {
		//displayTemplate("#sidebarTemplate", nav);
		displayTemplate("#feedTemplate", feeds);
	}
}

var numFeeds = 0;
var totalFeeds = 4;
var feeds = [];

$(document).ready(function() {
	getFeed("flickr", "http://api.flickr.com/services/feeds/photos_public.gne?id=105674507@N06", 6);
	getFeed("twitter", "https://script.googleusercontent.com/macros/echo?user_content_key=gOvlL1a7DdxWDC311cAcW1EH0OYToLxbKUbpC4CNob_QqVIKCcJ0uv6pxX9_6b7zwzMViBc4waWYH3Cy2-AUoDpq_xIB2AEUm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnAgDXbj_tVyWQMr79LWC07Ejb66DUKzGjmLsoERNB3kg0BAiR7PDyyKrbLp64XKMJYdYUgLW9EAN1I3KF5EhPlVgRFelZprtXqd3WMz3xaUx&lib=MJ2RCt7KC2yZa3tT8V4zCPBwaZjxFQg_8", 5);
	getFeed("github", "https://github.com/abethcrane.atom", 5);
	getFeed("instagram", "http://widget.stagram.com/rss/n/abethcrane", 6);
	displayTemplate("#sidebarTemplate", nav);
});
