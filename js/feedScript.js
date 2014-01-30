var getFeed = function(feedName, feedUrl, numEntries) {
	//var url = document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load'
	var url = document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num='+numEntries+'&callback=?&q=' + encodeURIComponent(feedUrl);

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

		}
	} else if (feedName == "github") {
		for (i = 0; i < numEntries; i++) {
			feeds[numFeeds]["data"][i]["content"] = feeds[numFeeds]["data"][i]["title"];
			feeds[numFeeds]["data"][i]["publishedDate"] = feeds[numFeeds]["data"][i]["publishedDate"].replace(/.*,/m, "");
			feeds[numFeeds]["data"][i]["publishedDate"] = feeds[numFeeds]["data"][i]["publishedDate"].replace(/(:[0-9]{2}):.*/m, "$1");
		}
	}
	
	numFeeds++;
	if (numFeeds == totalFeeds) {
		displayTemplate("#sidebarTemplate", nav);
		displayTemplate("#contentTemplate", feeds);
	}
}

var numFeeds = 0;
var totalFeeds = 3;
var feeds = [];

$(document).ready(function() {
	getFeed("flickr", "http://api.flickr.com/services/feeds/photos_public.gne?id=105674507@N06", 5);
	getFeed("twitter", "https://script.googleusercontent.com/macros/echo?user_content_key=z9Mx6ocZ1QHGg8p36O7wQGh7TbDRgHfuLzPOnAKW52oL6f0T9c0c3rT0S_fjjyH31YizzRhFpOxKZ2y6W3Cqe4riepYn4PYJm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnHiRoBgmO8xZOmNJiOHh7xiBnWSLqMTAQgQXwe4xiy2vhUK22EN0w71ZQSz5XZEBEnEsHGzMQut4&lib=MY4PUmJiFsBUGlQOwt0PZAIXnViTw_VgZ", 5);
	getFeed("github", "https://github.com/abethcrane.atom", 5);
	
});
