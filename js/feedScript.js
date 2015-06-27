var getFeed = function(feedName, feedUrl, numEntries) {
    //var url = document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load'
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
        handleData(data.responseData.feed.entries, feedName, numEntries);
    });
};

var handleInstagramData = function(data) {

    data = data["data"];
    var xml = [];
    var i;
    var date;
    var numEntries = 10;
    for (i = 0; i < numEntries; i++) {
        xml[i] = {};
        date = new Date(data[i]["created_time"] *1000);
        xml[i]["publishedDate"]  = (date.toGMTString()).replace(/.*?, /, " ");
        xml[i]["link"] = data[i]["link"];
        xml[i]["content"]  = "<img src = '" + data[i]["images"]["standard_resolution"]["url"] + "' alt = '" + data[i]["caption"]["text"].substring(0,50) + "...'>";
        xml[i]["title"] = "Instagram - @abethcrane";
    }

    endDataHandling(xml, "instagram", numEntries);
}

var handleData = function(xml, feedName, numEntries) {

    var i;

    for (i = 0; i < numEntries && (typeof xml[i] !== 'undefined'); i++) {
        if (feedName == "flickr") {
            // Remove first paragraph of 'abethcrane posted a photo'
            xml[i]["content"] = xml[i]["content"].replace(/<p>.*?<\/p>/m, "");
            xml[i]["content"] = xml[i]["content"].replace(/width.*height=".*?" /, "");
            // Remove paragraph and link from content (we add them in explicitly in the html)
            xml[i]["content"].replace(/.*><img/, "<img").replace(/<\/a.*/, "");
            // Clean up published Date
            xml[i]["publishedDate"] = xml[i]["publishedDate"].replace(/.*?,/, "");
        } else if (feedName == "twitter") {
            img = xml[i]["content"].match(/pic\.twitter\.com[^<]*/);
            xml[i]["publishedDate"] = xml[i]["publishedDate"].replace(/.*,/m, "");
            xml[i]["publishedDate"] = xml[i]["publishedDate"].replace(/(:[0-9]{2}):.*/m, "$1");
            xml[i]["content"] = xml[i]["content"].replace(/.*<br>/m, "");
            xml[i]["content"] = xml[i]["content"].replace(/(abs.twimg.com\/emoji.*?").*?>/mg, "$1 width='20px'>");
        } else if (feedName == "github") {
            xml[i]["content"] = xml[i]["title"];
            xml[i]["publishedDate"] = xml[i]["publishedDate"].replace(/.*,/m, "");
            xml[i]["publishedDate"] = xml[i]["publishedDate"].replace(/(:[0-9]{2}):.*/m, "$1");
        } else if (feedName == "medium") {
            // Clean up published Date
            xml[i]["publishedDate"] = xml[i]["publishedDate"].replace(/.*?,/, "");
        } else if (feedName == "stackoverflow"){
            xml[i]["publishedDate"] = xml[i]["publishedDate"].replace(/^[^0-9]*/, "");
            xml[i]["title"] = xml[i]["title"].replace(/.*?for /, "");
            xml[i]["content"] = "<b>{0}</b><br/>{1}".format(xml[i]["title"], xml[i]["contentSnippet"]);
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
        getTemplateAjax("templates/feeds.handlebars", "#feeds .fp-tableCell", feeds, displayTemplateAndResizeImages);
    }
}

//This will sort your array
function SortByDate(a, b){
    var aDate = new Date(a.publishedDate);
    var bDate = new Date(b.publishedDate);
    return ((aDate > bDate) ? -1 : ((aDate <= bDate) ? 1 : 0));
}

var numFeeds = 0;
var totalFeeds = 6;
var feeds = [];

$(document).ready(function() {
    // Instagram is special because their api doesn't give us an rss feed, we just have to
    var insta = document.createElement("script");
    insta.src = "https://api.instagram.com/v1/users/34563658/media/recent/?client_id=021ea53429ed426c8b5b4a492a20db96&callback=handleInstagramData";
    document.body.appendChild(insta);

    getFeed("flickr", "http://api.flickr.com/services/feeds/photos_public.gne?id=105674507@N06", 10);
    // TODO: Make the new rss link below work, hosted on abethcrane not brolgaswan
    //getFeed("twitter", "https://script.googleusercontent.com/macros/echo?user_content_key=2HxfKocqV2IZeKjU3fQOPEcHCZ9Cio55NMBG1HbztB0gk1iiMblMDVRsmvflqjxheWFNnUREB_e52j2IkPMH98ArQX0T-By7m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnCKw7HnbfWeLSonsZDKRLVY121HuQgUa6M5kgF4j_7SHpoSR8WaEaOgxiw4mHlbw2cDQNRuLxxKf1I3KF5EhPlVgRFelZprtXqd3WMz3xaUx&lib=M3_Ys6t51QUZiPLCLm9cQZDz2pL6d88Yt", 10);
    getFeed("twitter", "https://script.googleusercontent.com/macros/echo?user_content_key=gOvlL1a7DdxWDC311cAcW1EH0OYToLxbKUbpC4CNob_QqVIKCcJ0uv6pxX9_6b7zwzMViBc4waWYH3Cy2-AUoDpq_xIB2AEUm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnAgDXbj_tVyWQMr79LWC07Ejb66DUKzGjmLsoERNB3kg0BAiR7PDyyKrbLp64XKMJYdYUgLW9EAN1I3KF5EhPlVgRFelZprtXqd3WMz3xaUx&lib=MJ2RCt7KC2yZa3tT8V4zCPBwaZjxFQg_8", 10);
    getFeed("github", "https://github.com/abethcrane.atom", 10);
    getFeed("medium", "https://medium.com/feed/@abethcrane", 10);
    getFeed("stackoverflow", "http://stackoverflow.com/feeds/user/4629688", 10);
});
