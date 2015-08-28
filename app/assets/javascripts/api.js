
$(function() {

// _______ Global Functions ________

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

  function showResults(songCollection){
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

  // _______ Artist Search ________

  $(".search").click(function(event){

    event.preventDefault();

    function searchAjaxValues(){
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

    function artistSearch(searchValues){
      $.ajax(searchValues.url, {
        type: searchValues.method,
        data: searchValues.params,
        success: function (data) {
          // Clear old results
          $("a, iframe").remove();
          var songCollection = data;
          showResults(songCollection);
        }
      });
    }

    artistSearch(searchAjaxValues());

  });

  // _______ Popular Tracks ________

  $("#popular-button").click(function(event){

    event.preventDefault();

    function popAjaxValues(){
      var popularForm = $("form.button_to");
      var url = popularForm.attr("action");
      var method = popularForm.attr("method");

      return {
        url : url,
        method: method
      };
    }

    function getPopularSongs(popularValues){
      $.ajax(popularValues.url, {
        type: popularValues.method,
        success: function (data) {
          // Clear old results
          $("a, iframe").remove();
          var songCollection = data;

          showResults(songCollection);
        }
      });
    }

    getPopularSongs(popAjaxValues());

  });
});
