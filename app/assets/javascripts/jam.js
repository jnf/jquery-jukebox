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
        if ($.isEmptyObject(data)) {
          unwantedSong();
        } else {
          renderData(data);
        } // end if/else
      } // end success
    }); // end ajax
  }); // end form submit listener

  $("#random").click(function(event) {
    event.preventDefault();
    var button = $(this);
    var url = button.prop("href");
    $.ajax(url, {
      type: "get",
      success: function(data) {
        renderData(data);
      } // end success
    }); // end ajax
  }); // end randomizer button listener

  function renderData(data) {
    $(".jams-div").html("");
    var list = $('<div>');
    list.addClass("list-group");
    for (var i = 0; i < data.length; i++) {
      var jam = data[i];
      var artist = jam.artist;
      var title = jam.title;
      var url = jam.url;
      var via = jam.via;
      if (via == "youtube") {
        youtube_id = url.split("v=")[1];
        var iframe = $("<iframe>");
        iframe.prop("width", "560");
        iframe.prop("height", "315");
        iframe.prop("src", "https://www.youtube.com/embed/" + youtube_id);
        iframe.prop("frameborder", "0");
        list.append(iframe);
      } else {
        var anchor = $("<a>");
        anchor.addClass("list-group-item");
        var listing = (artist + " - " + title + " (via " + via + ")");
        anchor.text(listing);
        anchor.prop("href", url);
        anchor.prop("target", "_blank");
        list.append(anchor);
      } // end if/else youtube
      $('.jams-div').append(list);
    } // end for loop
  } // end renderData

  function unwantedSong() {
    $(".jams-div").html("");
    var list = $('<div>');
    list.addClass("list-group");
    var anchor = $("<a>");
    anchor.addClass("list-group-item");
    var url = "https://www.youtube.com/watch?v=-gPuH1yeZ08";
    var unwanted_song = "That's no one's jam. Maybe this is your jam?";
    anchor.text(unwanted_song);
    anchor.prop("href", url);
    anchor.prop("target", "_blank");
    list.append(anchor);
    $(".jams-div").append(list);
  } // end unwantdSong

}); // end js file
