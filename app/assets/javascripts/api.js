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

       $("a").empty(); // Removing the previous results

       for (i = 0; i < artistArray.length; i++) {

        if (artistArray[i].via == "youtube") {
        // generate an iframe node
        var iframeTemplate = $("<iframe src = '' type='text/html' width='640' height='390' />");
        $("body").append(iframeTemplate);
        $("iframe").attr("src", artistArray[i].via)
        }

        //  Link Version
          var anchor = $("<a class='song' target='new'></a>");
          anchor.text(artistArray[i].artist + " - " + artistArray[i].title);
          anchor.prop("href", artistArray[i].url);
          $(".song").wrap("<p></p>");
          $("body").append(anchor);

       }
      }
    });
  });
});
