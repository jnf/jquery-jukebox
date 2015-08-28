$(function() {
  $("form.search").submit(function(event) {
    event.preventDefault();

    removeOldResults();

    var textField = $("#artist");
    var searchTerm = textField.val();

    var url = makeUrl(searchTerm);

    if (url) {
      $.ajax(url, {
        type: "GET",
        success: function(data, textStatus, jqHXR) {
          if (jqHXR.status == 204) {
            apologize();
          } else {
            var songs = data;
            displaySongs(songs);
          }
        }
      });
    } else { // no search term entered
      apologize();
    }
  });

  $("form.popular").submit(function(event) {
    event.preventDefault();

    clearTextField();
    removeOldResults();

    var url = "/popular";

    $.ajax(url, {
        type: "GET",
        success: function(data) {
          var songs = data;
          displaySongs(songs);
        }
      });
  });

  $("form.unpopular").submit(function(event) {
    event.preventDefault();

    clearTextField();
    removeOldResults();

    var url = "/unpopular";

    $.ajax(url, {
        type: "GET",
        success: function(data) {
          var songs = data;
          displaySongs(songs);
        }
      });
  });

$("form.rando").submit(function(event) {
    event.preventDefault();

    clearTextField();
    removeOldResults();

    var url = "/rando";

    $.ajax(url, {
        type: "GET",
        success: function(data) {
          var songs = data;
          displaySongs(songs);
        }
      });
  });

$("form.breaking").submit(function(event) {
    event.preventDefault();

    clearTextField();
    removeOldResults();

    var url = "/breaking";

    $.ajax(url, {
        type: "GET",
        success: function(data) {
          var songs = data;
          displaySongs(songs);
        }
      });
  });

  function displaySongs(songs) {
    if (songs.length > 0) {
      makeUL();
      for (i = 0; i < songs.length; i++) {
        if (songs[i].via == "youtube" || songs[i].via == "vimeo" ) {
          makeSongEmbed(songs[i]);
        } else { // sources other than those above
          makeSongAnchor(songs[i]);
        }
      };
      addYo();
    } else { // no songs returned
      apologize();
    };
  }

  function makeUrl(searchTerm) {
    if (searchTerm.length > 0) {
      var url = "/search/" + searchTerm;
      return url;
    } else {
      return false;
    }
  }

  function removeOldResults() {
    if ($("body").children(":last-child") != $("form")) {
      $("ul").remove();
      $("p.result").remove();
    }
  }

  function clearTextField() {
    $("#artist").val("");
  }

  function makeSongAnchor(song) {
    makeLI();
    var anchor = $("<a></a>");
    anchor.text(song.title);
    anchor.prop("href", song.url);
    var lastLI = $("li:last-child");

    lastLI.append(anchor);
  }

  function makeSongEmbed(song) {
    makeLI();
    var url = makeEmbedUrl(song.url, song.via);
    var iFrame = $("<iframe></iframe>");
    iFrame.addClass("embed-responsive-item");
    iFrame.prop("src", url);

    var div = $("<div></div>");
    div.addClass("embed-responsive embed-responsive-4by3");
    div.append(iFrame);

    var lastLI = $("li:last-child");

    lastLI.append(div);
  }

  function extractYoutubeId(url) {
    var rx = /\\?v=(.*)/;
    var arr = rx.exec(url);
    return arr[1];
  }

  function extractVimeoId(url) {
    var rx = /vimeo.com\/(.*)/;
    var arr = rx.exec(url);
    return arr[1];
  }

  function makeEmbedUrl(url, source) {
    var baseYoutubeUrl = "http://www.youtube.com/embed/";
    var baseVimeoUrl = "http://player.vimeo.com/video/";
    if (source == "youtube") {
      var id = extractYoutubeId(url);
      var embedUrl = baseYoutubeUrl + id;
    } else if (source == "vimeo") {
      var id = extractVimeoId(url);
      var embedUrl = baseVimeoUrl + id;
    }
    return embedUrl;
  }

  function makeUL() {
    var list = $("<ul></ul>");
    list.addClass("results");
    $("form.search").after(list);
  }

  function makeLI() {
    var listItem = $("<li></li>");
    $("ul").append(listItem);
  }

  function apologize() {
    var p = $("<p></p>");
    p.addClass("result")
    p.text("That is not anyone's jam.");
    $("form.search").after(p);
    addNo();
  }

  function addYo() {
    var span = $("<span></span>");
    span.text(" YO.");
    $("p.subheading").append(span);
  }

  function addNo() {
    var span = $("<span></span>");
    span.text(" NO.");
    $("p.subheading").append(span);
  }
});
