$(function() {
  $(".btn-search").click(function(event) {
    event.preventDefault();

    var artist = $(".artist").val();
    var url = ("/search/" + artist);

    $.getJSON(url, function(data) {
      $("li").remove();
      if (data.length === 0) {
        // var video = $('<video></video>');
        alert( "No one has heard of that artist! You must be the coolest!" );
      } else {
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
      alert( "error" );
    });
  });
});
