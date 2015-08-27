$(function() {
  $(".search").click(function(event){
    event.preventDefault();

    var searchButton = $(this);

    var formTag = searchButton.parent("form");

    var url = formTag.attr("action");
    var method = formTag.attr("method");
    var children = formTag.children("#artist")
    var artistField = children.val()

    var query = { "artist" : artistField }

    $.ajax(url, {
      type: method,
      data: query,
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
