
$(function() {

  function youtubeFactory(song){
    var iframeTemplate = $("<iframe class='youtube' type='text/html' width='640' height='390' src = '' ></iframe>");
    var youtubeURL = song.url;
    var modifiedYoutubeUrl = youtubeURL.replace("watch?v=", "embed/");
    iframeTemplate.attr("src", modifiedYoutubeUrl);
    $(".search-results").append(iframeTemplate);
  }

  function linkFactory(song){
    var anchor = $("<a class='song-link' target='new'></a>");
    anchor.text(song.artist + " - " + song.title);
    anchor.prop("href", song.url);
    $(".search-results").append(anchor);
  }

  $(".search").click(function(event){

    event.preventDefault();

    function setSearchVals(){
      var artistField = $("input#artist");
      var query = artistField.val();
      var formTag = $("form#search");
      var url = formTag.attr("action");
      var method = formTag.attr("method");

      return {
        // This needs to be a key value pair
        params : { "artist": query},
        url : url,
        method: method
      };
    }

    function executeSearch(searchValues){
      $.ajax(searchValues.url, {
        type: searchValues.method,
        data: searchValues.params,
        success: function (data) {
          $("a, iframe").remove();

          var songCollection = data;

          for (i = 0; i < songCollection.length; i++) {
            // YouTube Display
            if (songCollection[i].via == "youtube") {
              youtubeFactory(songCollection[i]);
            // Link Display
            } else {
              linkFactory(songCollection[i]);
            }
          }

          // Wrap it all up in a paragraph blanket
          $(".song-link, .youtube").wrap("<p></p>");

        }
      });
    }

    executeSearch(setSearchVals());

  });

  // Popular Tracks
  $("#popular-button").click(function(event){
    event.preventDefault();
    var popularForm = $("form.button_to")
    var url = popularForm.attr("action");
    var method = popularForm.attr("method");


    $.ajax(url, {
      type: method,
      success: function (data) {

        var artistArray = data; // Renamed for clarity

        // Removing the previous results
        $("a, iframe").remove();

        // For each search result
        for (i = 0; i < artistArray.length; i++) {

          // YouTube embed
          if (artistArray[i].via == "youtube") {
            var iframeTemplate = $("<iframe class='other-media' type='text/html' width='640' height='390' src = '' ></iframe>");
            var youtubeURL = artistArray[i].url;
            var modifiedYoutubeUrl = youtubeURL.replace("watch?v=", "embed/");
            iframeTemplate.attr("src", modifiedYoutubeUrl);
            $(".search-results").append(iframeTemplate);
          } else {
            //  Link Version
            var anchor = $("<a class='song-link' target='new'></a>");
            anchor.text(artistArray[i].artist + " - " + artistArray[i].title);
            anchor.prop("href", artistArray[i].url);
            $(".search-results").append(anchor);
          }
        }

        $(".song-link").wrap("<p></p>");
      }
    });
  });
});
