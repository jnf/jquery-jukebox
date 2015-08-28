
$(function() {



// _______ Global Functions ________

  function mediaFactory(song, mediaSource) {
    var iframeTemplate = $("<iframe class='media-embed' type='text/html' width='500' height='304' src = '' ></iframe>");
    var mediaURL = song.url;

    if (mediaSource == "youtube") {
      var modifiedMediaURL = mediaURL.replace("watch?v=", "embed/");
    } else if (mediaSource == "vimeo") {
      var modifiedMediaURL = mediaURL.replace("http://vimeo.com/", "https://player.vimeo.com/video/");
    }

    iframeTemplate.attr("src", modifiedMediaURL);
    $(".container-fluid").append(iframeTemplate);
  }

  // function soundcloudFactory(song) {
  //   var iframeTemplate = $("<iframe class='soundcloud' width='500' height='166' src=''></iframe>");
  //   var soundcloudURL = song.url;
  //   var modifiedsoundcloudURL = soundcloudURL.replace("http://", "https://w.soundcloud.com/player/?url=http://");
  //   iframeTemplate.attr("src", modifiedsoundcloudURL);
  //   $(".container-fluid").append(iframeTemplate);
  // }

  function linkFactory(song){
    var anchor = $("<a class='song-link' target='new'></a>");
    anchor.text(song.artist + " - " + song.title);
    anchor.prop("href", song.url);
    $(".container-fluid").append(anchor);
  }

  function showResults(songCollection){
    for (i = 0; i < songCollection.length; i++) {
      var song = songCollection[i];
      // YouTube or Vimeo Display
      if (song.via == "youtube" || song.via == "vimeo") {
        mediaFactory(song, song.via );
      // Link Display
      } else {
        linkFactory(songCollection[i]);
      }
    }

    // Wrap it all up in a paragraph blanket
    $(".song-link, .media-embed").wrap("<p class = 'song-separator'></p>");
  }

  // _______ Artist Search ________

  $(".search-btn").click(function(event){

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
