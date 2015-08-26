# This Is My Jam: AJAX Playback Links
Hi! For this project, let's use [This is My Jam](https://www.thisismyjam.com/) to find lots of links to music we like. :)

## This repo already has...
- A rails project
- An api endpoint to search the [TIMJ API](https://www.thisismyjam.com/developers/docs) by Artist.
- Rspec setup with a couple of simple tests

## You need to create
- A view with a form that will use jQuery's AJAX functionality to GET from the API endpoint
- One or many js functions to...
  - parse the returned JSON data
  - add dom nodes to the view representing the returned search results
  - include links to the resources referenced in the parsed data (YouTube, Spotify, etc.)
- At no point should the view refresh or the user be taken to another URL.

## Bonus Fun
- Instead of adding links to the view, try using the data to create embedded players for the specific service (i.e., embed the YouTube video, instead of linking to it).
- If a user's search returns no results, suggest/embed/link to something for them instead.
