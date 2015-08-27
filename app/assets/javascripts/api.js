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
       var anchor = $("<a></a>");
       anchor.text(artistArray[0].artist + " - " + artistArray[0].title);
       anchor.prop("href", artistArray[0].url);

       $("body").append(anchor);
      }
    });

    // collect text in the field
    // assemble the correct url
    // snag the correct method
    // hit the controller
  });
});
