
$(function() {

// _______ Global Functions ________


// <iframe src="https://player.vimeo.com/video/137208092" width="500" height="281" frameborder="0" ></iframe>

  function youtubeFactory(song){
    var iframeTemplate = $("<iframe class='youtube' type='text/html' width='500' height='304' src = '' ></iframe>");
    var youtubeURL = song.url;
    var modifiedYoutubeUrl = youtubeURL.replace("watch?v=", "embed/");
    iframeTemplate.attr("src", modifiedYoutubeUrl);
    $(".container-fluid").append(iframeTemplate);
  }

  function vimeoFactory(song){
    var iframeTemplate = $("<iframe class='vimeo' type='text/html' width='500' height='281' src = '' ></iframe>");
    var vimeoURL = song.url;
    var modifiedVimeoUrl = vimeoURL.replace("http://vimeo.com/", "https://player.vimeo.com/video/");
    iframeTemplate.attr("src", modifiedVimeoUrl);
    $(".container-fluid").append(iframeTemplate);
  }

  function linkFactory(song){
    var anchor = $("<a class='song-link' target='new'></a>");
    anchor.text(song.artist + " - " + song.title);
    anchor.prop("href", song.url);
    $(".container-fluid").append(anchor);
  }

  function showResults(songCollection){
    for (i = 0; i < songCollection.length; i++) {
      // YouTube Display
      if (songCollection[i].via == "youtube") {
        youtubeFactory(songCollection[i]);
      } else if (songCollection[i].via == "vimeo") {
        vimeoFactory(songCollection[i]);
      // Link Display
      } else {
        linkFactory(songCollection[i]);
      }
    }

    // Wrap it all up in a paragraph blanket
    $(".song-link, .youtube").wrap("<p class = 'song-separator'></p>");
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
