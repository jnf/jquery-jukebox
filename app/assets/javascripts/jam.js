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
      var anchor = $("<a>");
      anchor.addClass("list-group-item");
      if (via == "youtube") {
        youtube_id = url.split("v=")[1];
        var iframe = $("<iframe>");
        iframe.prop("width", "300");
        iframe.prop("height", "169");
        iframe.prop("src", "https://www.youtube.com/embed/" + youtube_id);
        iframe.prop("frameborder", "0");
        anchor.append(iframe);
        list.append(anchor);
      } else if (via == "vimeo") {
        vimeo_id = url.split(".com/")[1];
        var iframe = $("<iframe>");
        iframe.prop("width", "300");
        iframe.prop("height", "169");
        iframe.prop("src", "https://player.vimeo.com/video/" + vimeo_id);
        iframe.prop("frameborder", "0");
        anchor.append(iframe);
        list.append(anchor);
      // } else if (via == "soundcloud") {
        // https://soundcloud.com/oriol-cervera/every-rose-has-its-thorn
        // <iframe width="100%" height="300" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/123664350&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true"></iframe>
      } else {
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
    var iframe = $("<iframe>");
    iframe.prop("width", "300");
    iframe.prop("height", "169");
    iframe.prop("src", "https://www.youtube.com/embed/-gPuH1yeZ08?autoplay=1");
    iframe.prop("frameborder", "0");
    anchor.append(iframe);
    list.append(anchor);
    $(".jams-div").append(list);
  } // end unwantdSong

}); // end js file
