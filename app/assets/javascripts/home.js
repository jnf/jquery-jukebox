$(function() {
  $("form.search").submit(function(event) {
    event.preventDefault();

    removeOldResults();

    var textField = $("#artist");
    var searchTerm = textField.val();
    var message = "Some jams by or related to '" + searchTerm + "':";

    var url = makeUrl(searchTerm);

    if (url) {
      $.ajax(url, {
        type: "GET",
        success: function(data, textStatus, jqHXR) {
          if (jqHXR.status == 204) {
            apologize();
          } else {
            var songs = data;
            displayMessage(message);
            displaySongs(songs);
          }
        }
      });
    } else { // no search term entered
      apologize();
    }
    clearTextField(); // after the results have rendered
  });

  function connectApiCalltoButton(className, message) {
    var element = "form." + className;
    var url = "/" + className;

    $(element).submit(function(event) {
    event.preventDefault();

    clearTextField(); // as soon as the button is clicked
    removeOldResults();

    $.ajax(url, {
        type: "GET",
        success: function(data) {
          var songs = data;
          displayMessage(message);
          displaySongs(songs);
        }
      });
  });
  }

  connectApiCalltoButton("popular", "Follow the herd, listen to these jams:");
  connectApiCalltoButton("unpopular", "Have some jams that few people like:");
  connectApiCalltoButton("rando", "Jams for the random state of mind:");
  connectApiCalltoButton("breaking", "Freshly breaking jams:")

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

  function displayMessage(text) {
    var h3 = $("<h3 class='result message'></h3>");
    h3.text(text);
    $("form.search").after(h3);
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
      $(".result").remove();
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
    var url = makeEmbedUrl(song.url, song.via);
    makeLI();
    var div = makeIframe(url);
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
    var list = $("<ul class='result'></ul>");
    // $("form.search").after(list);
    $(".message").after(list);
  }

  function makeLI() {
    var listItem = $("<li></li>");
    $("ul").append(listItem);
  }

  function apologize() {
    var panel = $("<div class='panel panel-default result'></div>");
    var panelHeading = $("<div class='panel-heading'></div>");
    var panelTitle = $("<h3 class='panel-heading'></h3>");
    panelTitle.text("That is not anyone's jam. How about this, instead?");
    panel.append(panelHeading);
    panelHeading.append(panelTitle);

    var panelBody = $("<div class='panel-body'></div>");
    var div = suggestSong();
    panelBody.append(div);

    panel.append(panelBody);
    $("form.search").after(panel);

    addNo();
  }

  function suggestSong() {
    var funSongUrl = "https://www.youtube.com/embed/Z4xc3dXDE5I"
    var div = makeIframe(funSongUrl);
    return div;
  }

  function makeIframe(url) {
    var iFrame = $("<iframe></iframe>");
    iFrame.addClass("embed-responsive-item");
    iFrame.prop("src", url);

    var div = $("<div></div>");
    div.addClass("embed-responsive embed-responsive-4by3");
    div.append(iFrame);

    return div;
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
