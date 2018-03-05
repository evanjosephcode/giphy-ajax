//api key
var authKey = "XHQCUcBJCNhE5UjPiKXt5rpOZpSjIDhM";

//hold results from user input
var searchTerms = "disney";
var numResults = 10;
var rating = "pg"; 

//array of strings with a for loop we're creating of pre-populated search terms
var topics = ["Jack Nicholson", "Jim Carrey", "Will Ferrell", "Mike Myers", "Mark Wahlberg"]

var queryURLBase = "https://api.giphy.com/v1/gifs/search?q="+searchTerms+"&api_key="+authKey+"&limit="+numResults+"&rating="+rating

//on click
$("#gif-button").on("click", function() {

$.get(queryURLBase).then(function(response) {
    console.log("URL: "+ queryURLBase);

    var imageURL = response.data.embed_url;
    //creating and storing image tag
    var gifImage = $("<img>");

    // setting src to imageURL 
    gifImage.attr("src", imageURL);
    gifImage.attr("alt", "gif image");

    //prepending gif image to image div
    $("#searchPopulated").prepend(gifImage);
})
});

// for (var i = 0; i < topics.length, i++) {

// }
