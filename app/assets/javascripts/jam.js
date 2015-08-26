$(function () {
  $("form").submit(function(event) {
    event.preventDefault();
    var button = $(":submit");
    var form = $("form");
    var method = form.attr("method");
    var url = form.attr("action");
    $.ajax(url, {
      type: method,
      success: function(data) {
        console.log(data);
        renderData(data);
      }
    }); // end ajax
  });

  function renderData(data) {
    for (var i = 0; i < data.length; i++) {
      var jam = data[i];
      var artist = jam.artist;
      var title = jam.title;
      var url = jam.url;
      var via = jam.via;
      var anchor = $("<a></a>");
      var newline = $("<br>");
      var listing = (artist + " : " + title + " (via " + via + ")");
      anchor.text(listing);
      anchor.prop("href", url);
      $("body").append(anchor);
      $("body").append(newline);
    }
  } // end renderData

}); // end js file

// var anchor = $("<a></a>"); // new anchor element
// anchor.text("text on the page");
// anchor.prop("href", "/link/to/place");
// $("body").append(anchor); // <a href="/link/to/place">text on the page</a>
