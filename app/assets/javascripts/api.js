
$(function() {

  function searchVals(){
    var artistField = $("input#artist");
    var query = artistField.val();
    var formTag = $("form#search");
    var url = formTag.attr("action");
    var method = formTag.attr("method");

    return {
      // This needs to be a key value pair
      params : { "artist": query},
      url : url,
      aMethod: method
    };
  }

  

  $(".search").click(function(event){
    event.preventDefault();

    $.ajax(searchVals().url, {
      type: searchVals().aMethod,
      data: searchVals().params,
      success: function (data) {
        console.log(data)
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
