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

       var artistArray = data;

       for (i = 0; i < artistArray.length; i++) {
         var anchor = $("<a></a><br />");
         anchor.text(artistArray[i].artist + " - " + artistArray[i].title);
         anchor.prop("href", artistArray[i].url);
         $("body").append(anchor);
       }
      }
    });

    // collect text in the field
    // assemble the correct url
    // snag the correct method
    // hit the controller
  });
});
