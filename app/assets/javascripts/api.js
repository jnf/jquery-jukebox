$(function() {
  $(".btn-search").click(function(event) {
    event.preventDefault();

    var artist = $(".artist").val();
    var url = ("/search/" + artist);

    $.getJSON(url, function(data) {
      $("li").remove();
      $("iframe").remove();
      $(".coolest").remove();
      if (data.length === 0) {
        var frame = $("<iframe id='frame' width='640' height='360' src='' frameborder='0' autoplay='1' allowfullscreen></iframe>");
        var noArtist = $("<h4 class='coolest'>No one has heard of that artist! You must be the coolest!</h4>");
        $(".vid-frame").prepend(noArtist);
        $(".vid-frame").append(frame);
        $("#frame").attr("src", "https://www.youtube.com/embed/B62P6Gm9jpE?rel=0&autoplay=1");
      } else {
        var firstResult = data[0];
        if (firstResult.via === "youtube") {
          var firstFrame = $("<iframe id='frame' width='448' height='252' src='' frameborder='0' autoplay='1' allowfullscreen></iframe>");
          $(".vid-frame").prepend(firstFrame);
          firstResult.url = firstResult.url.replace("watch?v=", "/embed/");
          $("#frame").attr("src", firstResult.url + "?rel=0&autoplay=1");
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
        var frame = $("<iframe id='frame' width='640' height='360' src='' frameborder='0' autoplay='1' allowfullscreen></iframe>");
        var noArtist = $("<h4 class='empty'>Our randomizer broke! Try again.</h4>");
        $(".vid-frame").prepend(noArtist);
        $(".vid-frame").append(frame);
        $("#frame").attr("src", "https://www.youtube.com/embed/B62P6Gm9jpE?rel=0&autoplay=1");
      } else {
        var firstResult = data[0];
        if (firstResult.via === "youtube") {
          var firstFrame = $("<iframe id='frame' width='448' height='252' src='' frameborder='0' autoplay='1' allowfullscreen></iframe>");
          $(".vid-frame").prepend(firstFrame);
          firstResult.url = firstResult.url.replace("watch?v=", "/embed/");
          $("#frame").attr("src", firstResult.url + "?rel=0&autoplay=1");
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
