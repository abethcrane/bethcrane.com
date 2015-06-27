//name link oneliner imgUrl languages dates

var projects = [
		   {"name": "Homely",
		    "link": "https://github.com/abradner/homely/wiki",
		    "oneliner": "Simple home automation system - uses a phone app to control lights via connecting to a server and an arduino.",
		    "imgUrl": "homely.jpg",
		    "languages": "Android SDK, Java, Javascript, Ruby on Rails, Arduino",
		    "dates": "August '13 - November '13"},

		   {"name": "CSESoc Constitution",
		    "link": "https://github.com/abethcrane/csesoc-constitution",
		    "oneliner": "UNSW CSESoc's Constitution; Easily track changes and see who suggested what amendments.",
		    "imgUrl": "csesoc.png",
		    "languages": "Git",
		    "dates": "November '13"},

		   {"name": "CGI World",
	 	    "link": "http://abethcrane.github.io/Weatherworld",
		    "oneliner": "Computer Graphics program that takes in a json map and creates a world you can explore (complete with weather!)",
		    "imgUrl": "cgiWorld.png",
		    "languages": "Java",
		    "dates": "October '13"},

		   {"name": "RoboCup",
		    "link": "robocup.pdf",
		    "oneliner": "rUNSWift 2D Simulator; Behavioural Simulation Integrated with the rUNSWift Architecture",
		    "imgUrl": "robocup.jpg",
		    "languages": "Python",
		    "dates": "February '13 - July '13"},

		   {"name": "Chatbot",
		    "link": "http://abethcrane.github.io/Simple-Chatbot/",
		    "oneliner": "Simple Spreadsheet Editing Chatbot",
		    "imgUrl": "chatbot.png",
		    "languages": "Python",
		    "dates": "May 2013"},

		   {"name": "Book Scanner",
		    "link": "http://avengingsyndrome.github.io/Barcode-Scanner/",
		    "oneliner": "Enter an ISBN or scan a barcode to save a book to a list to read later.",
		    "imgUrl": "bookscanner.png",
		    "languages": "Android Java SDK, Javascript",
		    "dates": "October '12 - November '12"},

		   {"name": "Q-Learning Traffic Lights",
		    "link": "http://abethcrane.github.io/Q-Learning-Traffic-Lights/",
		    "oneliner": "Traffic light simulation for a group Machine Learning project utilising Q-Learning to teach traffic lights how to achieve optimal traffic flow.",
		    "imgUrl": "trafficLights.png",
		    "languages": "Java",
		    "dates": "April '12 - June '12"},

		   {"name": "HTML 5 Drawer",
		    "link": "http://abethcrane.github.io/TheMachine",
		    "oneliner": "For quick line doodling and picture sketching in a canvas environment.",
		    "imgUrl": "html5.png",
		    "languages": "HTML5 Canvas, Javascript",
		    "dates": "December 2010"},

		   {"name": "Tic Tac Toe",
		    "link": "http://abethcrane.github.io/Tic-Tac-Toe",
		    "oneliner": "Basic Tic Tac Toe player and bot",
		    "imgUrl": "ticTacToe.png",
		    "languages": "C",
		    "dates": "December 2010"}
		   ];

//TODO: Add engcupid

$(document).ready(function() {
    getTemplateAjax("/templates/projects.handlebars", ".content", projects, displayTemplate);
});
