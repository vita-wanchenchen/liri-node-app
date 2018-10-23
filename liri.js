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

// Create function for switch-case statement to direct which function gets run.
function runCommand() {
  
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
  }

// Function to run "concert-this".  
function concertThis() {

    // Run request to the Bands in Town Artist Events API with user input specified.
    var concertQueryUrl ="https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp";

    // Debug against the actual URL.
    // console.log(concertQueryUrl);

    request(concertQueryUrl, function(error, response, body) {

        // If the request is successful.
        if (!error && response.statusCode === 200) {
            var concerts = JSON.parse(body);
            for (var i = 0; i < concerts.length; i++) {

                // Parse the body of the site and recover "Name of the venue", "Venue location", "Date of the Event".
                console.log("Name of the venue: " + concerts[i].venue.name +
                            "\nVenue location: " + concerts[i].venue.city + ", " + 
                                                 (concerts[i].venue.region || 
                                                 concerts[i].venue.country) +
                            
                            // Format the date with moment.js to "MM/DD/YYYY".
                            "\nDate of the Event: " + moment(concerts[i].datetime).format("L"));

            }
         
        };
    });
}

// Access keys information from keys.js.
var spotify = new Spotify(keys.spotify);

// Function to run the "spotify-this-song".
function spotifyThis() {

  // Setting defult search song "The Sign" when user didn't put a song name for using "spotify-this-song".
  if (!userInput) {
    userInput = "The Sign";
  }

  spotify.search({ type: 'track', query: userInput }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

  // Parse the body of the site and recover "Song Name", "Albumn Name", "Preview URL" and "Artist(s)".
  var songs = data.tracks.items;
  for (var i = 0; i < 5; i++) {
    console.log("Song Name: " + songs[i].name +
                "\nAlbumn Name: " + songs[i].album.name +
                "\nPreview URL: " + songs[i].preview_url);
 
    // Display all the artists provided by the search.
    var artists = songs[i].artists;
    var artistName = [];
    for (var j = 0; j < artists.length; j++) {
      artistName.push(artists[j].name);
    }
    console.log("Artist(s): " + artistName.join(", "));
 
  }
  });

  };

// Function to run "movie-this".  
function movieThis() {
  
  // Setting defult search movie "Mr. Nobody" when user didn't put a movie name for using "movie-this".
  if (!userInput) {
    userInput = "Mr. Nobody";
  }

  // Run request to the OMDB API with user input specified.
  var movieQueryUrl = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy";

  request(movieQueryUrl, function(error, response, body) {
    
    // If the request is successful (i.e. if the response status code is 200).
    if (!error && response.statusCode === 200) {

      var movies = JSON.parse(body);

              // Parse the body of the site and recover "Title", "Year came out", "IMDB Rating", 
              // "Rotten Tomatoes Rating", "Country produced", "Language", "Plot", "Actors".
              console.log("Title: " + movies.Title +
              "\nYear: " + movies.Year + 
              "\nIMDB Rating: " + movies.imdbRating + 
              "\nCountry: " + movies.Country + 
              "\nLanguage: " + movies.Language +
              "\nPlot: " + movies.Plot +
              "\nActors: " + movies.Actors);

              // Only show "Rotten Tomatoes Rating" when it's provided.
              if (movies.Ratings[1]) {
                console.log("Rotten Tomatoes Rating: " + movies.Ratings[1].Value);
              } 

    } 
  });
};  

// Function to run "do-what-it-says".
function whatItSays() {

  // Reading the text from "random.txt".
  fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
      return console.log(err);
    }
  
    // Break the string down by comma separation and store the contents into the output array.
    var output = data.split(",");

    // Assigned the info from random.txt to action and userInput.
    action = output[0];
    userInput = output[1];

    // Perform the function.
    runCommand();

  
  });
}
runCommand();