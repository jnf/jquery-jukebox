$(function () {
    var media   = $(".media");
    var message = $("div.message");


  $(".chance").click(function () {
    event.preventDefault();

    var button  = $(this);
    var body    = button.parents('body');
    var formDiv = body.children(".form-block")
    var method  = button.attr("method");
    var url     = "/chance";

    $.ajax(url, {
      type: method,
      success: function (data, textStatus, jqHXR) {
        collectGarbage();

        if (jqHXR.status == 200) {
          var songs = data;

          for(i = 0; i < songs.length; i++) {
            if (songs[i].via == "youtube" || "vimeo") {
              var video = makeEmbed(songs[i]);

              media.append(video);
            }
            else {
              var link = makeSong(songs[i]);

              media.append(link);
            }
          }
        }

        else if (jqHXR.status == 204) {
            sendApology();
            var song = suggestArtist();
            formDiv.append(song);
        }
      }
    });
  });

  $(".button").click(function () {
    event.preventDefault();

    var button  = $(this);
    var body    = button.parents("body");
    var formDiv = button.parents(".form-block");
    var form    = button.parents("form");
    var method  = form.attr("method");
    var artist  = $("#artist").val();
    var url     = "/search/" + artist;

    $.ajax(url, {
      type: method,
      success: function (data, textStatus, jqHXR) {
        collectGarbage();

        if (jqHXR.status == 200) {
          var songs = data;

          if (artist == "Madonna" || artist == "Whitney Houston" || artist == "Annie Lennox") {
            var affirm = sendAffirmation();

            message.html(affirm);
          }

          for(i = 0; i < songs.length; i++) {
            if (songs[i].via == "youtube" || "vimeo") {
              var video = makeEmbed(songs[i]);

              media.append(video);
            }
            else {
              var link = makeSong(songs[i]);

              media.append(link);
            }
          }
        }

        else if (jqHXR.status == 204) {
            var apology = sendApology();
            var song    = suggestArtist();

            message.append(apology, song);
        }
      }
    });
  });

  function collectGarbage() {
    media.empty();
    message.empty();
  }

  function sendApology() {
    var apology = "There are no jamz for that artist, try this jam instead!";

    return apology;
  }

  function sendAffirmation() {
    var affirmHtml = $("<h3></h3>");
    affirmHtml.addClass("msg-text");
    affirmHtml.addClass("text-center");

    var heartEyes = "&#x1F60D";
    var affirm    = heartEyes + " You have great taste! " + heartEyes;

    return affirmHtml.html(affirm);
  }

  function suggestArtist() {
    var song   = new Object();
    song.title = "I Wanna Dance with Somebody";
    song.url   = "https://vimeo.com/36732042";

    return makeSong(song);
  }

  function makeListItem(link) {
    var li = $("<li></li>");
    li.html(link);

    return li;
  }

  function makeSong(song) {
    var anchor = $("<a></a>");

    anchor.text(song.title);
    anchor.prop("href", song.url);

    return makeListItem(anchor);
  }

  function makeEmbed(song) {
    var video = $("<iframe></iframe>");
    var url   = makeEmbedUrl(song.url, song.via);

    video.prop("src", url);

    return makeListItem(video);
  }

  function makeEmbedUrl(song_url, source) {
    if (source == "youtube") {
      var regex   = /\?v=(.*)/;
      var song    = song_url;
      var videoId = song.match(regex);
      var url     = "http://www.youtube.com/embed/" + videoId[1];

      return url;
    }
    else if (source == "vimeo") {
      var regex   = /\b\/(.*)/;
      var song    = song_url;
      var videoId = song.match(regex);
      var url     = "https://player.vimeo.com/video/" + videoId[1];

      return url;
    }
  }
});
