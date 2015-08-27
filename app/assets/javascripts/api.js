$(function() {
  var emptyResponseUrl = "https://www.youtube.com/embed/B62P6Gm9jpE?rel=0&autoplay=1";
  var noArtistMessage = "No one has heard of that artist! You must be the coolest!";
  var failedRandoMessage = "Our randomizer broke! Try again.";

  function noData(message) {
    var frame = $("<iframe id='frame' width='640' height='360' src='' frameborder='0' autoplay='1' allowfullscreen></iframe>");
    var addMessage = $("<h4 class='message'>" + message + "</h4>");
    $(".vid-frame").prepend(addMessage);
    $(".vid-frame").append(frame);
    frame.attr("src", emptyResponseUrl);
  }

  $(".btn-search").click(function(event) {
    event.preventDefault();

    var artist = $(".artist").val();
    var url = ("/search/" + artist);

    $.getJSON(url, function(data) {
      $("li").remove();
      $("iframe").remove();
      $(".message").remove();
      if (data.length === 0) {
        noData(noArtistMessage);
      } else {
        var firstResult = data[0];
        if (firstResult.via === "youtube") {
          var firstFrame = $("<iframe id='frame' width='448' height='252' src='' frameborder='0' autoplay='1' allowfullscreen></iframe>");
          $(".vid-frame").prepend(firstFrame);
          firstResult.url = firstResult.url.replace("watch?v=", "/embed/");
          firstFrame.attr("src", firstResult.url + "?rel=0&autoplay=1");
        }
        for (var i = 0; i < data.length; i++) {
          var thisArtist = data[i];
          var listItem = $('<li></li>');

          var anchor = $('<a></a>');
          anchor.text(thisArtist.artist + ", " + thisArtist.title);
          anchor.prop("href", thisArtist.url);
          listItem.append(anchor);
          $('ul').append(listItem);
        }
      }
    }).fail(function() {
      alert( "Something terrible has happened. Run for the hills." );
    });
  });


  $(".btn-chance").click(function(event) {
    event.preventDefault();

    var url = ("/chance");

    $.getJSON(url, function(data) {
      $("li").remove();
      $("iframe").remove();
      $(".empty").remove();
      if (data.length === 0) {
        noData(failedRandoMessage);
      } else {
        var firstResult = data[0];
        if (firstResult.via === "youtube") {
          var firstFrame = $("<iframe id='frame' width='448' height='252' src='' frameborder='0' autoplay='1' allowfullscreen></iframe>");
          $(".vid-frame").prepend(firstFrame);
          firstResult.url = firstResult.url.replace("watch?v=", "/embed/");
          firstFrame.attr("src", firstResult.url + "?rel=0&autoplay=1");
        }
        for (var i = 0; i < data.length; i++) {
          var thisArtist = data[i];
          var listItem = $('<li></li>');

          var anchor = $('<a></a>');
          anchor.text(thisArtist.artist + ", " + thisArtist.title);
          anchor.prop("href", thisArtist.url);
          listItem.append(anchor);
          $('ul').append(listItem);
        }
      }
    }).fail(function() {
      alert( "Something terrible has happened. Run for the hills." );
    });
  });
});
