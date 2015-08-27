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
        if (data.length === 0) {
          unwantedSong();
        } else {
          renderData(data);
        } // end if/else
      }
    }); // end ajax
  });

  function renderData(data) {
    $(".jams-div").html("");
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
      anchor.prop("target", "_blank");
      $(".jams-div").append(anchor);
      $(".jams-div").append(newline);
    }
  } // end renderData

  function unwantedSong() {
    $(".jams-div").html("");
    var anchor = $("<a></a>");
    var url = "https://www.youtube.com/watch?v=-gPuH1yeZ08";
    var unwanted_song = "That's no one's jam. Maybe this is your jam?";
    anchor.text(unwanted_song);
    anchor.prop("href", url);
    anchor.prop("target", "_blank");
    $(".jams-div").append(anchor);
  } // end lol

}); // end js file
