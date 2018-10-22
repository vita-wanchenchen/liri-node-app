// Read and set any environment variables with the dotenv package
require("dotenv").config();

// Load the fs package to read and write
var fs = require("fs");

// Include the request npm package
var request = require("request");

// Include the moment npm package
var moment = require("moment");

// Access to Spotify key
var keys = require("./keys.js");

// Access to Spotify APIs
var Spotify = require('node-spotify-api');

// Create variable for holding action and user input
var action = process.argv[2];
var userInput = process.argv.splice(3).join(" ");


// Create switch-case statement to direct which function gets run.

switch (action) {
    case "concert-this":
      concertThis();
      break;
    
    case "spotify-this-song":
      spotifyThis();
      break;
    
    case "movie-this":
      movieThis();
      break;
    
    case "do-what-it-says":
      whatItSays();
      break;
    }


function concertThis() {

    // Run request to the Bands in Town Artist Events API with user input specified
    var concertQueryUrl ="https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp";

    // Debug against the actual URL.
    // console.log(concertQueryUrl);

    request(concertQueryUrl, function(error, response, body) {

        // If the request is successful
        if (!error && response.statusCode === 200) {
            var concerts = JSON.parse(body);
            for (var i = 0; i < concerts.length; i++) {

                // Parse the body of the site and recover "Name of the venue", "Venue location", "Date of the Event"
                console.log("Name of the venue: " + concerts[i].venue.name +
                            "\nVenue location: " + concerts[i].venue.city + ", " + 
                                                 concerts[i].venue.region + ", " + 
                                                 concerts[i].venue.country +
                            "\nDate of the Event: " + moment(concerts[i].datetime).format("L"));

            }
         
        };
    });
}

// Access keys information from keys.js
var spotify = new Spotify(keys.spotify);

function spotifyThis() {
  
  spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
  console.log(data); 
  });

  };

function movieThis() {

  // Run request to the OMDB API with user input specified
  var movieQueryUrl = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy";

  // Debug against the actual URL.
  // console.log(movieQueryUrl);

  request(movieQueryUrl, function(error, response, body) {
    
    // If the request is successful (i.e. if the response status code is 200)
    if (!error && response.statusCode === 200) {

      var movies = JSON.parse(body);

              // Parse the body of the site and recover "Title", "Year came out", "IMDB Rating", 
              //"Rotten Tomatoes Rating", "Country produced", "Language", "Plot", "Actors"
              console.log("Title: " + movies.Title +
              "\nYear: " + movies.Year + 
              "\nIMDB Rating: " + movies.imdbRating + 
              "\nRotten Tomatoes Rating: " + movies.Ratings[1].Value +
              "\nCountry: " + movies.Country +
              "\nLanguage: " + movies.Language +
              "\nPlot: " + movies.Plot +
              "\nActors: " + movies.Actors);

    } 
  });
};  
