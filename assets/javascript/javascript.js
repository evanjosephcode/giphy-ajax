$(document).ready(function () {

//api key
var authKey = "XHQCUcBJCNhE5UjPiKXt5rpOZpSjIDhM";

//hold results from user input
var searchTerms = "oprah";
var rating = "pg"; 

var topics = ["Jack Nicholson", "Jeff Daniels", "Will Ferrell", "Mike Myers", "Mark Wahlberg", "Billy Bob Thornton"]

var queryURLBase = "https://api.giphy.com/v1/gifs/search?q="+searchTerms+"&api_key="+authKey+"&limit=10&rating="+rating


function createButtons() {
	$("#searchButtons").empty();

	for (var i = 0; i < topics.length; i++) {

		var make = $("<button>");
		make.addClass("topicButton").attr("data-name", topics[i]).text(topics[i]);
		$("#searchButtons").append(make);
	}
}

// perform the function that contains the for loop just created 
createButtons();

// check for existing val() in array called topics, and push if not in there there and re-perform createButtons() to update buttons
$("#addSearch").on("click", function () {
	event.preventDefault();
	var userInput = $("#searchInput").val().trim();

	if (topics.indexOf(userInput) !== -1) {
		alert("that's already a button, fool");
	}

	else {
		topics.push(userInput);
		createButtons();
	}


});

$(document).on("click", ".topicButton", function(response) {
	var dataNames = $(this).attr("data-name");
	var queryURLBase = "https://api.giphy.com/v1/gifs/search?q="+dataNames+"&api_key="+authKey+"&limit=10&rating="+rating;

	$.get(queryURLBase).then(function(response) {

	$("#searchPopulated").empty();
	
	for (var i = 0; i < response.data.length; i++) {

		var imageURL = response.data[i].images.fixed_height_still.url;
		var movingURL = response.data[i].images.fixed_width.url;

		//creating and storing image tag
		var gifImage = $("<img>");

		// setting src to imageURL 
		gifImage.attr("src", imageURL);
		gifImage.attr("data-still", imageURL);
		gifImage.attr("data-animate", movingURL);
		gifImage.attr("data-state", "still");
		gifImage.attr("alt", "gif image");
		gifImage.addClass("gifClick");
	
		//prepending gif image to image div
		$("#searchPopulated").prepend(gifImage);
	}
	});
});


$(document).on("click", ".gifClick", function(response) {
	var state = $(this).attr("data-state");

	if (state === "still") {
		$(this).attr("src", $(this).attr("data-animate"));
		$(this).attr("data-state", "animate");
	}
	else {
		$(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
	}
});





// to end the document ready
});