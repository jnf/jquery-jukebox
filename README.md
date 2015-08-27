# This Is My Jam: AJAX Playback Links
Hi! For this project, let's use [This is My Jam](https://www.thisismyjam.com/) to find lots of links to music we like. :)

## This repo already has...
- A rails project
- An api endpoint to search the [TIMJ API](https://www.thisismyjam.com/developers/docs) by Artist.
- Rspec setup with a couple of simple tests


## Wave 1: You need to create
- A view with a form that will use jQuery's AJAX functionality to GET from the API endpoint
- One or many js functions to...
  - parse the returned JSON data
  - add dom nodes to the view representing the returned search results
  - include links to the resources referenced in the parsed data (YouTube, Spotify, etc.)
- At no point should the view refresh or the user be taken to another URL.

## Wave 2: Add a new endpoint
- Utilize one of the API calls provided by TIMJ described below to create a new API endpoint in the `ApiController`.
- Write tests for your endpoint.
- The API endpoint should return JSON.
- Add new functionality to your view/javascript to...
  - Let the user determine what functionality they would like to use
  - Hit your new endpoint using Ajax
  - Render results in the browser without reloading the page at any point.

### Wave 2 TIMJ API Calls - Choose at least one to implement
- __Popular__
    GET `http://api.thisismyjam.com/1/explore/popular.json`
    Today’s most-loved jams.

- __Breaking__
  GET `http://api.thisismyjam.com/1/explore/breaking.json`
  Songs getting a lot of recent attention.

- __Rare__
  GET `http://api.thisismyjam.com/1/explore/rare.json`
  Tracks we don’t hear that often.

- __Chance__
  GET `http://api.thisismyjam.com/1/explore/chance.json`
  Jams at random.

## Bonus Fun
- Instead of adding links to the view, try using the data to create embedded players for the specific service (i.e., embed the YouTube video, instead of linking to it).
  - __HINT:__ YouTube and Vimeo use html `iframe` elements to do video embedding.
  - __MOAR HINT:__ Don't use "embedly"
- If a user's search returns no results, suggest/embed/link to something for them instead.
