$(function () {

  var YOUTUBE_EMBED = "https://www.youtube.com/embed/";
  var VIMEO_EMBED = "https://player.vimeo.com/video/";

  // searching jams
  $("form").submit(function(event) {
    event.preventDefault();
    var form = $("form");
    var url = form.attr("action");
    var method = form.attr("method");
    $.ajax(url, {
      type: method,
      data: {"artist": $("#q").val()},
      success: function(data) {
        clearJams();
        if ($.isEmptyObject(data)) { // check empty response
          unwantedSong(); // troll
        } else {
          renderJams(data);
        } // end if/else
      } // end success
    }); // end ajax
  }); // end form submit listener

  // random jams
  $("#random").click(function(event) {
    event.preventDefault();
    var url = $(this).prop("href");
    $.ajax(url, {
      type: "get",
      success: function(data) {
        clearJams();
        renderJams(data);
      } // end success
    }); // end ajax
  }); // end randomizer button listener

  function renderJams(data) {
    var list = $('<div>');
    list.addClass("list-group");
    for (var i = 0; i < data.length; i++) { // iterate through jams
      var jam = data[i];
      var artist = jam.artist;
      var title = jam.title;
      var url = jam.url;
      var via = jam.via;
      var anchor = $("<a>");
      anchor.addClass("list-group-item");
      if (via == "youtube") {
        youtube_id = getYoutubeId(url);
        var iframe = $("<iframe>");
        setupIframe(iframe, YOUTUBE_EMBED, youtube_id);
        anchor.append(iframe);
        list.append(anchor);
      } else if (via == "vimeo") {
        vimeo_id = getVimeoId(url);
        var iframe = $("<iframe>");
        setupIframe(iframe, VIMEO_EMBED, vimeo_id);
        anchor.append(iframe);
        list.append(anchor);
      } else {
        var listing = (artist + " - " + title + " (via " + via + ")");
        anchor.text(listing);
        anchor.prop("href", url);
        anchor.prop("target", "_blank");
        list.append(anchor);
      } // end if/else youtube
      $('.jams-div').append(list);
    } // end for loop
  } // end renderJams

  function unwantedSong() {
    var list = $('<div>');
    list.addClass("list-group");
    var anchor = $("<a>");
    anchor.addClass("list-group-item");
    var iframe = $("<iframe>");
    setupIframe(iframe, YOUTUBE_EMBED, "-gPuH1yeZ08?autoplay=1");
    anchor.append(iframe);
    list.append(anchor);
    $(".jams-div").append(list);
  } // end unwantdSong

  function clearJams() {
    $(".jams-div").html("");
  }

  function setupIframe(iframe, base_url, video_id) {
    iframe.prop("width", "300");
    iframe.prop("height", "169");
    iframe.prop("src", base_url + video_id);
    iframe.prop("frameborder", "0");
    return iframe;
  }

  function getVimeoId(url) {
    var id = url.split(".com/")[1];
    return id;
  }

  function getYoutubeId(url) {
    var id = url.split("v=")[1];
    return id;
  }

}); // end js file
