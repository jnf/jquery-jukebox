$(function() {
  $("form.search").submit(function(event) {
    event.preventDefault();

    removeOldInfo();

    var textField = $("#artist");
    var searchTerm = textField.val();

    var url = makeUrl(searchTerm);

    if (url) {
      $.ajax(url, {
        type: "GET",
        success: function(data) {
          var songs = data;
          displaySongs(songs);
        }
      });
    } else { // no search term entered
      apologize();
    }
  });

  $("form.popular").submit(function(event) {
    event.preventDefault();

    removeOldInfo();

    var url = "/popular";

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

  function removeOldInfo() {
    if ($("body").children(":last-child") != $("form")) {
      $("ul").remove();
      $("p").remove();
    }
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
    iFrame.prop("src", url);
    var lastLI = $("li:last-child");

    lastLI.append(iFrame);
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
    $("form.search").after(list);
  }

  function makeLI() {
    var listItem = $("<li></li>");
    $("ul").append(listItem);
  }

  function apologize() {
    var p = $("<p></p>");
    p.text("That is not anyone else's jam.");
    $("form.search").after(p);
  }
});
