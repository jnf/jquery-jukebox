$(function() {
  var emptyResponseUrl = "https://www.youtube.com/embed/B62P6Gm9jpE?rel=0&autoplay=1";
  var noArtistMessage = "No one has heard of that artist! You must be the coolest!";
  var failedRandoMessage = "Our randomizer broke! Try again.";
  var errorMsg = "Something terrible has happened. Run for the hills.";

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

  function displayTIMJdata(data) {
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

  $(".btn-search").click(function(event) {
    event.preventDefault();
    var artist = $(".artist").val();
    var url = ("/search/" + artist);

    $.getJSON(url, function(data) {
      $("li, iframe, .message").remove();
      if (data.length === 0) {
        noData(noArtistMessage);
      } else {
        var firstResult = data[0];
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
      $("li, iframe, .message").remove();

      if (data.length === 0) {
        noData(failedRandoMessage);
      } else {
        var firstResult = data[0];
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
