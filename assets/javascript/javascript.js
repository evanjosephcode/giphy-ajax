//api key
var authKey = "XHQCUcBJCNhE5UjPiKXt5rpOZpSjIDhM";

//hold results from user input
var searchTerms = "hugh heffner";
var numResults = 10;
var rating = "pg"; 

//array of strings with a for loop we're creating of pre-populated search terms
var topics = ["Jack Nicholson", "Jim Carrey", "Will Ferrell", "Mike Myers", "Mark Wahlberg"]

var queryURLBase = "https://api.giphy.com/v1/gifs/search?q="+searchTerms+"&api_key="+authKey+"&limit="+numResults+"&rating="+rating



$.get(queryURLBase).then(function(GiphyData) {
    console.log("URL: "+ queryURLBase);
    console.log("Giphy data: "+GiphyData);
});



