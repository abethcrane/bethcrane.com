var getFeed = function(feedName, feedUrl, numEntries) {
    var url = 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num='+numEntries+'&callback=?&q=' + encodeURIComponent(feedUrl);

    var serverResponse = $.ajax({
        type: "GET",
        url: url,
        dataType: 'json',
    });

    serverResponse.fail(function(){
        alert('Unable to load feed, Incorrect path or invalid feed');
    });
    serverResponse.done(function(data){
        if (data != undefined && data.responseData != undefined && data.responseData.feed != undefined) {
            handleData(data.responseData.feed.entries, feedName, numEntries);
	}
    });
};

var handleInstagramData = function(data) {
    if (data == undefined || data["data"] == undefined) {
    	numFeeds++;
    	return;
    }
    data = data["data"];
    var xml = [];
    var i;
    var date;
    var numEntries = Math.min(10, data.length);
    for (i = 0; i < numEntries; i++) {
        xml[i] = {};
        date = new Date(data[i]["created_time"] *1000);
        xml[i]["publishedDate"]  = (date.toGMTString()).replace(/.*?, /, " ");
        xml[i]["link"] = data[i]["link"];
        data[i]["caption"]["text"] = data[i]["caption"]["text"].replace(/#.*/, "");
        xml[i]["content"]  = "<img src = '" + data[i]["images"]["standard_resolution"]["url"] + "''><p class='caption'>" + data[i]["caption"]["text"] + "</p>";
        xml[i]["title"] =  "";
    }

    endDataHandling(xml, "instagram", numEntries);
}

var handleData = function(xml, feedName, numEntries) {
    if (xml == null) {
    	numFeeds++;
    	return;
    }
    numEntries = Math.min(numEntries, xml.length);

    var i;
    for (i = 0; i < numEntries && (typeof xml[i] != undefined); i++) {
        if (feedName == "fibseq"){
            xml[i]["publishedDate"] = xml[i]["publishedDate"].replace(/^[^0-9]*/, "");
            xml[i]["content"] = xml[i]["content"].replace(/^(.|\s)*?<img/m, "<img");
            xml[i]["content"] = xml[i]["content"].replace(/\>(.|\s)*/m, ">");
            xml[i]["content"] = xml[i]["content"] + "<p>" + xml[i]["title"] + "</p>";
            xml[i]["title"] = "";
        } else if (feedName == "flickr") {
            // Remove first paragraph of 'abethcrane posted a photo'
            xml[i]["content"] = xml[i]["content"].replace(/<p>.*?<\/p>/m, "");
            xml[i]["content"] = xml[i]["content"].replace(/width.*height=".*?" /, "");
            // Remove paragraph and close link from content (we add them in explicitly in the html)
            xml[i]["content"] = xml[i]["content"].replace(/<.?p>/, "");
            xml[i]["content"] = xml[i]["content"].replace(/<\/a>/, "");
            // Swap title into being a caption
            xml[i]["content"] = xml[i]["content"] + "<p class='caption'>" + xml[i]["title"] + "</p></a>";
            xml[i]["title"] = "";
            // Clean up published Date
            xml[i]["publishedDate"] = xml[i]["publishedDate"].replace(/.*?,/, "");
        } else if (feedName == "github") {
            xml[i]["content"] = xml[i]["title"];
            xml[i]["publishedDate"] = xml[i]["publishedDate"].replace(/.*,/m, "");
            xml[i]["publishedDate"] = xml[i]["publishedDate"].replace(/(:[0-9]{2}):.*/m, "$1");
            xml[i]["title"] =  "";
        } else if (feedName == "medium") {
            // Clean up published Date
            xml[i]["publishedDate"] = xml[i]["publishedDate"].replace(/.*?,/, "");
            xml[i]["content"] = xml[i]["content"].replace(/<\/p><p><a href="https:\/\/medium.com.*/, "</p></div>");
            // Replace needles p and div tags
            xml[i]["content"] = xml[i]["content"].replace(/<div>/, "");
            xml[i]["content"] = xml[i]["content"].replace(/<.div>/, "");
            xml[i]["content"] = xml[i]["content"].replace(/<p>/, "");
            xml[i]["content"] = xml[i]["content"].replace(/<.p>/, "");
            xml[i]["content"] = xml[i]["content"].replace(/width=.*?>/, ">");
            xml[i]["content"] = xml[i]["content"].replace(/<a.*?>/, "");
            xml[i]["content"] = xml[i]["content"].replace(/<.a.*?>/, "");
        } else if (feedName == "stackoverflow"){
            xml[i]["publishedDate"] = xml[i]["publishedDate"].replace(/^[^0-9]*/, "");
            xml[i]["title"] = xml[i]["title"].replace(/.*?for /, "");
            xml[i]["content"] = xml[i]["contentSnippet"];
        } else if (feedName == "twitter") {
            img = xml[i]["content"].match(/pic\.twitter\.com[^<]*/);
            xml[i]["publishedDate"] = xml[i]["publishedDate"].replace(/.*,/m, "");
            xml[i]["publishedDate"] = xml[i]["publishedDate"].replace(/(:[0-9]{2}):.*/m, "$1");
            xml[i]["content"] = xml[i]["content"].replace(/.*<br>/m, "");
            xml[i]["content"] = xml[i]["content"].replace(/(abs.twimg.com\/emoji.*?").*?>/mg, "$1 width='20px'>");
            xml[i]["title"] = "";
        }
    }

    endDataHandling(xml, feedName, i);
}

var endDataHandling = function (xml, feedName, numEntries) {
    for (i = 0; i < numEntries; i++) {
        xml[i]["name"] = feedName;
        feeds.push(xml[i]);
    }

    numFeeds++;
    if (numFeeds == totalFeeds) {
        feeds.sort(SortByDate);
        getTemplateAjax("templates/feeds.handlebars", "#feeds", feeds, displayTemplateAndResizeImages);
    }
}

//This will sort your array
function SortByDate(a, b){
    var aDate = new Date(a.publishedDate);
    var bDate = new Date(b.publishedDate);
    return ((aDate > bDate) ? -1 : ((aDate <= bDate) ? 1 : 0));
}

var numFeeds = 0;
var totalFeeds = 7;
var feeds = [];

$(document).ready(function() {
    // Instagram is special because their api doesn't give us an rss feed, we just have to work around it
    var insta = new Instafeed({
        get: 'user',
        userId: '34563658',
        accessToken: '34563658.021ea53.d92cf1dfe8c640b5a1b5f69b4783af6d',
        mock: true,
        success: function(data) {handleInstagramData(data);}
    });
    insta.run();

    getFeed("flickr", "http://api.flickr.com/services/feeds/photos_public.gne?id=105674507@N06", 10);
    getFeed("twitter", "https://twitrss.me/twitter_user_to_rss/?user=abethcrane", 10);
    getFeed("github", "https://github.com/abethcrane.atom", 10);
    getFeed("medium", "https://medium.com/feed/@abethcrane", 10);
    getFeed("stackoverflow", "http://stackoverflow.com/feeds/user/4629688", 10);
    getFeed("fibseq", "http://www.fibonaccisequinsblog.com/feed/", 10);
});
