# liri-node-app

LIRI is a app built with node.js will search the concert, movie, song and also take command from text file.

## How to use LIRI

### concert-this + "artist/band name"

Search result will included "Name of the venue", "Venue location", "Date of the Event".

### spotify-this-song + "song name"

Search result will included "Song Name", "Albumn Name", "Preview URL" and "Artist(s)".
The default of this search without "song name" will display the result of the song "The Sign".

### movie-this + "movie name"

Search result will included "Title", "Year came out", "IMDB Rating", "Rotten Tomatoes Rating", "Country produced", "Language", "Plot", "Actors".
The default of this search without "movie name" will display the result of the movie "Mr. Nobody".

### do-what-it-says

This function will read the text from "random.txt" and run the search accrodingly.

## NPM Package installed for this app:

1. Node-Spotify-API (https://www.npmjs.com/package/node-spotify-api)
2. Request (https://www.npmjs.com/package/request)
3. Moment (https://www.npmjs.com/package/moment)
4. DotEnv (https://www.npmjs.com/package/dotenv)