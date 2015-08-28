$(function() {
  var emptyResponseUrl = "https://www.youtube.com/embed/B62P6Gm9jpE?rel=0&autoplay=1";
  var noArtistMessage = "No one has heard of that artist! You must be the coolest!";
  var failedRandoMessage = "Our randomizer broke! Try again.";
  var errorMsg = "Something terrible has happened. Run for the hills.";
  var startIndex = 1;
  var sweep = "li, iframe, a, .btn-play, .glyphicon-play, .message, .first-song"

  function noData(message) {
    var frame = $("<iframe id='frame' width='640' height='360' src='' frameborder='0' autoplay='1' allowfullscreen></iframe>");
    var addMessage = $("<h4 class='message'>" + message + "</h4>");
    $(".vid-frame").prepend(addMessage);
    $(".vid-frame").append(frame);
    frame.attr("src", emptyResponseUrl);
  }

  function showYoutube(url) {
    var frame = $("<iframe id='frame' width='448' height='252' src='' frameborder='0' autoplay='1' allowfullscreen></iframe>");
    $(".vid-frame").prepend(frame);
    url = url.replace("watch?v=", "/embed/");
    frame.attr("src", url + "?rel=0&autoplay=1");
  }

  function displayOne(result) {
    var title = $('<h4 class="first-song"></h4>');
    var anchor = $('<a></a>');
    anchor.text(result.artist + ", " + result.title);
    anchor.prop("href", result.url);
    title.append(anchor);
    $(".vid-frame").prepend(title);
  }

  function displayTIMJdata(data) {
    for (var i = startIndex; i < data.length; i++) {
      var thisArtist = data[i];
      var id = "song" + i;
      var listItem = $('<li class="list-item"></li>');
      var anchor = $('<a class="col-sm-10"></a>');

      anchor.text(thisArtist.artist + ", " + thisArtist.title);
      anchor.prop("href", thisArtist.url);
      $(listItem).append(anchor);

      if (thisArtist.via === "youtube") {
        var glyph = $('<button class="btn btn-play" id=' + id + '><span class="glyphicon glyphicon-play"></span></button>');
        listItem.append(glyph);
      }
      $('ul').append(listItem);
      youtubeOnClick(thisArtist, id);
    }
  }

  // On click, show youtube
  function youtubeOnClick(song, id) {
    $("#" + id).click(function(event) {
      event.preventDefault();

        $("iframe").remove();

        var frame = $("<iframe id='frame' width='448' height='252' src='' frameborder='0' allowfullscreen></iframe><br>");
        $("#" + id).append(frame);
        song.url = song.url.replace("watch?v=", "/embed/");
        frame.attr("src", song.url + "?rel=0");
    });
  }

  // show/hear first for other services

  $(".btn-search").click(function(event) {
    event.preventDefault();
    var artist = $(".artist").val();
    var url = ("/search/" + artist);

    $.getJSON(url, function(data) {
      $(sweep).remove();
      if (data.length === 0) {
        noData(noArtistMessage);
      } else {
        var firstResult = data[0];
        displayOne(firstResult);
        if (firstResult.via === "youtube") {
          showYoutube(firstResult.url);
        }
        displayTIMJdata(data);
      }
    }).fail(function() {
      alert(errorMsg);
    });
  });


  $(".btn-chance").click(function(event) {
    event.preventDefault();
    var url = ("/chance");

    $.getJSON(url, function(data) {
      $(sweep).remove();

      if (data.length === 0) {
        noData(failedRandoMessage);
      } else {
        var firstResult = data[0];
        displayOne(firstResult);
        if (firstResult.via === "youtube") {
          showYoutube(firstResult.url);
        }
        displayTIMJdata(data);
      }
    }).fail(function() {
      alert(errorMsg);
    });
  });
});
