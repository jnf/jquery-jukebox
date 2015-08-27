$(function () {
  $("form").submit(function(event) {
    event.preventDefault();
    var button = $(":submit");
    var form = $("form");
    var method = form.attr("method");
    var url = form.attr("action");
    $.ajax(url, {
      type: method,
      data: { "artist" : $("#q").val()},
      success: function(data) {
        console.log(data);
        $(".jams-div").html();
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
      var listing = (artist + " - " + title + " (via " + via + ")");
      anchor.text(listing);
      anchor.prop("href", url);
      $(".jams-div").append(anchor);
      $(".jams-div").append(newline);
    }
  } // end renderData

}); // end js file
