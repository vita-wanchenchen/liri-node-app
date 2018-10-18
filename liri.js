// Read and set any environment variables with the dotenv package
require("dotenv").config();

// Load the fs package to read and write
var fs = require("fs");

// Include the request npm package
var request = require("request");

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

    //debug against the actual URL.
    console.log(concertQueryUrl);

    request(concertQueryUrl, function(error, response, body) {

        // If the request is successful
        if (!error && response.statusCode === 200) {
            var concerts = JSON.parse(body);
            for (var i = 0; i < concerts.length; i++) {

                // Parse the body of the site and recover "Name of the venue", "Venue location", "Date of the Event"
                console.log("Name of the venue: " + concerts[i].venue.name + "\n" + 
                            "Venue location: " + concerts[i].venue.city + ", " + 
                                                 concerts[i].venue.region + ", " + 
                                                 concerts[i].venue.country + "\n" +
                            "Date of the Event: " + concerts[i].datetime);

            }
         
        };
    });
}

// Access keys information from keys.js
var spotify = new Spotify(keys.spotify);


// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s
/*for (var i = 2; i < nodeArgs.length; i++) {

    if (i > 2 && i < nodeArgs.length) {
  
      movieName = movieName + "+" + nodeArgs[i];
  
    }
  
    else {
  
      movieName += nodeArgs[i];
  
    }
  }
  
  // Then run a request to the OMDB API with the user input specified
  var movieQueryUrl = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy";
  
  // This line is just to help us debug against the actual URL.
  console.log(movieQueryUrl);
  
  request(movieQueryUrl, function(error, response, body) {
  
    // If the request is successful
    if (!error && response.statusCode === 200) {
  
      // Parse the body of the site and recover just the imdbRating
      // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
      console.log("Release Year: " + JSON.parse(body).Year);
    }
  });*/
