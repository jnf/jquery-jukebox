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
          aggro();
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

  // render jams
  function renderJams(data) {
    var list = setupList();
    for (var i = 0; i < data.length; i++) { // iterate through jams
      var jam = data[i];
      var artist = jam.artist;
      var title = jam.title;
      var url = jam.url;
      var via = jam.via;
      var anchor = setupAnchor();
      if (via == "youtube") {
        var youtube_id = getYoutubeId(url);
        var iframe = setupIframe(YOUTUBE_EMBED, youtube_id);
        addVideoToList(iframe, anchor, list);
      } else if (via == "vimeo") {
        var vimeo_id = getVimeoId(url);
        var iframe = setupIframe(VIMEO_EMBED, vimeo_id);
        addVideoToList(iframe, anchor, list);
      } else {
        var listing = (artist + " - " + title + " (via " + via + ")");
        anchor.text(listing);
        anchor.prop("href", url);
        anchor.prop("target", "_blank");
        list.append(anchor);
      } // end if/else embed video
      addJamsToPage(list);
    } // end for loop
  } // end renderJams

  // aggro
  function aggro() {
    var list = setupList();
    var anchor = setupAnchor();
    var iframe = setupIframe(YOUTUBE_EMBED, "-gPuH1yeZ08?autoplay=1");
    addVideoToList(iframe, anchor, list);
    addJamsToPage(list);
  } // end aggro

  function clearJams() {
    $(".jams-div").html("");
  }

  function setupIframe(base_url, video_id) {
    var iframe = $("<iframe>");
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

  function setupList() {
    var list = $('<div>');
    list.addClass("list-group");
    return list;
  }

  function setupAnchor() {
    var anchor = $("<a>");
    anchor.addClass("list-group-item");
    return anchor;
  }

  function addVideoToList(iframe, anchor, list) {
    anchor.append(iframe);
    list.append(anchor);
  }

  function addJamsToPage(list) {
    $(".jams-div").append(list);
  }

}); // end js file
