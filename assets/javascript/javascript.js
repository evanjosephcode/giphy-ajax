$(document).ready(function () {

//api key
var authKey = "XHQCUcBJCNhE5UjPiKXt5rpOZpSjIDhM";

//hold results from user input
var searchTerms;
var rating = "pg13"; 
var limit = 200;
var topics = ["Jack Nicholson", "Jeff Daniels", "Will Ferrell", "Samuel L Jackson", "Mike Myers", "Mark Wahlberg"];



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

	else if (userInput === "") {
		alert("you have to input something!");
	}

	else {
		topics.push(userInput);
		createButtons();
	}


});

$(document).on("click", ".topicButton", function(response) {
	var dataNames = $(this).attr("data-name");
	var queryURLBase = "https://api.giphy.com/v1/gifs/search?q="+dataNames+"&api_key="+authKey+"&limit="+limit+"&rating="+rating;


	$.get(queryURLBase).then(function(response) {

	$("#searchPopulated").empty();

	
	for (var i = 0; i < 10; i++) {

		var random = Math.floor(Math.random() * response.data.length);
		console.log(random);

		var imageURL = response.data[random].images.fixed_height_still.url;
		var movingURL = response.data[random].images.fixed_height.url;

		console.log(response.data[random].rating);

		//creating and storing image tag
		var gifImage = $("<img>");
		var gifDiv = $("<div class='imgWrap'>");
		var caption = $("<p>").text("Rating: "+(response.data[random].rating).toUpperCase());
		console.log(queryURLBase);


		// setting src to imageURL 
		gifImage.attr("src", imageURL);
		gifImage.attr("data-still", imageURL);
		gifImage.attr("data-animate", movingURL);
		gifImage.attr("data-state", "still");
		gifImage.attr("alt", "gif image");
		gifImage.addClass("gifClick");
		gifDiv.append(gifImage);
		gifDiv.append(caption);
	
		//prepending gif image to image div
		$("#searchPopulated").prepend(gifDiv);
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